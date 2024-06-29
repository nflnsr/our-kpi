import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import React from "react";

const Month = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery({
    queryKey: ["months"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/penilaians/status-bulan");
      return data;
    },
  });
  console.log(data, "data");
  const { pathname, state } = useLocation();
  const { authData } = useAuth();
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
    <Layout className="relative grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <button
        className="absolute left-5 top-3 rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white sm:left-10 lg:left-20 xl:left-40"
        onClick={() => navigate(-1)}
      >
        kembali
      </button>
      <ul className="flex flex-col justify-center gap-1.5 text-xl decoration-slate-400 text-left">
        {authData?.role === "admin" && (
          <>
            {months.map((month, i) => (
              <li
                key={i}
                className="list-disc bold list-item text-sky-500 hover:text-sky-400 hover:underline"
              >
                <Link
                  to={`${pathname}/${numbers[i]}`}
                  state={{ departement_id: state?.departement_id }}
                >
                  {month}
                </Link>
              </li>
            ))}
          </>
        )}
        {authData?.role === "karyawan" && (
          <>
            {data?.map((month: { month: string; filled: boolean }, i: number) => (
              <React.Fragment key={i}>
                {/* {month.filled && ( */}
                  <li
                    className="list-disc bold list-item text-sky-500 hover:text-sky-400 hover:underline"
                  >
                    <Link
                      to={`${pathname}/${numbers[i]}`}
                      state={{ departement_id: state?.departement_id }}
                    >
                      {month.month}{" "}
                    </Link>
                    <p className="inline-block text-red-500">
                    {
                      month.filled ? ("✅") : "!"
                    }
                    </p>
                  </li>
                {/* )} */}
              </React.Fragment>
            ))}
          </>
        )}
      </ul>
    </Layout>
  );
};
export default Month;
