'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import styles from "./page.module.css"

export default function Login() {
  const [user, setUser] = useState({
    usuario: '',
    senha: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {

      const userAuth = await handlerAcessUser(user)
      if(userAuth.token ===undefined){
        toast.error("erro no email ou senha")
      }

      push('/pages/dashboard');
      localStorage.setItem('nome', userAuth.nome)
    } catch {
      refresh();
      toast.error("erro na aplicação")
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handlerLogin}>
      <input
          className={styles.input}
          placeholder='E-mail'
          type="text"
          onChange={(e) => { setUser({ ...user, usuario: e.target.value }) }}
        />
        <input
          className={styles.input}
          placeholder='Senha'
          type='password'
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}
        />
        <button className={styles.button}>Entrar</button>
      </form>
      <ToastContainer/>
    </div>
  )
}
