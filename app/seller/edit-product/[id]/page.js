"use client";

import fetchData from "@/utils/fetchData";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
  });

  useEffect(() => {
    async function getData() {
      if (id) {
        const data = await fetchData(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/buyers/product/${id}`
        );
        setForm(data[0] ?? {});
      }
    }

    getData();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = fetchData(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sellers/product/${id}`,
      "PUT", form,
      { Authorization: `Bearer ${localStorage.getItem("token")}` }
    );

    if (!res) {
      alert("Failed to edit product");
      return;
    }
    router.push(`/seller/products`);
  };

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
          name="quantity"
          placeholder="quantity"
          value={form.quantity}
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
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
}
