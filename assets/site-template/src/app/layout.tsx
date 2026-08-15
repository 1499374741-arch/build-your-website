import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { siteContent } from "@/content/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "REPLACE_ME_NAME | REPLACE_ME_ROLE",
  description: "REPLACE_ME bilingual personal portfolio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adobeProject = siteContent.typography.adobeWebProject;
  const adobeStylesheetUrl = adobeProject?.stylesheetUrl.trim() ?? "";
  const adobeFontFamily = adobeProject?.fontFamily.trim() ?? "";
  const hasValidAdobeProject =
    /^https:\/\/use\.typekit\.net\/[a-z0-9]+\.css$/i.test(adobeStylesheetUrl) &&
    adobeFontFamily.length > 0;
  const displayFontStack = hasValidAdobeProject
    ? `"${adobeFontFamily.replaceAll('"', "")}", "DM Serif Display"`
    : '"DM Serif Display"';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ "--font-display": displayFontStack } as CSSProperties}
    >
      <head>
        {hasValidAdobeProject ? (
          <link rel="stylesheet" href={adobeStylesheetUrl} />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration" in history) history.scrollRestoration="manual";
(function(){
  function top(){ window.scrollTo(0,0); }
  top();
  document.addEventListener("DOMContentLoaded", top);
  window.addEventListener("load", top);
  requestAnimationFrame(top);
  requestAnimationFrame(function(){ requestAnimationFrame(top); });
  setTimeout(top, 50);
  setTimeout(top, 200);
  setTimeout(top, 500);
})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
