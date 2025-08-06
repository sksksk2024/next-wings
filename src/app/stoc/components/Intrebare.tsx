'use client'
import React, { useState } from 'react'

type IntrebareProps = {
    q: string;
    op1: string;
    op2: string;
    op3: string;
    fieldName: string; // Identifies which field to update
    setFormData: React.Dispatch<React.SetStateAction<{
      vopsit: string;
      folosire: string;
      forma: string;
      calatorit: string;
      nume: string;
      email: string;
      telefon: string;
      cantitate: string;
    }>>
}

const Intrebare = ({
    q, op1, op2, op3, fieldName, setFormData
}: IntrebareProps) => {
  const [click, setClick] = useState<1 | 2 | 3>()

  const handleSelected = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value}))
  }

  return (
    <div className="mb-32M">
                          <h3 className='mb-16M'>{q}</h3>
                          <div className="grid grid-cols-3 gap-1 sm:gap-4 w-full text-black">
                            <button type='button' className={`text-sm text-center py-8P  px-16P sm:p-16P sm:px-24P bg-gray-400 text-white font-bold cursor-pointer hover:bg-green-500 ${click === 1 && 'bg-green-500 hover:bg-green-700'}`}
                            onClick={() => {handleSelected(op1)
                              setClick(1)
                            }}
                            >{op1}</button>
                            <button type='button' className={`text-sm text-center py-8P  px-16P sm:p-16P sm:px-24P bg-gray-400 text-white font-bold cursor-pointer hover:bg-green-500 ${click === 2 && 'bg-green-500 hover:bg-green-700'}`}
                            onClick={() => {handleSelected(op2)
                              setClick(2)
                            }}
                            >{op2}</button>
                            <button type='button' className={`text-sm text-center py-8P  px-16P sm:p-16P sm:px-24P bg-gray-400 text-white font-bold cursor-pointer hover:bg-green-500 ${click === 3 && 'bg-green-500 hover:bg-green-700'}`}
                            onClick={() => {handleSelected(op3)
                              setClick(3)
                            }}
                            >{op3}</button>
                          </div>
                          </div>
  )
}

export default Intrebare