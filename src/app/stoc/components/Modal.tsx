import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react';
import Intrebare from './Intrebare';
import { useToast } from '@/components/hooks/useToast';
import { OrderSchema } from '@/lib/schemas';

type ModalProps = {
    // latime: number
    // inaltime: number
    // distantaSol: number
    // grosimeBara: number
    // latimeSuport: number
    // lungimeBara: number
    setShowModal: (value: boolean) => void
}

const Modal = ({
    // latime, inaltime, distantaSol, grosimeBara, latimeSuport, lungimeBara, 
    setShowModal
}: ModalProps) => {
  const { success, error, loading, dismiss } = useToast();
    // const images1 = [a1, a2, p1, p2];
    const modalRef = useRef<HTMLDivElement | null>(null);
      
        const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === modalRef.current) {
            setShowModal(false); 
          }
        };

        const [formData, setFormData] = useState({
          vopsit: '',
  folosire: '',
  forma: '',
  calatorit: '',
    nume: '',
    email: '',
    telefon: '',
    cantitate: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validation = OrderSchema.safeParse(formData);
if (!validation.success) {
  error('Datele introduse sunt invalide!');
  return;
}

      loading('Trimitem comanda...');
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      dismiss();
      if (res.ok) {
        success('Comanda trimisa cu succes!');
        setShowModal(false);
      } else {
        error('Ceva nu a mers bine');
      }
    } catch (err) {
      console.error(err);
      error('Trimitere esuata');
    }
  };
    
  return (
    <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto"
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
                      className="py-32P bg-white dark:bg-gray-900 rounded-2xl p-1 sm:p-10 w-full max-w-lg shadow-lg mx-16M max-h-container-1500 mt-400M mb-48M"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                    >
                      <h2
                        id="donation-title"
                        className="text-black text-lg sm:text-xl text-center font-bold mb-4"
                      >
                        Descrie-ti paralelele dorite
                      </h2>
    
                     
                        <form
                        onSubmit={handleSubmit}
                          className="text-black flex flex-col justify-center items-start space-y-4"
                        >
                          <Intrebare q={'Vopsit sau nevopsit(vopsit = +50 de lei la suma totala)?'} op1={'Alb'} op2={'Nevopsit'} op3={'Negru'} fieldName="vopsit" 
                          setFormData={setFormData}
                          />
                          <Intrebare q={'La ce vrei sa le folosesti cel mai mult?'} op1={'Flotari'} op2={'Handstand'} op3={'Frontlever'} setFormData={setFormData} fieldName="folosire" />
                          <Intrebare q={'Ce preferinte si legat de forma suportului?'} op1={'Triunghi'} op2={'Trapez'} op3={'Oricum'} setFormData={setFormData} fieldName="forma" />
                          <Intrebare q={'Calatoresti mult?'} op1={'Da'} op2={'Nu prea'} op3={'Deloc'} setFormData={setFormData} fieldName="calatorit" />
                          {/* <Intrebare q={''} op1={''} op2={''} op3={''} /> */}
                          <input
            className="p-2 rounded min-w-container-200 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline mb-32M"
            type="text"
            placeholder="Nume"
            value={formData.nume}
            onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
          />
    <input
            className="p-2 rounded min-w-container-200 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline mb-32M"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className="p-2 rounded min-w-container-200 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline mb-32M"
            type="text"
            placeholder="Numar de telefon"
            value={formData.telefon}
            onChange={(e) =>
              setFormData({ ...formData, telefon: e.target.value })
            }
          />
          <input
            className="p-2 rounded min-w-container-200 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline mb-32M"
            type="text"
            placeholder="Cate perechi(minim 1)"
            min={1}
            value={formData.cantitate}
            onChange={(e) =>
              setFormData({ ...formData, cantitate: e.target.value || '1' })
            }
          />
                          <button
                            type="submit"
                            className="text-white font-semibold w-full bg-green-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-green-600"
                          >
                            Trimite
                          </button>
    
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 text-sm cursor-pointer mx-auto hover:underline"
                          >
                            Iesi
                          </button>
                        </form>
                    </motion.div>
                  </motion.div>
  )
}

export default Modal