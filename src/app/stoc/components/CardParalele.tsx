import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '@/components/styles/Products.module.css';

type CardParaleleProps = {
    img: StaticImageData;
    title: string
}

const CardParalele = ({img, title}: CardParaleleProps) => {
  return (
    <>
    <div
            className={`${styles.cube} relative w-full w-full max-w-container-300 h-320H overflow-hidden`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="absolute w-full h-full"
              >
                {/* images1[activeImage] */}
                <Image
                  src={img}
                  alt="Cube"
                  fill
                  className={`rounded-16BR`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <h2
                      aria-label="Open donation modal"
                      className="text-lg font-bold min-w-container-300 w-full max-w-container-300 mt-16M py-2P cursor-pointer"
                    >
                        {title}
                    </h2>
    </>
  )
}

export default CardParalele