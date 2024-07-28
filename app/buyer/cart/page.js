"use client";
import { useState, useEffect } from 'react'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Fetch cart items
    console.log('Fetching cart items')
    setCart([
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, quantity: 1 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, quantity: 2 },
    ])
  }, [])

  const handleRemoveFromCart = (productId) => {
    // Remove product from cart logic
    console.log('Removing product from cart:', productId)
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
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
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
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}
