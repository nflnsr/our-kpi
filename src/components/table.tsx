import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// const data = {
//   data: [
//     {
//       klausul: {
//         klausul_id: "9bb361d5-53fa-4a2c-b242-34eede43e8a6",
//         klausul_name: "Klausul 1. Pembangunan dan Pemeliharaan Komitmen",
//         item: [
//           "Bill of quantity (Planning, RAB, evaluasi)",
//           "Jumlah laporan perubahan",
//         ],
//       },
//       target: 1,
//       aktual: "asdgasd",
//       keterangan: "asdgasd",
//     },
//     {
//       klausul: {
//         klausul_id: "9bb361d5-5811-4e4d-ac04-abf6fe36f159",
//         klausul_name: "Klausul 2. Pembuatan dan Pendokumentasikan Rencana K3",
//         item: [
//           `Pengukuran lingkungan kerja :
//           1.	Faktor Fisika
//           2.	Faktor Kimia
//           3.	Faktor Biologi
//           4.	Faktor Ergonomi
//           5.	Faktor Psikologi
//           `,
//           "Prosedur barang yang rusak atau kadaluarsa",
//         ],
//       },
//       target: 1,
//       aktual: "asdgasd",
//       keterangan: "asdgasd",
//     },
//   ],
// };

export function DashboardTable({
  data,
}: {
  data: {
    tableTitle: string[];
    indicatorTitle: string[];
    tableCell: string[][][];
  };
}) {
  return (
    // <Table>
    //   <TableHeader>
    //     <TableRow className="text-lg">
    //       <TableHead>Indikator</TableHead>
    //       <TableHead>Target</TableHead>
    //       <TableHead>Aktual</TableHead>
    //       <TableHead>Keterangan</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {data.data.map((dataaa) => (
    //       <>
    //         <TableRow className="font-semibold">
    //           {dataaa.klausul.klausul_name}
    //         </TableRow>
    //         {dataaa.klausul.item.map((item) => (
    //           <TableRow>
    //             <TableCell className="whitespace-pre-wrap">{item}</TableCell>
    //             <TableCell>{dataaa.target}</TableCell>
    //             <TableCell>{dataaa.aktual}</TableCell>
    //             <TableCell> {dataaa.keterangan}</TableCell>
    //           </TableRow>
    //         ))}
    //       </>
    //     ))}
    //   </TableBody>
    // </Table>

    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {data.tableTitle.map((title) => (
            <TableHead
              key={title}
              className="text-base font-semibold text-slate-700"
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.tableCell.map((cell, i) => (
          <>
            {data.indicatorTitle[i] && (
              <TableCell className="font-semibold ">
                {data.indicatorTitle[i]}
              </TableCell>
            )}
            {cell.map((item) => (
              <TableRow>
                {item.map((item) => (
                  <TableCell>{item}</TableCell>
                ))}
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
