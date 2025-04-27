// page.tsx

'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '@/components/styles/Products.module.css';
import a1 from '@/../public/a1.png';
import a2 from '@/../public/a2.png';
import p1 from '@/../public/p1.png';
import p2 from '@/../public/p2.png';
import Image from 'next/image';

const Products = () => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [a1, a2, p1, p2];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div>
      <Header />
      <div className={styles.productContainer}>
        <div className={styles.cube}>
          <Image
            src={images[activeImage]}
            alt="Cube"
            className={styles.cubeImage}
          />
        </div>
        <div className={styles.navigation}>
          <button onClick={prevImage} className={styles.navButton}>
            Prev
          </button>
          <button onClick={nextImage} className={styles.navButton}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
