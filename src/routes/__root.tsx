import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { DiagnosticModalProvider } from "@/components/cooverly/DiagnosticModal";
import { CookieBanner } from "@/components/cooverly/CookieBanner";
import { PromoPopup } from "@/components/cooverly/PromoPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Cooverly" },
      { name: "theme-color", content: "#0A2A5E" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cooverly" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_ES" },
      { property: "og:locale:alternate", content: "it_IT" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@cooverly" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "256x256", href: "/favicon-256.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://wa.me" },
      { rel: "dns-prefetch", href: "https://wa.me" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Cooverly",
          url: "https://cooverly.com",
          logo: "https://cooverly.com/favicon-256.png",
          description:
            "AI revenue systems that respond, qualify and book appointments 24/7 for service businesses in the USA and Spain.",
          areaServed: ["US", "ES", "IT"],
          sameAs: ["https://wa.me/34625198829"],
          contactPoint: [{
            "@type": "ContactPoint",
            telephone: "+34-625-19-88-29",
            contactType: "sales",
            availableLanguage: ["English", "Spanish", "Italian"],
          }],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <DiagnosticModalProvider>
        <Outlet />
        <PromoPopup />
        <CookieBanner />
      </DiagnosticModalProvider>
    </LanguageProvider>
  );
}
