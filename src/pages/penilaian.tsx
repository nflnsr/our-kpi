import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";
import { useAuth } from "@/hooks/useAuth";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Penilaian() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { authData } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const searchParams = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`penilaian-${searchParams.bulan}-${state.departement_id}`],
    queryFn: async () => {
      if (authData.role === "admin") {
        const { data } = await axiosPrivate.get(
          `/penilaians/${state.departement_id}/?months[]=${searchParams.bulan}`,
        );
        return data;
      }
      const { data } = await axiosPrivate.get(
        `/penilaians/?months[]=${searchParams.bulan}`,
      );
      return data;
    },
  });

  return (
    <Layout
      pageScroll={false}
      className="relative grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center px-2 py-4 sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <button
        className="absolute left-5 top-3 rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white sm:left-10 lg:left-20 xl:left-40"
        onClick={() => navigate(-1)}
      >
        kembali
      </button>
      <div
        className={`${isLoading && "absolute left-1/2 top-10  -translate-x-1/2 text-center sm:top-32"}`}
      >
        <h1 className="text-2xl font-bold text-center">Penilaian</h1>
        <p className="px-2 pb-5 text-center">
          Isi penilaian dengan mengklik baris yang ingin diedit
        </p>
      </div>
      <DashboardTable
        tableType="penilaian"
        data={data?.data}
        total={data?.total}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default Penilaian;
