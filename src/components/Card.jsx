import React from 'react'
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";


function Card({name,image,price,id,type}) {
  return (
    <div className='w-[300px] h-[400px] bg-white p-3 rounded-lg shadow-lg overflow-hidden flex flex-col gap-3.5 hover:border-3 border-green-300'>
        <div className='w-[100%] h-[60%] overflow-hidden rounded-lg '>
            <img src={image} className='object-cover'/>
        </div>
        <div className='text-2xl font-bold'>{name} </div>
        <div className='w-full flex justify-between items-center'>
            <div className='text-green-500 text-lg font-semibold'>Rs {price}/-</div>
            <div className='flex justify-center items-center gap-2 text-green-500 font-semibold'>{type === 'Veg'?<LuLeafyGreen/>:<GiChickenOven />}<span>{type}</span></div>
        </div>
        <button className=" appearance-none w-full p-3 text-white !bg-green-500 font-bold hover:!bg-green-300 hover:text-black transition-all">
          Add to Cart 
        </button>
    </div>
  )
}

export default Card