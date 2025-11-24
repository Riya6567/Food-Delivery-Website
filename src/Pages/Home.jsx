import { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Categories from '../Category'
import Card from '../components/Card'
import {food_items} from '../food'
import { dataContext } from '../Context/UserContext'
import { RxCross2 } from "react-icons/rx";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Home() {
    let {cate, setCate,input,showCart,setShowCart} = useContext(dataContext)

    function filter(category) {
        if(category==="All"){
            setCate(food_items)
        }else{
            let newList = food_items.filter((item)=>(item.food_category == category))
            setCate(newList)
        }
    }
    let items = useSelector((state)=>state.cart)
    let subtotal = items.reduce((total, item)=>total+item.price * item.qty,0)
    let deliveryFee = subtotal>0 ? 40 : 0;
    let taxes = subtotal * 0.5/100;
    let total = Math.floor(subtotal + deliveryFee + taxes);
    
  return (
    <>
    <div className='bg-slate-200 w-[100%] min-h-screen'>
        <Nav/>
        {!input? <div className='flex flex-wrap justify-center items-center gap-5 w-[100%]'>
            {Categories.map((item)=>{
                return(
                    <div className='w-[140px] h-[150px] flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-700 bg-white rounded-lg shadow-md hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={()=>filter(item.name)}>
                        {item.icon}
                        {item.name}
                    </div>
                )   
            })}
        </div>: null
        }
        <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
            {cate.length>1 ? 
                cate.map((item)=>(
                    <Card name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
                ))
                :
                <span className='text-green-500 font-semibold text-3xl'>No items found</span>
            }
            
        </div>

        {/* Cart Div */}
        <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 flex flex-col items-center transition-all duration-500 overflow-auto ${showCart? "translate-x-0":"translate-x-full"}`}>
            <header className='w-[100%] flex justify-between items-center p-7'>
                <span className='text-green-400 font-semibold text-[20px]'>Order Items</span>
                <RxCross2 className='w-[30px] h-[30px] text-green-400 font-bold text-[25px] cursor-pointer hover:text-gray-700'onClick={()=>setShowCart(false)}/>
            </header>
            {items.length > 0 ? 
            <>
            <div className='w-full mt-8 flex flex-col gap-5'>
                {items.map((item)=>(
                    <Card2 name={item.name} image={item.image} price={item.price} id={item.id} qty={item.qty}/> 
                ))}
            </div>
            <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
                <div className='w-full flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-600'>Subtotal</span>
                    <span className='text-lg font-semibold text-green-400'>Rs {subtotal}/--</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-600'>Delivery Fee</span>
                    <span className='text-lg font-semibold text-green-400'>Rs {deliveryFee}/--</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-600'>Taxes</span>
                    <span className='text-lg font-semibold text-green-400'>Rs {taxes}/--</span>
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 p-2'>
                <div className='w-full flex justify-between items-center p-9'>
                    <span className='text-2xl font-semibold text-gray-600'>Grand Total</span>
                    <span className='text-2xl font-semibold text-green-400'>Rs {total}/--</span>
                </div>
            </div>
            <button className="w-[80%] p-3 text-white !bg-green-500 font-bold hover:!bg-green-300 hover:text-black transition-all rounded-md" onClick={()=> {toast.success("Order Placed")}}>Place Order</button>
            </>
            : 
            <div className='w-full h-[100%] flex justify-center items-center'>
                <span className='text-green-400 font-bold text-[20px]'>Your Cart is Empty</span>
            </div>
            }            
        </div>        
    </div>
    </>
  )
}

export default Home
