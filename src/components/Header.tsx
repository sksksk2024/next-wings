// components/Header.js
'use client';

import Link from 'next/link';
import styles from '@/components/styles/Header.module.css';
import { motion } from 'framer-motion';
import { navVariants } from './motionVariants/motionVariants';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <motion.button
          variants={navVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link
            href="/"
            className={`{styles.navItem} text-lg ${
              pathname === '/' ? 'text-blue-700' : 'hover:text-blue-700'
            }`}
          >
            Products
          </Link>
        </motion.button>
        <motion.button
          variants={navVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link
            href="/info"
            className={`{styles.navItem} text-lg ${
              pathname === '/info' ? 'text-blue-700' : 'hover:text-blue-700'
            }`}
          >
            Info
          </Link>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
