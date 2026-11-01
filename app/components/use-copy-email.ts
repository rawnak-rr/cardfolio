'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/lib/data';

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}
