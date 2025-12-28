import "./globals.css";
import { DarkModeProvider } from "@/lib/providers/DarkModeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout required by Next.js 15.5.3
  // Route groups provide their own body/head content
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect hints for faster resource loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('iis-theme-preference');
                  if (theme === '"dark"' || theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === '"light"' || theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
