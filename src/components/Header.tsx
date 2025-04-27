// components/Header.js
import Link from 'next/link';
import styles from '@/components/styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link href="/" className={styles.navItem}>
          Products
        </Link>
        <Link href="/info" className={styles.navItem}>
          Info
        </Link>
      </div>
    </header>
  );
};

export default Header;
