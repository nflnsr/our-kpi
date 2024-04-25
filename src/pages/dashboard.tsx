import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useAuth } from "@/hooks/useAuth";

function Dashboard() {
  // const navigate = useNavigate();
  const { authData } = useAuth();
  console.log(authData, "authDatannya")
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
  console.log("tes");
  console.log(data);

  return (
    <Layout
      pageScroll={false}
      className="h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="px-5 pt-8 pb-20 sm:px-0 lg:px-10 xl:px-28 2xl:px-0">
        <div className="flex border-b-2 justify-normal border-slate-600">
          <h1 className="w-full text-lg font-semibold ">Dashboard</h1>
          <div className="flex gap-2">
            <h2 className="hidden sm:block">{data?.email}</h2>
            <h2 className="px-2 text-gray-500 capitalize bg-gray-200 rounded-lg">
              {data?.role}
            </h2>
          </div>
        </div>
        <div className="mt-5">
          <p>Selamat datang,</p>
          <p>
            {" "}
            {data?.name} dari Departemen {data?.departement_name}!
          </p>
        </div>
        <div className="flex flex-col items-center mt-24 text-xl justify-normal">
          <ul className="font-semibold list-disc bold list-item text-sky-500">
            {data?.role === "karyawan" && (
              <>
                <li>
                  <Link to="/penilaians">Penilaian</Link>
                </li>
                <li>
                  <Link
                    to="/laporan"
                    state={{ departement_id: data?.departement_id }}
                  >
                    Laporan
                  </Link>
                </li>
                <li>
                  <Link to="/rekomendasi">Rekomendasi</Link>
                </li>
              </>
            )}
            {data?.role === "admin" && (
              <>
                <li>
                  <Link to="/penilaians/admin">Penilaian</Link>
                </li>
                <li>
                  <Link
                    to="/laporan/admin"
                    state={{ departement_id: data?.departement_id }}
                  >
                    Laporan
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
