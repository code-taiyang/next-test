import Link from "next/link";

export interface RouteInfo {
  path: string;
  name: string;
}

export default function Navigator({routes}: {routes: RouteInfo[]}) {
  return (
    <ul>
      {routes.map((r) => (
        <li key={r.path}>
          <Link href={r.path}>{r.name}</Link>
        </li>
      ))}
    </ul>
  );
}
