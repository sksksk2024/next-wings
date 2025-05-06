// page.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/hooks/useToast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '@/components/styles/Products.module.css';
import a1 from '@/../public/a1.png';
import a2 from '@/../public/a2.png';
import p1 from '@/../public/p1.png';
import p2 from '@/../public/p2.png';
import Image from 'next/image';
import {
  buttonVariants,
  cubeVariants,
  piggyWiggle,
} from '@/components/motionVariants/motionVariants';
import PageWrapper from '@/components/utils/PageWrapper';

const Products = () => {
  const { success, error, loading, dismiss } = useToast();

  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1); // Going down
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1); // Going up
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const images = [a1, a2, p1, p2];

  // STRIPE PAYMENT
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { data: session } = useSession() || {};

  // EXTRACTING GOOGLE EMAIL FROM USER

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = (
      e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement
    ).value;

    try {
      loading('Sending your message...');
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message }),
      });

      dismiss();
      const data = await res.json();

      if (res.ok) {
        success(data.message);
        setShowModal(false);
      } else {
        error(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      error('Failed to send message');
    }
  };

  return (
    <PageWrapper>
      <div>
        <Header />
        <h1 hidden>Pagina de Produse</h1>
        <main
          className={`${styles.productContainer} flex justify-center items-center min-h-container-600 h-[87dvh] px-32P`}
        >
          <div
            className={`${styles.cube} relative w-full w-full max-w-container-300 h-320H overflow-hidden`}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeImage}
                custom={direction}
                variants={cubeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.1 },
                }}
                className="absolute w-full h-full"
              >
                <Image
                  src={images[activeImage]}
                  alt="Cube"
                  fill
                  className={`${
                    images[activeImage] !== a2 && 'object-cover'
                  } rounded-16BR`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className={`${styles.navigation} flex justify-between items-center gap-10 w-full max-w-container-300 mt-4`}
          >
            <motion.button
              onClick={prevImage}
              className={`${styles.navButton} w-1/2 bg-white text-black font-bold py-2 rounded`}
              variants={buttonVariants}
              initial="initial"
              whileTap="tap"
              animate="exit"
            >
              Inapoi
            </motion.button>
            <motion.button
              onClick={nextImage}
              className={`${styles.navButton} w-1/2 bg-white text-black font-bold py-2 rounded`}
              variants={buttonVariants}
              initial="initial"
              whileTap="tap"
              animate="exit"
            >
              Inainte
            </motion.button>
          </div>

          {/* BUY BUTTON HERE */}
          <motion.button
            aria-label="Open donation modal"
            className="text-lg font-bold min-w-container-300 w-full max-w-container-300 mt-16M py-16P bg-blue-600 cursor-pointer"
            variants={piggyWiggle}
            initial="initial"
            whileTap="tap"
            whileHover="hover"
            onClick={() => setShowModal(true)}
          >
            COMANDA
          </motion.button>

          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={modalRef}
                onClick={handleBackdropClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby="donation-title"
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-2xl p-10 w-full max-w-lg shadow-lg mx-16M"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                >
                  <h2
                    id="donation-title"
                    className="text-black text-xl text-center font-bold mb-4"
                  >
                    {session?.user
                      ? 'Descrie-ti cum vrei sa-ti arate paralelele.'
                      : 'Intra in cont inainte sa scrii!'}
                  </h2>

                  {!session?.user ? (
                    <div className="flex flex-col gap-4 items-center">
                      <button
                        onClick={() => signIn('google')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                      >
                        Logheza-te cu Google
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 text-sm cursor-pointer hover:underline"
                      >
                        Iesi
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-center items-center space-y-4"
                    >
                      <textarea
                        name="message"
                        required
                        placeholder="Write the model or idea for the parallettes..."
                        className="text-black w-full p-3 rounded-lg border border-gray-300"
                      />

                      <button
                        type="submit"
                        className="text-white font-semibold w-full bg-green-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-green-600"
                      >
                        Trimite Comanda
                      </button>

                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="text-center text-sm text-red-600 hover:underline cursor-pointer"
                      >
                        Iesi din Cont
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 text-sm cursor-pointer hover:underline"
                      >
                        Iesi
                      </button>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Products;
