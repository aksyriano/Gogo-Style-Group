import { translations } from "@/data/translations";

const AUTO_TRANSLATE_CACHE_PREFIX = "auto_tr_";

export async function autoTranslate(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === "en") return text;

  // 1. Check Cache
  const cacheKey = `${AUTO_TRANSLATE_CACHE_PREFIX}${targetLang}_${text}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  // 2. Call API
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await res.json();
    const translatedText = data.responseData.translatedText;

    if (translatedText) {
      // 3. Cache Result
      localStorage.setItem(cacheKey, translatedText);
      return translatedText;
    }
  } catch (error) {
    console.error("Auto-translate failed:", error);
  }

  return text; // Return original on failure
}

export async function t(textOrKey: string, lang: string): Promise<string> {
  // 1. Check overrides in translations.ts
  if (translations[lang] && translations[lang][textOrKey]) {
    return translations[lang][textOrKey];
  }

  // 2. Fallback to Auto-translate
  if (lang !== "en") {
    return await autoTranslate(textOrKey, lang);
  }

  return textOrKey;
}
