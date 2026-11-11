import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { CookieBanner } from "@/components/cooverly/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
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
      { name: "theme-color", content: "#F7F8FA" },
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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Cooverly",
          url: "https://cooverly.com",
                    description:
            "Venture development partner helping entrepreneurs and established companies validate, build and launch new businesses and corporate spin-offs.",
          email: "lorenzo.tttine@gmail.com",
          vatID: "10904471215",
          contactPoint: [{
            "@type": "ContactPoint",
            telephone: "+39-378-405-7222",
            contactType: "sales",
            availableLanguage: ["English", "Spanish", "Italian"],
          }],
          knowsAbout: ["Venture building", "Corporate spin-offs", "Business validation", "MVP development", "Go-to-market strategy", "New business lines"],
          areaServed: ["United Arab Emirates", "Cayman Islands", "Switzerland", "Singapore", "Luxembourg", "Monaco", "United States", "United Kingdom", "Spain", "Italy"].map((name) => ({ "@type": "Country", name })),
          makesOffer: ["Validate: market research and business model validation", "Build & Launch: product development and market launch", "Operate & Grow: post-launch growth and operational direction"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, serviceType: "Venture development", areaServed: "Worldwide (remote)" } })),
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
      <Outlet />
      <CookieBanner />
    </LanguageProvider>
  );
}
