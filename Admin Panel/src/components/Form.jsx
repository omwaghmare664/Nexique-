import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });
  const [message, setMessage] = useState(""); // Success/Error message display
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("productImage", image);
  
    setLoading(true); // Set loading to true
  
    try {
      const response = await axios.post("http://localhost:5500/product/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.ok){
        setMessage(response.data.message || "Product added successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
      setFormData({ name: "", description: "", category: "", price: "" });
      setImage(null);
      setPreview(null);
    } catch (error) {
      setMessage("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="image" >Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="productImage"
          className="block w-full border rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-md" />
          </div>
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows="3"
          required
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full border rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        >
          <option value="">Select a category</option>
          <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Grocery">Grocery</option>
            <option value="Cooking">Cooking</option>
            <option value="Kids">Kids</option>
            <option value="Mobiles/Laptops">Mobiles/Laptops</option>
        </select>
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl text-gray-700">₹</span>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="block w-full border rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        required
      />
      </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 ${loading ? 'cursor-not-allowed opacity-[0.7]' : ''}`}
      >
        Add Product
      </button>

      {/* Success/Error Message */}
      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
      )}
    </form>
  );
}

export default Form;
