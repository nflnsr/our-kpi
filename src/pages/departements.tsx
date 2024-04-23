import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
const Departements = () => {
  const { pathname } = useLocation();
  const departementId: string[] = [
    "19e14efe-a1b9-4b30-a47a-6a3f8784dfef",
    "2c655695-0d36-434a-bacb-1503da5eb212",
    "2ee984f4-6ea1-4b15-b65a-8fb0eef2a9b2",
    "2f7a959e-b12f-476a-8a31-f10983700640",
    "31074e3c-ff27-412b-aacc-5e012d90ca66",
    "35426ae5-168e-4532-b1d5-b07cf7e49612",
    "3d54c6f5-19fb-4321-b06c-96414e997f10",
    "478812ec-7431-48fc-a2f6-2e8314eb8411",
    "534edba1-5347-4c33-a6be-d1d37c037c6b",
    "56975232-37e8-4815-95bc-30487abef09f",
    "6fc302d1-9eaf-4084-aaae-8ff29485346d",
    "74a9c179-8909-4984-8a17-5dedadb09c27",
    "91854771-cabc-4f0d-ac84-7bec3e63a068",
    "ad992e14-40f3-40ba-9186-cf54a5c7c095",
    "d31ac79f-51cf-4c1b-87cf-5227baeb33c7",
    "f76dc3a5-d988-4079-98f6-f73ff63d271d",
    "f821c9f4-01c5-4f70-8af9-700781f1b943",
    "fe7813c3-a62f-4d71-93a1-d8562b0d5154",
  ];
  const departementName: string[] = [
    "Utility",
    "PT Wahana",
    "FWGH Wahana",
    "Maintenance",
    "Ref 1, 2 & batch",
    "Fraksinasi 3",
    "Office",
    "Margarine 1, 2, 3 & tining",
    "Fraksinasi 2",
    "Fraksinasi 1",
    "Serac, Pet, Canning & Pouching",
    "Finish Goodwarehouse",
    "Fasum",
    "Laboratium QC",
    "CAMS Warehouse",
    "Hydrogenation",
    "PLU Nilam",
    "Tank Farm",
  ];
  return (
    <Layout className="grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]">
      <ul className="flex flex-col items-center justify-center gap-1 py-2.5 text-lg underline decoration-slate-400">
        {departementName.map((departement, i) => (
          <li key={i}>
            <Link
              to={`${pathname}/${departementName[i]}`}
              state={{ departement_id: departementId[i] }}
            >
              {departement}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default Departements;
