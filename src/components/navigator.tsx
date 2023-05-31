import Link from "next/link";

const routes = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/post/helloworld",
    name: "helloworld"
  },
  {
    path: "/post/dynamic-route",
    name: "dynamic-route"
  }
];

export default function Navigator() {
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
