'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageWrapper from '@/components/utils/PageWrapper';
import styles from '@/components/styles/Products.module.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { EmailSchema } from '@/lib/schemas';

const Mesaje = () => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    if (!email || !content) {
      setStatus('Fill in all fields!');
      return;
    }

    const validation = EmailSchema.safeParse({ email });
    if (!validation.success) {
      setStatus(validation.error.errors[0].message); // shows 'Invalid email address'
      return;
    }

    try {
      const res = await fetch('/api/chats', {
        method: 'POST',
        body: JSON.stringify({ email, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Mesajul s-a trimis cu succes!');
        setEmail('');
        setContent('');
      } else {
        setStatus(data.error || 'Ceva nu a mers bine!');
      }
    } catch (error) {
      setStatus(`Failed to send message: ${error}`);
    }
  };

  return (
    <PageWrapper>
      <div>
        <Header />
        <main
          className={`${styles.productContainer} flex justify-center items-center gap-2 min-h-container-600 h-[87dvh] mx-auto px-32P`}
        >
          <h1 className="text-xl text-center text-white font-bold uppercase mb-32M">
            Trimite mesaj echipei!
          </h1>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="email"
            placeholder="Introduce-ti emailul"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white min-w-container-300 w-full max-w-container-600 max-h-container-400 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            placeholder="Mesajul tau"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <motion.button
            aria-label="Open donation modal"
            className="text-lg font-bold min-w-container-300 w-full max-w-container-300 mt-16M py-16P bg-blue-600 cursor-pointer"
            variants={buttonVariants}
            initial="initial"
            whileTap="tap"
            animate="exit"
            onClick={sendMessage}
          >
            TRIMITE
          </motion.button>
          {status && (
            <p
              className={`text-sm mt-8M
            ${status === 'Mesajul s-a trimis cu succes!' ? 'text-green-400' : 'text-red-400'}
            `}
            >
              {status}
            </p>
          )}
        </main>
        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Mesaje;
