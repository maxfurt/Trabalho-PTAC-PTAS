import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/components/ListUsers";
import styles from "./Dashboard.module.css";

export default async function Dashboard() {
  const users = await getUsers();

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
          <ListUsers users={users} />
        </Suspense>
      </section>
    </div>
  );
}