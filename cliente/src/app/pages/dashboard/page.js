import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/components/ListUsers";
import styles from "./Dashboard.module.css";

export default async function Dashboard() {
  let usuarios = getUsers();

  const req = await fetch("https://aula-17-10-xi.vercel.app/users", {
    cache: "no-cache"
  
  });

  const users = await req.json();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <a href="/" className={styles.link}>
                Home
              </a>
            </li>
            <li className={styles.li}>
              <a href="/pages/register" className={styles.link}>
                Register
              </a>
            </li>
            <li className={styles.li}>
              <a href="/pages/alter" className={styles.link}>
                Alterar
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className={styles.userList}>
        <h1 className={styles.title}>Dashboard</h1>
        <Suspense fallback={<p>Carregando...</p>}>
          <ListUsers users={usuarios} />
        </Suspense>
      </section>
    </div>
  );
}