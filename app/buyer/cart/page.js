"use client";

import fetchData from '@/utils/fetchData';
import { nanoid } from 'nanoid'

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';

export default function Cart() {

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const cart = useSelector(state => state.cart);

  const handleRemoveFromCart = async (productId) => {
    const res = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyers/cart/${productId}`, 'DELETE', null, 
      {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    setCart(cartItems.filter(item => item.id !== productId));

    dispatch(cartActions.removeFromCart(productId));
  }

  const increase = (product) => {
    dispatch(cartActions.addToCart({...product}));
  }

  const decrease = (product) => {
    dispatch(cartActions.removeFromCart(product));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={nanoid()} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p>{item.category}</p>
                    <p>₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => increase(item)}>+</button>
                    {cartItems.find(p => p.id === item.id)?.quantity}
                    <button onClick={() => decrease(item.id)}>-</button>
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
            Total: ₹{cart.total}
          <button className='bg-orange-200 text-white rounded px-4 py-2' disabled>Order now</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}
