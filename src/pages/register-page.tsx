import { Layout } from "@/components/layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  departements_id: string;
  password: string;
  confirmPassword: string;
};

type Departement = {
  departements_id: number;
  departements_name: string;
};

function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["departements"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/departements");
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Omit<Inputs, "confirmPassword">) => {
      const res = await axiosInstance.post("/auth/register", data);

      return res.data;
    },
    onSuccess: async (data: { email?: string[]; message?: string }) => {
      if (data?.email?.[0] === "The email has already been taken.") {
        return toast({
          title: "Email already taken",
          className: "bg-white text-red-500 border-red-500 border-2",
          description: "Please use another email",
          duration: 4000,
        });
      }
      toast({
        title: "Register success",
        className: "bg-white text-green-500 border-green-500 border-2",
        description: "Please login to continue",
        duration: 8000,
      });
      navigate("/login");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { confirmPassword, ...newData } = data;
    if (data.password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "password not match",
      });
      return;
    }
    mutate(newData);
  };

  return (
    <Layout
      pageScroll
      className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="mx-auto w-full max-w-[350px] py-5">
        <form
          className="relative flex w-full flex-col items-center gap-1.5 rounded-lg border-2 border-blue-400 bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300 pb-6 pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-semibold text-center ">Register</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="nama" className="">
              Nama
            </label>
            <Input
              id="nama"
              type="nama"
              required
              {...register("name")}
              className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
              placeholder="Jhon Doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              {...register("email")}
              className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
              placeholder="jhondoe@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="departement">Departement</label>
            <select
              id="departement"
              {...register("departements_id")}
              required
              className="w-64 h-8 px-2 text-sm rounded-md ring-1 ring-cyan-500"
            >
              <option value="">--select departements--</option>
              {data?.data.map((departement: Departement) => (
                <option
                  key={departement.departements_id}
                  value={departement.departements_id}
                  className="h-20 text-sm"
                >
                  {departement.departements_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              required
              className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
              placeholder="&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="">
              Confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              required
              {...register("confirmPassword")}
              className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
              placeholder="&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;"
            />
            {errors.confirmPassword && (
              <p className="text-sm font-semibold text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-64 py-2 mt-1 text-lg font-semibold text-white bg-blue-400 rounded-lg disabled:opacity-55"
            disabled={isPending}
          >
            Register
          </button>
          <p>
            have an account?{" "}
            <span className="underline text-sky-800">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </form>
      </section>
    </Layout>
  );
}

export default RegisterPage;
