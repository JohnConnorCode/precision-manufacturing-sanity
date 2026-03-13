import { stegaClean } from '@sanity/client/stega'

/**
 * Strip Sanity stega encoding from a value.
 *
 * In preview/draft mode, Sanity injects invisible Unicode characters into
 * strings for click-to-edit functionality. These break programmatic use:
 * icon lookups, variant comparisons, switch/case, URL routing, etc.
 *
 * Use this on ANY string from Sanity that is NOT just rendered as text,
 * e.g. icon names, button variants, hrefs, class names, color values.
 */
export function clean<T>(value: T): T {
  return stegaClean(value)
}
