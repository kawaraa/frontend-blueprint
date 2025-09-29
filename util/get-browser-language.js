export const getSupportedLanguage = (lang) => ["en", "ar"].find((l) => l === lang);

export function getBrowserLanguage(fallback = "en") {
  // Check if navigator.language is available
  if (navigator?.language) return navigator.language.split("-")[0];
  // Fallback for older browsers
  if (navigator?.userLanguage) return navigator.userLanguage.split("-")[0];
  // Final fallback
  return fallback; // Default to English
}
