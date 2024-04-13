import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { authService } from "@/config/auth";
import { useAuth } from "@/hooks/useAuth";
// import { authService } from "@/config/auth";
import { axiosInstance } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';


type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const { setAuthData } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });
      return { access_token: res.data.access_token, email: data.email };
    },
    onSuccess: async (data: { access_token: string; email: string }) => {
      authService.storeToken(data.access_token);
      setAuthData({
        email: data.email,
        isAuth: true,
        accessToken: data.access_token,
      });
      navigate(from, { replace: true });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <Layout
      pageScroll
      className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="mx-auto w-full max-w-[350px] py-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full gap-8 pt-10 pb-10 border-2 border-blue-400 rounded-lg bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300"
        >
          <h1 className="pb-4 text-3xl font-semibold text-center">Login</h1>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                required
                className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
                placeholder="jhondoe@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <Input
                type="password"
                id="password"
                {...register("password")}
                required
                className="w-64 h-8 px-2 my-auto ring-1 ring-cyan-500"
                placeholder="&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;&#128900;"
              />
            </div>
          </div>
          <button
            className="w-64 py-2 text-lg font-semibold text-white bg-blue-400 rounded-lg"
            disabled={isPending}
          >
            Login
          </button>
          <p className="mt-8">
            don't have account?{" "}
            <span className="underline text-sky-800">
              <Link to="/register">Register here</Link>
            </span>
          </p>
        </form>
      </section>
    </Layout>
  );
}

export default LoginPage;
