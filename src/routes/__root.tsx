import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Página no encontrada.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Intenta nuevamente.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Megapack Barras Saludables — Recetario Premium 80% OFF" },
      {
        name: "description",
        content:
          "Aprende a preparar barras, brownies y snacks saludables sin azúcar. Megapack con 8 ebooks + bonos. Pago único, acceso de por vida.",
      },
      { property: "og:title", content: "Megapack Barras Saludables — Recetario Premium 80% OFF" },
      {
        property: "og:description",
        content:
          "OFERTA LIMITADA: Emprende con snacks saludables que ya se venden todos los días — 80% OFF solo hoy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Megapack Barras Saludables — Recetario Premium 80% OFF" },
      { name: "description", content: "Snacks Saludables is a web application for creating and selling healthy snacks." },
      { property: "og:description", content: "Snacks Saludables is a web application for creating and selling healthy snacks." },
      { name: "twitter:description", content: "Snacks Saludables is a web application for creating and selling healthy snacks." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4EbAeqnQb4XZa0QvruP4PqD9T1o2/social-images/social-1778792947827-pack-mockup-QRas7xGY.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4EbAeqnQb4XZa0QvruP4PqD9T1o2/social-images/social-1778792947827-pack-mockup-QRas7xGY.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
