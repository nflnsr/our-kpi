import { Layout } from "@/components/layout";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout className="relative grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <button
        className="absolute left-5 top-3 rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white sm:left-10 lg:left-20 xl:left-40"
        onClick={() => navigate(-1)}
      >
        kembali
      </button>
      <section className="space-y-2 text-center">
        <p className="text-3xl font-bold">404 Not Found</p>
        <p className="text-lg font-semibold">Halaman yang dicari tidak ada.</p>
      </section>
    </Layout>
  );
}

export default NotFound;
