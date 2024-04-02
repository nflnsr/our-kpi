import { Layout } from "@/components/layout";
import { DashboardTable } from "@/components/table";

const dataTable = {
  tableTitle: ["Indikator", "Target", "Aktual", "Keterangan"],
  indicatorTitle: [
    "Klausul 1. Pembangunan dan Pemeliharaan Komitmen",
    "Klausul 2. Pembuatan dan Pendokumentasikan Rencana K3",
    "Klausul 3. Pengendalian Perancangan",
  ],
  tableCell: [
    [
      ["Terdapat kebijakan K3", "1", "aktual tes", "keterangan tes"],
      ["Kebijakan K3 dikomunikasikan", "2", "aktual tes", "keterangan tes"],
    ],
    [
      ["Rencana kerja dan rencana khusus", "3", "aktual tes", "keterangan tes"],
      ["Informasi K3 dikomunikasikan", "4", "aktual tes", "keterangan tes"],
    ],
    [
      [
        "Bill of quantity (Planning, RAB, evaluasi)",
        "5",
        "aktual tes",
        "keterangan tes",
      ],
      ["Jumlah laporan perubahan", "6", "aktual tes", "keterangan tes"],
    ],
  ],
};

function Penilaian() {
  return (
    <Layout pageScroll={false} className="my-3.5">
      <div className="">
        <DashboardTable data={dataTable} />
      </div>
    </Layout>
  );
}

export default Penilaian;
