"use client";

import fetchData from '@/utils/fetchData';
import { useState, useEffect } from 'react'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function getProducts() {
        const res = await fetchData('http://localhost:8080/api/buyers/allproducts');
        setProducts(res);
    }
    getProducts();
  }, [])


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddToCart = async (productId) => {
    const res = fetchData('http://localhost:8080/api/buyers/cart', 'POST', {productId}, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    
    if (!res) {
      alert('Failed to add product to cart');
      return;
    }
    alert('Product added to cart');
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full border rounded p-2 mb-4"
      />
      <ul className="space-y-4">
        {filteredProducts.map(product => (
          <li key={product.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>{product.category}</p>
                <p>₹{product.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
