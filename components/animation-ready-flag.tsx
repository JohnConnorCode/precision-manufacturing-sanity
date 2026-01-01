"use client";

import { useEffect } from "react";

/**
 * Signals to CSS that animations are safe to run.
 * Prevents fallback rules from clobbering Framer Motion once hydration completes.
 */
export default function AnimationReadyFlag() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("animations-ready");

    return () => {
      root.classList.remove("animations-ready");
    };
  }, []);

  return null;
}
