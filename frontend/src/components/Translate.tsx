'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/utils/translate';

interface TranslateProps {
  children: string;
  k?: string; // Optional manual key
}

export default function Translate({ children, k }: TranslateProps) {
  const { lang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    let isMounted = true;

    async function performTranslation() {
      // If English, just use the original content (children or manual override if it exists)
      if (lang === 'en') {
        setTranslatedText(children);
        return;
      }

      // Perform translation (checks: manual -> cache -> API)
      const result = await t(k || children, lang);
      
      if (isMounted) {
        setTranslatedText(result);
      }
    }

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [lang, children, k]);

  return <>{translatedText}</>;
}
