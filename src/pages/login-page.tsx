import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

function LoginPage() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState<JwtPayload>();

  useEffect(() => {
    try {
      const login = fetch("https://35.219.92.56/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "karyawan1@example.com",
          password: "password123",
        }),
      });

      login
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          const decode = jwtDecode(data.access_token);
          setToken(decode);
        });
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  console.log(data, "tessss");
  console.log(token, "token")
  return (
    <Layout
      pageScroll
      className="grid min-h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="mx-auto w-full max-w-[350px] py-5">
        <form className="flex flex-col items-center w-full gap-8 pt-10 pb-16 border-2 border-blue-400 rounded-lg bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300">
          <h1 className="pb-4 text-3xl font-semibold text-center">Login</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="jhondoe@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="*******"
            />
          </div>
          <button className="w-64 py-2 text-lg font-semibold text-white bg-blue-400 rounded-lg">
            Login
          </button>
          <p>
            {token?.exp}
          </p>
          <p>
            don't have account?{" "}
            <span className="underline text-sky-800">
              <a href="/register">Register here</a>
            </span>
          </p>
        </form>
      </section>
    </Layout>
  );
}

export default LoginPage;
