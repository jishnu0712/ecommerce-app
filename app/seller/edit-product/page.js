"use client";

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function EditProduct() {
  const router = useRouter()
  const { id } = router.query

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: '',
  })

  useEffect(() => {
    if (id) {
      // Fetch product data by id and setForm with fetched data
      console.log('Fetching product data for id:', id)
    }
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Edit product submit logic here
    console.log('Product edited:', form)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Edit Product
        </button>
      </form>
    </div>
  )
}
