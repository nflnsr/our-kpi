import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
const Month = () => {
  const { pathname, state } = useLocation();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const numbers: string[] = [];
  for (let i = 1; i <= 12; i++) {
    numbers.push("" + i);
  }
  const navigate = useNavigate();
  return (
    <Layout className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center relative sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <button className="absolute px-4 py-0.5 rounded-md pb-1 text-white bg-blue-400 top-3 left-5 sm:left-10 lg:left-20 xl:left-40" onClick={() => navigate(-1)}>kembali</button>
      <ul className="flex flex-col items-center justify-center gap-1.5 text-xl underline decoration-slate-400">
        {months.map((month, i) => (
          <li key={i}>
            <Link
              to={`${pathname}/${numbers[i]}`}
              state={{ departement_id: state?.departement_id }}
            >
              {month}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default Month;
