'use client'
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import styles from "./Register.module.css";
import { postUser } from "@/app/functions/handlerAcessAPI";

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const {push} =useRouter();
  const { refresh } = useRouter();


  const handlerRegister = async (e) => {
    e.preventDefault();
    try {
        await postUser(user)
        toast.error("Usuario Registrado Com Sucesso")
        return push("/pages/dasboard")
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
      <h1 className={styles.title}>Registrar</h1>
      <form onSubmit={handlerRegister}>
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
        <button className={styles.button}>Registrar</button>
      </form>
      <ToastContainer />
    </div>
  );
}