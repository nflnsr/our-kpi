import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

function Dashboard() {
  // const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/auth/me");
      console.log(data, "dataaaa");
      return data;
    },
    // retry: false,
  });
  console.log("tes")
  console.log(data);

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
