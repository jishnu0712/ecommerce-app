"use client";
import fetchData from '@/utils/fetchData';
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    async function getCartItems() {
      let res = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyers/cart`, 'GET', null, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
      
      if (!res) {
        res = [];
      }
      
      let newRes = res.map(item => ({...item, quantity: 1}))
      setCart(newRes);
    }
    getCartItems();
  }, [])

  const handleRemoveFromCart = async (productId) => {
    const res = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyers/cart/${productId}`, 'DELETE', null, 
      {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    setCart(cart.filter(item => item.id !== productId))
  }

  const handleQuantityChange = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={nanoid()} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p>{item.category}</p>
                    <p>₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="w-16 border rounded p-2"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 text-white rounded px-4 py-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex justify-center mt-24'>
          <button className='bg-orange-200 text-white rounded px-4 py-2' disabled>Order now</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}
