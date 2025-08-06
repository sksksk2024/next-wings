'use client'

import React, { useRef } from 'react'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import b from '@/../public/b_pair_side.jpg';
import all from '@/../public/ALL_COVER.jpg';
import str from '@/../public/s_triangle_pair_side.jpg';
import s from '@/../public/s_pair_side.jpg';
import m from '@/../public/m_side_pair.jpg';
import a2 from '@/../public/a2.png';
import p1 from '@/../public/p1.png';
import p2 from '@/../public/p2.png';
import {
  piggyWiggle,
} from '@/components/motionVariants/motionVariants';
import PageWrapper from '@/components/utils/PageWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from './components/Modal';
import CardParalele from './components/CardParalele';

const page = () => {
  const [showModal, setShowModal] = useState(false);

  // setTimeout(() => {
  //   setActiveImage((prev) => (prev + 1) % images1.length)
  // }, 10000)

  // setTimeout(() => {
  //   setActiveImage((prev) => (prev + 1) % images2.length)
  // }, 10000)
  
  // setTimeout(() => {
  //   setActiveImage((prev) => (prev + 1) % images3.length)
  // }, 10000)

  return (
    <PageWrapper>
      <Header />
      <div className="w-full flex flex-col justify-center items-center py-32P">
     
      <h1 className="text-xl text-center text-white font-bold uppercase">
            Paralele Personalizate. <br /> Ce preferinte ai?
          </h1>
          <motion.button
                      aria-label="Open donation modal"
                      className="lg:hidden text-lg font-bold min-w-container-300 w-full max-w-container-300 mt-16M py-16P bg-blue-600 cursor-pointer mx-auto"
                      variants={piggyWiggle}
                      initial="initial"
                      whileTap="tap"
                      whileHover="hover"
                      onClick={() => setShowModal(true)}
                    >
                      COMANDA
                    </motion.button>
    <ul className={`flex flex-wrap gap-12 sm:gap-4 justify-around items-center text-center px-32P sm:transform-x-1/2 my-16 lg:min-h-[38.9375rem]`}>
      <li className='mx-auto'>
      <CardParalele img={b} title={'BEEFY BOYS'} />
      </li>
      <li className='mx-auto'>
      <CardParalele img={s} title={'EASY TRAVEL'} />
      </li>
      <li className='mx-auto'>
      <CardParalele img={all} title={`HIGH BARS (100% custom)`} />
      </li>
      <li className='mx-auto'>
      <CardParalele img={m} title={'GOOD OVERALL'} />
      </li>
      <li className='mx-auto'>
      <CardParalele img={str} title={'EQUILIBRIUM'} />
      </li>
    </ul>
    <motion.button
                      aria-label="Open donation modal"
                      className="text-lg font-bold min-w-container-300 w-full max-w-container-300 mt-16M py-16P bg-blue-600 cursor-pointer mx-auto"
                      variants={piggyWiggle}
                      initial="initial"
                      whileTap="tap"
                      whileHover="hover"
                      onClick={() => setShowModal(true)}
                    >
                      COMANDA
                    </motion.button>
      </div>
    <AnimatePresence>
                {showModal && (
                  <Modal latime={10} inaltime={10} distantaSol={5} grosimeBara={38} latimeSuport={46} lungimeBara={20} setShowModal={setShowModal} />
                )}
              </AnimatePresence>
    <Footer />
    </PageWrapper>
  )
}

export default page