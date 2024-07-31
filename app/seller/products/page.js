"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import fetchData from '@/utils/fetchData';
import ProductList from '@/components/ProductList';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sellers/myproducts`, 'GET', null, 
        {'Authorization': `Bearer ${localStorage.getItem('token')}` });
      setProducts(data);
    }
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    const data = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sellers/product/${id}`, 'DELETE', null, 
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
      <Suspense fallback={<p>Loading ...</p>}>
        <ProductList products={products} handleDelete={handleDelete} />
      </Suspense>
      <div className="mt-8">
        <Link href="/seller/add-product" className="bg-blue-500 text-white rounded px-4 py-2">
          Add New Product
        </Link>
      </div>
    </div>
  );
}
