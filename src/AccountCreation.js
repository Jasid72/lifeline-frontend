import React, { useState } from "react";
import axios from "axios";

const AccountCreation = () => {
  // State to manage all form inputs
  const [formData, setFormData] = useState({
    license_number: "",
    specialty: "",
    years_of_experience: "",
    hospital_name: "",
    work_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    username: "",
    password: "",
    confirm_password: "",
    primary_phone: "",
    secondary_phone: "",
    work_email: "",
    preferred_contact_method: "",
    accept_terms: false,
    agree_to_privacy: false,
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/createAccount/`,
        formData
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Submission is successfully done!");
        console.log("Form data saved:", response.data);
        setFormData({
          license_number: '',
          specialty: '',
          years_of_experience: '',
          hospital_name: '',
          work_address: '',
          city: '',
          state: '',
          zip_code: '',
          country: '',
          username: '',
          password: '',
          confirm_password: '',
          primary_phone: '',
          secondary_phone: '',
          work_email: '',
          preferred_contact_method: '',  // Reset the dropdown or any other field
          accept_terms: false,
          agree_to_privacy: false
        });
        // You can add success message or redirection here
      } else {
        alert("Something went wrong. Please try again.");
        console.error("Error saving form data:", response);
      }
    } catch (error) {
      alert("Error saving form data. Please check your input or try again.");
      console.error("Error saving form data:", error);
      // Handle the error
    }

    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex h-screen">
      {/* Main form section */}
      <div className="w-3/4 bg-white p-10">
        <h2 className="text-3xl font-semibold mb-6">
          Professional Information (for Doctors)
        </h2>

        <div className="flex items-center justify-between mb-6">
          <button className="bg-red-800 text-white py-2 px-4 rounded-full">
            ADD PERSONAL DETAILS *
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Professional Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              className="border p-2 rounded"
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleInputChange}
              placeholder="Medical License Number"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              placeholder="Specialty"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="years_of_experience"
              value={formData.years_of_experience}
              onChange={handleInputChange}
              placeholder="Years of Experience"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleInputChange}
              placeholder="Hospital/Clinic Name"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="work_address"
              value={formData.work_address}
              onChange={handleInputChange}
              placeholder="Work Address"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleInputChange}
              placeholder="Zip Code"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              required
            />
          </div>

          {/* Login Credentials */}
          <h3 className="text-red-800 font-semibold mb-2">
            Login Credentials:
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              className="border p-2 rounded"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            <input
              className="border p-2 rounded"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <input
              className="border p-2 rounded"
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Contact Information */}
          <h3 className="text-red-800 font-semibold mb-2">
            Contact Information:
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              className="border p-2 rounded"
              type="text"
              name="primary_phone"
              value={formData.primary_phone}
              onChange={handleInputChange}
              placeholder="Primary Phone Number"
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="secondary_phone"
              value={formData.secondary_phone}
              onChange={handleInputChange}
              placeholder="Secondary Phone Number (Optional)"
            />
            <input
              className="border p-2 rounded"
              type="email"
              name="work_email"
              value={formData.work_email}
              onChange={handleInputChange}
              placeholder="Work Email Address"
              required
            />
            <select
              className="border p-2 rounded"
              name="preferred_contact_method"
              value={formData.preferred_contact_method}
              onChange={handleInputChange}
              required
            >
              <option selected disabled value="">Select preferred contact method *</option>

              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {/* Agreements */}
          <h3 className="text-red-800 font-semibold mb-2">
            Agreements and Compliance:
          </h3>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="accept_terms"
                checked={formData.accept_terms}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label>Accept Terms and Conditions</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree_to_privacy"
                checked={formData.agree_to_privacy}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label>Agree to Privacy Policy</label>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-red-800 text-white py-2 px-6 rounded-full"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-6 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreation;
