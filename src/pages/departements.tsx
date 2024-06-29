import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
const Departements = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ["departements"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/departements");
      return data;
    },
  });

  return (
    <Layout className="relative grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <button
        className="absolute left-4 top-3 rounded-md bg-blue-400 px-4 py-0.5 pb-1 text-white sm:left-10 lg:left-20 xl:left-40"
        onClick={() => navigate(-1)}
      >
        kembali
      </button>
      <ul className="flex list-disc flex-col text-left justify-center gap-1 py-2.5 text-lg decoration-slate-400">
        {data?.data?.map(
          (
            departement: { departements_id: string; departements_name: string },
            i: number,
          ) => (
            <li
              key={i}
              className="text-sky-500 hover:text-sky-400 hover:underline"
            >
              <Link
                to={`${pathname}/${departement.departements_id}`}
                state={{ departement_id: departement.departements_id }}
              >
                {departement?.departements_name}
              </Link>
            </li>
          ),
        )}
      </ul>
    </Layout>
  );
};
export default Departements;
