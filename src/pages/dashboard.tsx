import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";

function Dashboard() {
  const apiResponse =
    "Pemeriksaan alat tanggap darurat : 1. Inspeksi APAR 2. Inspeksi Hydrant 3. Inspeksi Fire Alarm System";
  const responseLines = apiResponse.split(/(?=\d\.)/);

  return (
    <Layout
      pageScroll={false}
      className="h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="px-5 pt-8 pb-20 sm:px-0 lg:px-10 xl:px-28 2xl:px-0">
        <h1 className="w-full text-lg font-semibold border-b-2 border-slate-600">
          Dashboard
        </h1>
        <div className="mt-5">
          <p>Selamat datang,</p>
          <p>Jhon Doe dari Departemen Marketing!</p>
        </div>
        {responseLines.map((line, index) => (
          // Menambahkan newline sebelum angka kecuali pada baris pertama
          <p key={index}>
            {index > 0 ? "\n" : ""}
            {line}
          </p>
        ))}
        <div className="flex flex-col items-center mt-24 text-xl justify-normal">
          <ul className="font-semibold list-disc bold list-item text-sky-500">
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
