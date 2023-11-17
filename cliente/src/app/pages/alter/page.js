'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import styles from "./Alter.module.css";

export default function Alter() {
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
  });
  const { refresh } = useRouter();

  const handlerAlter = async (e) => {
    e.preventDefault();
    try {
        toast.error("Usuario Alterado Com Sucesso")
  }catch {
      refresh();
      toast.error("erro na aplicação")
    }
  }
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
      <h1 className={styles.title}>Alterar</h1>
      <form onSubmit={handlerAlter}>
        <input
          className={styles.input}
          placeholder='Nome'
          type="text"
          onChange={(e) => { setUser({ ...user, text: e.target.value }) }}
        />
        <input
          className={styles.input}
          placeholder='E-mail'
          type="email"
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
        />
        <input
          className={styles.input}
          placeholder='Senha'
          type='password'
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
        />
        <button className={styles.button}>Confimar</button>
      </form>
      <ToastContainer />
    </div>
  )
}
