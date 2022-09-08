import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Olavo Tem Razão</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">
              <a>Automático</a>
            </Link>
          </li>
          <li>
            <Link href="/manual">
              <a>Manual</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
