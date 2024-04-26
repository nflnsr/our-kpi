import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Laporan() {
  const axiosPrivate = useAxiosPrivate();
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchParams = useParams();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print Laporan",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  const { data, isLoading } = useQuery({
    queryKey: [`laporan-${searchParams.bulan}-${state.departement_id}`],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        `/laporan/${state.departement_id}/?month=${searchParams.bulan}`,
      );
      return data;
    },
  });

  return (
    <>
      <Layout
        pageScroll={false}
        className="relative grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center py-4 sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
      >
        <div className="flex justify-start w-full pl-4 sm:pl-0">
          <button
            className=" rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white"
            onClick={() => navigate(-1)}
          >
            kembali
          </button>
        </div>
        <div
          ref={componentRef}
          className="w-full px-4 overflow-x-auto overflow-y-hidden sm:px-10"
        >
          {/* <div ref={componentRef} className="w-full px-20"> */}
          <div className="w-full">
            <div
              className={`${isLoading && "absolute left-1/2 top-10 -translate-x-1/2 text-center sm:top-32"}`}
            >
              <h1 className="text-2xl font-bold text-center">Laporan</h1>
              <p className="px-2 pb-5 text-center">
                Laporan adalah penilaian yg telah disetujui oleh Admin
              </p>
            </div>
            <DashboardTable
              tableType="laporan"
              data={data?.data}
              total={data?.total}
              isLoading={isLoading}
              // componentRef={componentRef}
            />
          </div>
          {/* </div> */}
        </div>
        <div
          className={`pt-2 ${isLoading ? "absolute bottom-2 right-40" : "mr-8 flex w-full justify-end sm:mr-20"}`}
        >
          <button
            className="px-8 py-2 text-white bg-blue-400 rounded-lg disabled:bg-opacity-80"
            disabled={isLoading || data?.total_laporan_disetujui <= 0}
            onClick={handlePrint}
            // onClick={() => window.print()}
          >
            Cetak
          </button>
        </div>
      </Layout>
    </>
  );
}

export default Laporan;
