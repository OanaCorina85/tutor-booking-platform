import styles from "./Navbar.module.css"; // Importă CSS Module
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <h2 className={styles.logo}>Easy learning with</h2>
      {/* Link-uri de navigare */}
      <ul className={`${styles.navLinks} `}>
        <li>
          <button>Acasa</button>
        </li>
        <li>
          <button>Despre</button>
        </li>
        <li>
          <button>Servicii</button>
        </li>
        <li>
          <button>Contact</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
