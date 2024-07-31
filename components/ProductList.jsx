import Link from 'next/link';


const ProductList = ({ products, handleDelete }) => (
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
);

export default ProductList;
