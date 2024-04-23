import { useLocation, Link } from "react-router-dom";
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
  console.log(state?.departement_id);
  return (
    <Layout className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
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
