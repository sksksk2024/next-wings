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
            Produse
          </Link>
        </motion.button>
        {/* {!session?.user ? (
          <button>
            <Link
              href="/mesaje"
              className={`{styles.navItem} text-gray-500 text-lg cursor-not-allowed
              }`}
            >
              Scrie-i owner-ul
            </Link>
          </button>
        ) : (
          <motion.button
            variants={navVariants}
            initial="hidden"
            whileHover="hover"
            animate="exit"
          >
            <Link
              href="/mesaje"
              className={`{styles.navItem} text-lg ${
                pathname === '/mesaje' ? 'text-blue-700' : 'hover:text-blue-700'
              }`}
            >
              Scrie-i owner-ul
            </Link>
          </motion.button>
        )} */}
        <motion.button
          variants={navVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link
            href="/mesaje"
            className={`{styles.navItem} text-lg ${
              pathname === '/mesaje' ? 'text-blue-700' : 'hover:text-blue-700'
            }`}
          >
            Contact
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
