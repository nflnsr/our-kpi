import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex h-[var(--header-height-sm)] w-full items-center justify-between bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-500 px-10 max-[400px]:px-5 sm:h-[var(--header-height-lg)] sm:py-0 lg:px-20 xl:px-40">
      <div>
        <Link to="/">
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            OUR KPI
          </h1>
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-center font-semibold text-white sm:flex-row sm:gap-5">
        <Link to="/login" className="rounded-lg bg-sky-400 px-8 py-2">
          <button>Login</button>
        </Link>
        <Link to="/register" className="rounded-lg bg-blue-500 px-8 py-2">
          <button>Register</button>
        </Link>
      </div>
    </header>
  );
}
