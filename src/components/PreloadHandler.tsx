"use client";

import { useEffect } from "react";

export function PreloadHandler() {
  useEffect(() => {
    // Remove preload class after component mounts (after hydration)
    const removePreload = () => {
      document.documentElement.classList.remove("preload");
    };

    // If window is already loaded, remove immediately
    if (document.readyState === "complete") {
      removePreload();
    } else {
      // Otherwise wait for load event
      window.addEventListener("load", removePreload);
      return () => {
        window.removeEventListener("load", removePreload);
      };
    }
  }, []);

  return null;
}
