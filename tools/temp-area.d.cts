export function createTempArea(label?: string): {
  path(relative?: string): string;
  dispose(): void;
};
