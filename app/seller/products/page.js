"use client";


import { useState, useEffect } from 'react'
import Link from 'next/link'
import fetchData from '@/utils/fetchData';
import { useRouter } from 'next/navigation';

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const data = await fetchData('http://localhost:8080/api/buyers/allproducts');
      setProducts(data);
    }
    getProducts();
  }, [])

  const handleDelete = async (id) => {
    const data = await fetchData(`http://localhost:8080/api/sellers/product/${id}`, 'DELETE', null, 
      {'Authorization': `Bearer ${localStorage.getItem('token')}`});

    if (!data) {
      alert('Failed to delete product');
      return;
    }
    setProducts(products.filter(product => product.id !== id));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>{product.category}</p>
                <p>₹{product.price}</p>
              </div>
              <div>
                <Link href={`/seller/edit-product/${product.id}`} className="bg-yellow-500 text-white rounded px-4 py-2 mr-2">
                    Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white rounded px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/seller/add-product" className="bg-blue-500 text-white rounded px-4 py-2">
            Add New Product
        </Link>
      </div>
    </div>
  )
}
