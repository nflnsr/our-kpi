import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Penilaian() {
  const axiosPrivate = useAxiosPrivate();
  const searchParams = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`penilaian-${searchParams.bulan}`],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        `/penilaians?months[]=${searchParams.bulan}`
      );
      return data;
    },
  });

  return (
    <Layout
      pageScroll={false}
      className="grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center px-2 py-4 sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <div
        className={`${isLoading && "absolute left-1/2 top-44 sm:top-32 -translate-x-1/2 text-center"}`}
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
