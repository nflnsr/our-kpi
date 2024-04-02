import { Layout } from "@/components/layout";
import TablePreviewIMG from "@/assets/table-preview-2.png";

function LandingPage() {
  return (
    <Layout
      pageScroll={true}
      className="flex flex-col items-center gap-10 bg-[url('../assets/work.svg')] bg-center px-4 py-10 sm:gap-20 sm:px-10 lg:flex-row"
    >
      <section className="max-w-[480px] space-y-8 rounded-xl bg-white px-4 py-6 sm:mb-5 sm:px-8 sm:py-10">
        <p className="bg-gradient-to-tl from-blue-400 via-sky-400 to-cyan-400 bg-clip-text font-mono text-3xl font-bold text-transparent max-[400px]:text-2xl sm:text-4xl">
          Website Penilaian Kinerja dan Performa Perusahaan Terbaik di Indonesia
        </p>
        <button className="">
          <a
            href="/dashboard"
            className="rounded-xl bg-sky-400 px-8 py-2.5 text-lg font-semibold text-white ring-4 ring-white"
          >
            Coba Gratis!
          </a>
        </button>
      </section>
      <section className="w-full max-w-[800px] rounded-xl border-8 border-white sm:mb-5 sm:min-w-[480px]">
        <img src={TablePreviewIMG} alt="" className="rounded-sm" />
      </section>
    </Layout>
  );
}

export default LandingPage;
