/**
 * Resolve extensionless relative imports to .ts so node:test can load
 * the same source Next.js compiles without requiring .ts import suffixes.
 */
export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith('./') || specifier.startsWith('../')) &&
    !/\.[cm]?[jt]sx?$/.test(specifier) &&
    !specifier.endsWith('.json')
  ) {
    try {
      return await nextResolve(`${specifier}.ts`, context)
    } catch {
      // fall through to the default resolver
    }
  }

  return nextResolve(specifier, context)
}
