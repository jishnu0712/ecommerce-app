"use client";
import { useState } from 'react'

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add product submit logic here
    await fetch('http://localhost:8080/api/sellers/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    })
    console.log('Product added:', form)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
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
          Add Product
        </button>
      </form>
    </div>
  )
}
