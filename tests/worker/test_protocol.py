from pathlib import Path
import io, json, unittest, importlib.util

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('worker_main', ROOT / 'worker/main.py')
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)


class WorkerProtocolTests(unittest.TestCase):
    def base(self):
        return {
            'protocol': 1,
            'requestId': 'request-a',
            'projectId': 'project-a',
            'revision': 0,
            'generation': 0,
            'operation': 'ping',
        }

    def test_ping_and_shutdown_are_framed_and_close_without_devices(self):
        request = self.base()
        shutdown = {**request, 'requestId': 'request-b', 'operation': 'shutdown'}
        source = io.BytesIO((json.dumps(request) + '\n' + json.dumps(shutdown) + '\n').encode())
        sink = io.BytesIO()
        worker.serve(source, sink)
        results = [json.loads(line) for line in sink.getvalue().splitlines()]
        self.assertEqual(len(results), 2)
        self.assertTrue(all(r['ok'] for r in results))
        self.assertEqual(results[0]['projectId'], 'project-a')

    def test_invalid_revision_boolean_and_version(self):
        for patch in [
            {'revision': True},
            {'protocol': 2},
            {'generation': -1},
            {'operation': 'shell'},
            {'filePath': 'private'},
        ]:
            with self.subTest(patch=patch), self.assertRaises(ValueError):
                worker.validate({**self.base(), **patch})

    def test_malformed_and_oversized_messages_do_not_leak_payload(self):
        for data in [b'{private-path}\n', b'x' * (worker.MAX_BYTES + 5)]:
            sink = io.BytesIO()
            worker.serve(io.BytesIO(data), sink)
            result = json.loads(sink.getvalue().splitlines()[0])
            self.assertFalse(result['ok'])
            self.assertNotIn('private-path', sink.getvalue().decode())


if __name__ == '__main__':
    unittest.main()
