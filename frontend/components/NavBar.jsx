"use client";

import Link from 'next/link';
import Styles from './NavBar.module.css';
import AuthButton from './AuthButton';

export default function NavBar({isLogged}) {
  return ( 
    <div className={Styles.navContainer}>
      <nav>
        <ul className={Styles.navList}>
          <li><Link href="/">Menu</Link></li>
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/proyectos">Proyectos</Link></li>
          <li><Link href="/tareas">Tareas</Link></li>

          <li><AuthButton isLogged={isLogged} className={Styles.loginBtn}/></li>
        </ul>
      </nav>
    </div>
  );
}