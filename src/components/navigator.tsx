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
    path: "/post/111",
    name: "post1",
  },
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
