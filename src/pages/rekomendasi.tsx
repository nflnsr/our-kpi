import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

function Rekomendasi() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const searchParams = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`rekomendasi-${searchParams.bulan}`],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        `/rekomendasi?months[]=${searchParams.bulan}`,
      );
      return data;
    },
  });

  return (
    <Layout
      pageScroll={false}
      className="grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center px-2 py-4 sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))] relative"
    >
      <button
        className="absolute left-5 top-3 rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white sm:left-10 lg:left-20 xl:left-40"
        onClick={() => navigate(-1)}
      >
        kembali
      </button>
      <div
        className={`${isLoading && "absolute left-1/2 top-44 -translate-x-1/2 text-center sm:top-32"}`}
      >
        <h1 className="text-2xl font-bold text-center">Rekomendasi</h1>
        <p className="px-2 pb-5 text-center">
          Rekomendasi adalah penilaian yg tidak disetujui dan diberikan feedback
          oleh Admin
        </p>
      </div>
      <DashboardTable
        tableType="rekomendasi"
        data={data?.data}
        total={data?.total}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default Rekomendasi;
