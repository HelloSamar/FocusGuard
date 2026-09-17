// Shared validation helpers used by both options.js (settings page) and
// background.js (service worker, for building declarativeNetRequest rules).
// Kept in one file so the "is this domain/keyword valid?" logic can never
// drift between what the settings page previews and what actually gets
// enforced.
//
// Loaded two different ways depending on context:
//   - options.html includes this as a plain <script> before options.js
//   - background.js (a classic, non-module service worker) pulls it in
//     with importScripts("shared.js")
// Both contexts share one global scope, so plain function declarations
// (not modules) are what make this work in both places.

function normalizeDomain(input) {
  const value = String(input || "").trim().toLowerCase();
  if (!value) return null;

  try {
    const url = value.includes("://") ? new URL(value) : new URL(`https://${value}`);
    const domain = url.hostname.replace(/^www\./, "");
    return isValidDomain(domain) ? domain : null;
  } catch {
    const domain = value
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split(/[/?#]/)[0]
      .trim();
    return isValidDomain(domain) ? domain : null;
  }
}

function normalizeKeyword(input) {
  const keyword = String(input || "").trim().toLowerCase();
  return /^[a-z0-9._-]+$/.test(keyword) ? keyword : null;
}

function isValidDomain(domain) {
  return /^[a-z0-9.-]+$/.test(domain) &&
    domain.includes(".") &&
    !domain.startsWith(".") &&
    !domain.endsWith(".") &&
    !domain.includes("..");
}

function uniqueClean(values, normalizer) {
  return [...new Set(values.map(normalizer).filter(Boolean))];
}
