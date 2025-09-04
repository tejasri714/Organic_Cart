import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const productData = {
        name,
        description: description.split('\n'),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      files.forEach((file) => {
        formData.append('images', file);
      });

      const { data } = await axios.post('/api/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Network Error: Check if your server is running and the URL is correct');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="p-6 space-y-5 max-w-lg mx-auto bg-white rounded shadow-md"
    >
      <div>
        <label className="block font-medium text-gray-600 mb-1">Product Images</label>
        <div className="flex gap-3 mt-2">
          {Array(4).fill('').map((_, index) => (
            <label key={index}>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }}
              />
              <img
                src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                className="w-24 h-24 border rounded object-cover cursor-pointer"
                alt="upload"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-600 mb-1">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-600 mb-1">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-600 mb-1">Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c, i) => (
            <option key={i} value={c.path}>{c.name || c.path}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-600 mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-600 mb-1">Offer Price</label>
        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Offer Price"
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-2 rounded text-center"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
