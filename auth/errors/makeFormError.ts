export default function makeFormError(
  message: string,
  path: string,
): { message: string; path: [string] } {
  return {
    message,
    path: [path],
  };
}
