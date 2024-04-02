import { Layout } from "@/components/layout";

function RegisterPage() {
  return (
    <Layout
      pageScroll
      className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <section className="mx-auto w-full max-w-[350px]">
        <form className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-blue-400 bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300 pb-6 pt-4">
          <h1 className="text-center text-3xl font-semibold ">Register</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="nama" className="text-lg">
              Nama
            </label>
            <input
              type="nama"
              id="nama"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="Jhon Doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="jhondoe@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="departemen" className="text-lg">
              Departemen
            </label>
            <input
              type="departemen"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="Marketing"
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
          <div className="flex flex-col gap-1">
            <label htmlFor="Confirm password" className="text-lg">
              Confirm password
            </label>
            <input
              type="Confirm password"
              className="my-auto w-64 px-2 py-0.5 ring-1 ring-cyan-500"
              placeholder="*******"
            />
          </div>
          <button className="w-64 rounded-lg bg-blue-400 py-2 text-lg font-semibold text-white">
            Register
          </button>
          <p>
            have an account?{" "}
            <span className="text-sky-800 underline">
              <a href="/login">Login here</a>
            </span>
          </p>
        </form>
      </section>
    </Layout>
  );
}

export default RegisterPage;
