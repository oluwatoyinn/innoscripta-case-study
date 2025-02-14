export const getFormattedDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

interface TruncateOptions {
  ellipsis?: string;
  preserveWords?: boolean;
}

/**
 * Truncates text to a specified length while preserving word boundaries.
 * @param text - The text to truncate
 * @param desiredLength - The maximum length of the resulting string (including ellipsis)
 * @param options - Optional configuration for truncation behavior
 * @returns The truncated text with ellipsis
 * @throws {Error} If desiredLength is less than 1
 */
export const truncateText = (
  text: string,
  desiredLength: number,
  options: TruncateOptions = {}
): string => {
  // Set default options
  const { ellipsis = "...", preserveWords = true } = options;

  if (text.length <= desiredLength) {
    return text;
  }

  // Account for the length of ellipsis
  const truncatedLength = desiredLength - ellipsis.length;

  if (preserveWords) {
    const truncated = text.substring(0, truncatedLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    const finalText =
      lastSpaceIndex > 0 ? text.substring(0, lastSpaceIndex) : truncated;

    return `${finalText}${ellipsis}`;
  }

  return `${text.substring(0, truncatedLength)}${ellipsis}`;
};
