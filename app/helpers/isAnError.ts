export default function isAnError(error: unknown): error is Error {
  return error instanceof Error;
}
