"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function AdsProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}

      {/* External Ad Manager Script */}
      <Script
        id="ad-manager-main"
        src="https://js.onclckmn.com/static/onclicka.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Jab script load ho jaye, tab init karein
          if (window.a3klsam && window.a3klsam.init) {
            window.a3klsam.init(420691);
          }
        }}
      />

      <Script
        id="ad-manager-main"
        src="https://js.onclckmn.com/static/onclicka.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Jab script load ho jaye, tab init karein
          if (window.a3klsam && window.a3klsam.init) {
            window.a3klsam.init(420691);
          }
        }}
      />



      <Script
        id="ad-manager-main"
        src="https://js.onclckmn.com/static/onclicka.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Jab script load ho jaye, tab init karein
          if (window.a3klsam && window.a3klsam.init) {
            window.a3klsam.init(420713);
          }
        }}
      />



      {/* Backup Initialization Script (just in case) */}
      <Script id="ad-manager-init" strategy="afterInteractive">
        {`
          window.addEventListener('DOMContentLoaded', function() {
            if (window.a3klsam && window.a3klsam.init) {
              window.a3klsam.init(420691);
            }
          });
        `}
      </Script>
    </>
  );
}