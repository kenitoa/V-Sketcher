// Standalone .NET Framework probe. Does not invoke PowerShell or change OS policy.
using System;
using System.IO;
using System.IO.Compression;
using System.Diagnostics;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Web.Script.Serialization;

public sealed class ProbeCandidate { public string version; public string sha256; }
public sealed class ProbeFile { public string name; public string sha256; }
public sealed class ProbeManifest { public string format; public ProbeCandidate candidate; public ProbeFile[] files; }
public static class CompletionProbe {
    static readonly JavaScriptSerializer Json = new JavaScriptSerializer { MaxJsonLength = 8 * 1024 * 1024 };
    static string Hash(string file) { using (var stream = File.OpenRead(file)) using (var hash = SHA256.Create()) return BitConverter.ToString(hash.ComputeHash(stream)).Replace("-", "").ToLowerInvariant(); }
    static void Need(bool ok, string code) { if (!ok) throw new InvalidOperationException(code); }
    static Dictionary<string,object> ObjectValue(object value) { var d = value as Dictionary<string,object>; Need(d != null, "E_CLEAN_REPORT"); return d; }
    static bool Is(Dictionary<string,object> d, string key, object value) { object found; return d.TryGetValue(key, out found) && Object.Equals(found, value); }
    static string Arg(string key, string value) { Need(value.IndexOf('"') < 0, "E_CLEAN_ARGUMENT"); return "\"--" + key + "=" + value + "\""; }
    static void Extract(string zip, string target) {
        Need(!Directory.Exists(target), "E_CLEAN_TARGET");
        long total = 0; var names = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        using (var archive = ZipFile.OpenRead(zip)) {
            foreach (var e in archive.Entries) {
                var key = e.FullName.Replace('\\','/');
                Need(!key.StartsWith("/") && !key.Contains(":") && !Array.Exists(key.Split('/'), p => p == "..") && names.Add(key), "E_CLEAN_ZIP_ENTRY");
                Need(((e.ExternalAttributes >> 16) & 61440) != 40960, "E_CLEAN_ZIP_LINK");
                total += e.Length; Need(total <= 3L*1024*1024*1024 && names.Count <= 20000, "E_CLEAN_ZIP_LIMIT");
                var path = Path.GetFullPath(Path.Combine(target, key));
                Need(path.StartsWith(Path.GetFullPath(target) + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase), "E_CLEAN_ZIP_ROOT");
            }
        }
        ZipFile.ExtractToDirectory(zip, target);
    }
    static bool CheckReport(string file, string version) {
        var d = ObjectValue(Json.DeserializeObject(File.ReadAllText(file)));
        var worker = ObjectValue(d["worker"]); var p = ObjectValue(d["protections"]);
        return Is(d,"passed",true) && Is(d,"appVersion",version) && Is(d,"packaged",true) && Is(d,"workerStopped",true) && Is(worker,"frozen",true) && Is(worker,"dependencyFilesInsideBundle",true)
            && Is(p,"sandbox",true) && Is(p,"contextIsolation",true) && Is(p,"nodeIntegration",false) && Is(p,"externalNetworkBlocked",true);
    }
    public static int Main(string[] args) {
        var root = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
        var id = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss-fff") + "-" + Guid.NewGuid().ToString("N").Substring(0,8);
        var result = new Dictionary<string,object> {
            {"format","2dsketcher-clean-probe/1"},{"collectedAt",DateTime.UtcNow.ToString("o")},
            {"passed",false},{"cleanWindowsVerified",false},{"updateVerified",false},{"physicalDevicesOpened",false},
            {"securityBypasses",0},{"automaticUpload",false},{"powerShellInvoked",false},{"errorCode",null},{"stage","inventory"}
        };
        try {
            Need(args.Length == 0 || args.Length == 1 && args[0] == "--inventory-only", "E_CLEAN_ARGUMENT");
            var manifest = Json.Deserialize<ProbeManifest>(File.ReadAllText(Path.Combine(root,"kit-manifest.json")));
            Need(manifest.format == "2dsketcher-completion-kit/1" && manifest.candidate != null, "E_CLEAN_MANIFEST");
            result["candidate"] = manifest.candidate;
            var zip = Path.Combine(root,"candidate.zip"); Need(Hash(zip) == manifest.candidate.sha256, "E_CLEAN_CANDIDATE_HASH");
            var entry = Array.Find(manifest.files, f => f.name == "Run-CleanWindows.exe");
            Need(entry != null && Hash(Path.Combine(root,entry.name)) == entry.sha256, "E_CLEAN_PROBE_HASH");
            var osKey="HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion";
            var build=Convert.ToString(Microsoft.Win32.Registry.GetValue(osKey,"CurrentBuildNumber","unknown"));
            Need(System.Text.RegularExpressions.Regex.IsMatch(build,"^[0-9]{4,6}$"),"E_CLEAN_OS_BUILD");
            result["os"] = new Dictionary<string,object> {{"platform","windows"},{"build",build},{"compatibilityReportedVersion",Environment.OSVersion.Version.ToString()},{"x64",Environment.Is64BitOperatingSystem},{"logicalCores",Environment.ProcessorCount}};
            var detected = new List<string>();
            foreach (var command in new [] {"node.exe","npm.cmd","python.exe","py.exe","git.exe"}) {
                foreach (var path in (Environment.GetEnvironmentVariable("PATH") ?? "").Split(Path.PathSeparator)) {
                    try { if (File.Exists(Path.Combine(path.Trim('"'),command))) { detected.Add(command); break; } } catch (ArgumentException) { }
                }
            }
            result["developerToolsDetected"] = detected; result["developerToolsAbsent"] = detected.Count == 0;
            if (args.Length == 0) {
                // Short, unique, test-owned TEMP root avoids .NET Framework legacy path limits.
                var tempRoot=Path.GetFullPath(Path.GetTempPath());
                var work = Path.GetFullPath(Path.Combine(tempRoot,"2DSC-"+Guid.NewGuid().ToString("N").Substring(0,12)));
                Need(work.StartsWith(tempRoot.TrimEnd(Path.DirectorySeparatorChar)+Path.DirectorySeparatorChar,StringComparison.OrdinalIgnoreCase) && !Directory.Exists(work),"E_CLEAN_WORK_ROOT");
                Directory.CreateDirectory(work);
                File.WriteAllText(Path.Combine(work,"owned-probe.json"),Json.Serialize(new Dictionary<string,object>{{"format","2dsketcher-owned-probe/1"},{"run",id},{"candidate",manifest.candidate}}));
                result["privateWorkId"]=Path.GetFileName(work); result["stage"]="extract";
                var bundle = Path.Combine(work,"new version 한글 경로"); Extract(zip,bundle);
                var exes = Directory.GetFiles(bundle,"2DSketcher.exe",SearchOption.AllDirectories); Need(exes.Length == 1,"E_CLEAN_EXE");
                var exe = exes[0]; var folder = Path.GetDirectoryName(exe);
                Need(File.Exists(Path.Combine(folder,"resources/worker/worker.exe")),"E_CLEAN_WORKER");
                try { X509Certificate.CreateFromSignedFile(exe); result["signaturePresence"]="PresentUnverified"; } catch (CryptographicException) { result["signaturePresence"]="NotSigned"; }
                var tests = new List<object>(); result["tests"]=tests;
                for (int attempt=1; attempt<=2; attempt++) {
                    result["stage"]="packaged-run-"+attempt;
                    var report = Path.Combine(work,"report-"+attempt+".json"); var profile=Path.Combine(work,"profile-1");
                    var start=new ProcessStartInfo(exe,Arg("profile-dir",profile)+" "+Arg("self-check-report",report)+(attempt==2?" --settings-only=true --compact-editor=true":"")) {
                        WorkingDirectory=folder,UseShellExecute=false,CreateNoWindow=true,RedirectStandardOutput=true,RedirectStandardError=true
                    };
                    foreach (var key in new [] {"ELECTRON_RUN_AS_NODE","NODE_OPTIONS","PYTHONPATH","PYTHONHOME"}) start.EnvironmentVariables.Remove(key);
                    using (var stdout=new StreamWriter(Path.Combine(work,"private-stdout-"+attempt+".log")))
                    using (var stderr=new StreamWriter(Path.Combine(work,"private-stderr-"+attempt+".log")))
                    using (var child=new Process { StartInfo=start }) {
                        child.OutputDataReceived += (s,e) => { if(e.Data!=null)stdout.WriteLine(e.Data); };
                        child.ErrorDataReceived += (s,e) => { if(e.Data!=null)stderr.WriteLine(e.Data); };
                        child.Start(); child.BeginOutputReadLine(); child.BeginErrorReadLine();
                        if(!child.WaitForExit(1200000)) { child.Kill(); child.WaitForExit(); throw new InvalidOperationException("E_CLEAN_TIMEOUT"); }
                        child.WaitForExit(); Need(child.ExitCode==0 && File.Exists(report),"E_CLEAN_PROCESS");
                    }
                    var passed=CheckReport(report,manifest.candidate.version);
                    tests.Add(new Dictionary<string,object>{{"attempt",attempt},{"passed",passed},{"reportSha256",Hash(report)},{"protectionsIntact",passed},{"frozenWorker",passed}});
                    Need(passed,"E_CLEAN_PACKAGED_CHECK");
                }
                result["passed"]=true;
                result["stage"]="complete";
            }
        } catch(Exception error) {
            var code=error.Message; result["errorCode"]=System.Text.RegularExpressions.Regex.IsMatch(code,"^E_[A-Z_]+$")?code:"E_CLEAN_PROBE";
            result["errorClass"]=error.GetType().Name;
        }
        var output=Path.Combine(root,"probe-"+id+".json");
        try { using(var file=new FileStream(output,FileMode.CreateNew,FileAccess.Write)) using(var writer=new StreamWriter(file,new System.Text.UTF8Encoding(false))) writer.WriteLine(Json.Serialize(result)); }
        catch { Console.Error.WriteLine("E_CLEAN_RESULT_WRITE"); return 1; }
        Console.WriteLine("Probe result: probe-"+id+".json");
        return result["errorCode"]==null?0:1;
    }
}
