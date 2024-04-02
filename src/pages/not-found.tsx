import { Layout } from "@/components/layout";

function NotFound() {
  return (
    <Layout className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <section className="space-y-2 text-center">
        <p className="text-3xl font-bold">404 Not Found</p>
        <p className="text-lg font-semibold">Halaman sedang dikembangkan 🚀</p>
      </section>
    </Layout>
  );
}

export default NotFound;
