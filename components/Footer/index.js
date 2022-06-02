import Link from "next/link";
import styles from "../Footer/index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="#">
        <a className={styles.enlace}>Acerca de</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Centro de ayuda</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Condiciones de Servicio</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Politica de Privacidad</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Politica de cookies</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Accesibilidad</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>información de anuncios</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Blog</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Estado</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Empleos</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Recursos para marcas</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Publicidad</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Marketing</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Twitter para empresas</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Desarrolladores</a>
      </Link>{" "}
      <Link href="#">
        <a className={styles.enlace}>Guía</a>
      </Link>
    </footer>
  );
};

export default Footer;
