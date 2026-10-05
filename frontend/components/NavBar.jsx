"use client";

import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
  return ( 
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <li><Link href="/">Menu</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/proyectos">Proyectos</Link></li>
          <li><Link href="/tareas">Tareas</Link></li>
        </ul>
      </nav>
    </div>
  );
}