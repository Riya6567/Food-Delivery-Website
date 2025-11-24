import React from 'react'
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';


function Card({name,image,price,id,type}) {
  let dispatch = useDispatch();
  return (
    <div className='w-[300px] h-[400px] bg-white p-3 rounded-lg shadow-lg overflow-hidden flex flex-col gap-3.5 hover:border-3 border-green-300'>
        <div className='w-[100%] h-[60%] overflow-hidden rounded-lg '>
            <img src={image} className='object-cover'/>
        </div>
        <div className='text-2xl font-bold'>{name} </div>
        <div className='w-full flex justify-between items-center'>
            <div className='text-green-500 text-lg font-semibold'>Rs {price}/-</div>
            <div className='flex justify-center items-center gap-2 text-green-500 font-semibold'>{type === 'veg'?<LuLeafyGreen/>:<GiChickenOven />}<span>{type}</span></div>
        </div>
        <button className=" appearance-none rounded-md w-full p-3 text-white !bg-green-500 font-bold hover:!bg-green-300 hover:text-black transition-all" 
          onClick={()=>{dispatch(AddItem({id:id, name:name, image:image, price:price, qty:1}));
          toast.success("Item added to cart")}
        }>
          Add to Cart 
        </button>
    </div>
  )
}

export default Card