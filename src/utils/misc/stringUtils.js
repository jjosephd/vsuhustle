/**
 * Converts a string to title case, capitalizing the first letter of each word.
 * Words are split by hyphens, underscores, or spaces.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted string in title case.
 */

export const titleCase = (str) =>
  str
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Converts a string into a slug, a string suitable for use as a URL slug
 * or filename. The string is converted to lowercase, trimmed, and has all
 * special characters removed. Spaces, underscores, and dashes are collapsed
 * into a single hyphen. Any leading or trailing hyphens are removed.
 *
 * @param {string} str - The input string to slugify.
 * @returns {string} The slugified string.
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-') // collapse spaces, underscores, dashes into one -
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
