import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Rekomendasi() {
  const axiosPrivate = useAxiosPrivate();
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
      className="grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center px-2 py-4 sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <div className={`${isLoading && "absolute top-44 sm:top-32 left-1/2 -translate-x-1/2 text-center"}`}>
        <h1 className="text-2xl font-bold text-center">Rekomendasi</h1>
        <p className="px-2 pb-5 text-center">
          Rekomendasi adalah penilaian yg tidak disetujui dan diberikan feedback oleh Admin
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
