import React, { useState } from 'react';
import { assets } from '../assets/assets';

// Reusable input field
const InputField = ({ type = "text", placeholder, name, handleChange, address }) => (
  <input
    type={type}
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Address submitted:', address);
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-4 mt-6 text-sm">
            <InputField handleChange={handleChange} address={address} name="firstName" placeholder="First Name" />
            <InputField handleChange={handleChange} address={address} name="lastName" placeholder="Last Name" />
            <InputField handleChange={handleChange} address={address} name="street" placeholder="Street Address" />
            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email" />
            <InputField handleChange={handleChange} address={address} name="city" placeholder="City" />
            <InputField handleChange={handleChange} address={address} name="state" placeholder="State" />
            <InputField handleChange={handleChange} address={address} name="zipCode" placeholder="Zip Code" />
            <InputField handleChange={handleChange} address={address} name="country" placeholder="Country" />
            <InputField handleChange={handleChange} address={address} name="phone" placeholder="Phone Number" type="tel" />

            <button
              type="submit"
              className="w-full mt-4 btn-primary py-2 rounded"
            >
              Save Address
            </button>
          </form>
        </div>

        <div>
          <img className="md:mr-16 mb-16 md:mt-0" src={assets.add_address_iamge} alt="Add Address" />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
