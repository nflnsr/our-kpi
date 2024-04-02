import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Layout
      pageScroll={false}
      className="h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="px-5 pb-20 pt-8 sm:px-0 lg:px-10 xl:px-28 2xl:px-0">
        <h1 className="w-full border-b-2 border-slate-600 text-lg font-semibold">
          Dashboard
        </h1>
        <div className="mt-5">
          <p>Selamat datang,</p>
          <p>Jhon Doe dari Departemen Marketing!</p>
        </div>
        <div className="mt-24 flex flex-col items-center justify-normal text-xl">
          <ul className="bold list-item list-disc font-semibold text-sky-500">
            <li>
              <Link to="/penilaian">Penilaian</Link>
            </li>
            <li>
              <Link to="/laporan">Laporan</Link>
            </li>
            <li>
              <Link to="/rekomendasi">Rekomendasi</Link>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
