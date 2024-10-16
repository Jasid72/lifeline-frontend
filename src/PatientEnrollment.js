import React, { useState } from "react";
import axios from "axios";

export default function PatientEnrollment(props) {
  const [isOpen, setIsOpen] = useState(false);
  var tests = [
    "ABPM (24hr Ambulatory Blood Pressure Monitoring)",
    "ECG (Holter, Extended Holter, MCT, Event Monitoring)",
    "Hemodynamics Monitoring",
    "RPM (Blood Pressure, Glucose, SPO2 Monitoring, Weight Management)",
    "Sleep Apnea Monitoring",
  ];
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    alternate_contact_name: "",
    alternate_contact_phone: "",
    alternate_contact_relationship: "",
    primary_insurance_name: "",
    primary_insurance_address: "",
    primary_insurance_referral: "",
    primary_insurance_id: "",
    primary_insurance_group: "",
    secondary_insurance_name: "",
    secondary_insurance_address: "",
    secondary_insurance_referral: "",
    secondary_insurance_id: "",
    secondary_insurance_group: "",
    referring_physician_name: "",
    referring_physician_phone: "",
    reading_physician_name: "",
    reading_physician_phone: "",
    selected_tests: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const dataToSend = {
      ...formData,
      selectedTests: selectedItems, // Add selected tests to form data
    };
  
    console.log(dataToSend);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/enrollments/`,
        dataToSend
      );
  
      if (response.status >= 200 && response.status < 300) {
        // Success message on successful response
        alert("Successfully updated!"); 
      } else {
        // Handling non-200 responses (e.g., 400, 500)
        alert("Error occurred during the update.");
      }
    } catch (error) {
      // Handling network errors or other exceptions
      console.error("Error during the POST request:", error);
      alert("Error occurred during the POST request.");
    }
  };
  

  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <div className="w-full bg-white p-10">
      <h2 className="text-3xl font-semibold mb-4">Patient Enrolment Form</h2>

      {selectedItems.length > 0 && (
        <div>
          <div className="flex-2 mb-4">
            <p className="bg-red-800 text-white py-2 px-4 w-1/4 text-center rounded-full">
              Tests
            </p>
          </div>
          <div className="flex-2 items-stretch mb-6 gap-4">
            {selectedItems.map((item, index) => (
              <p
                key={index}
                className="text-red-600 font-semibold flex items-stretch gap-2"
              >
                {item}
                <svg
                  className="h-5 w-5 text-red-800 mt-1 cursor-pointer"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  value={item}
                  onClick={(e) => {
                    setSelectedItems((prevSelectedItems) =>
                      prevSelectedItems.filter(
                        (selectedItem) => selectedItem !== item
                      )
                    );
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-stretch mb-6">
        {/* Left: ADD PERSONAL DETAILS Button */}
        <div className="flex-1 mr-4">
          <p className="bg-red-800 text-white py-2 px-4 w-3/4 text-center rounded-full">
            ADD PERSONAL DETAILS *
          </p>
        </div>

        {/* Right: ADD TESTS Button */}
        <div className="flex-1 text-right">
          <button
            className="bg-red-800 text-white py-2 px-4 rounded-full w-1/8"
            onClick={() => setIsOpen(true)}
          >
            ADD TESTS +
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-red-800 text-white text-[80] p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Select Tests</h2>
              <ul className="space-y-4">
                {tests.map((test, index) => (
                  <li className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      value={test}
                      checked={selectedItems.includes(test)}
                      onChange={(e) => {
                        e.target.checked
                          ? setSelectedItems((prevSelectedItems) => [
                              ...prevSelectedItems,
                              e.target.value,
                            ])
                          : setSelectedItems((prevSelectedItems) =>
                              prevSelectedItems.filter(
                                (item) => item !== e.target.value
                              )
                            );
                      }}
                      id={test.replace(/\s+/g, "").toLowerCase()} // Generates an ID based on the test name
                      className="mr-2"
                    />
                    <label htmlFor={test.replace(/\s+/g, "").toLowerCase()}>
                      {test}
                    </label>
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 text-white bg-red-500 p-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Form */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Personal Details */}
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleInputChange}
            name="first_name"
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Street Address"
            name="street_address"
            value={formData.street_address}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Zip Code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="date"
            placeholder="Date of Birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />

          {/* Alternate Contact */}
          <h3 className="col-span-2 text-red-800 font-semibold">
            Alternate Contact *
          </h3>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Name"
            name="alternate_contact_name"
            value={formData.alternate_contact_name}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Phone Number"
            name="alternate_contact_phone"
            value={formData.alternate_contact_phone}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Relationship"
            name="alternate_contact_relationship"
            value={formData.alternate_contact_relationship}
            onChange={handleInputChange}
            required
          />

          {/* Insurance Details */}
          <h3 className="col-span-2 text-red-800 font-semibold">
            Primary Insurance *
          </h3>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Insurance Name"
            name="primary_insurance_name"
            value={formData.primary_insurance_name}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Insurance Address"
            name="primary_insurance_address"
            value={formData.primary_insurance_address}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Referral"
            name="primary_insurance_referral"
            value={formData.primary_insurance_referral}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="ID"
            name="primary_insurance_id"
            value={formData.primary_insurance_id}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Group"
            name="primary_insurance_group"
            value={formData.primary_insurance_group}
            onChange={handleInputChange}
            required
          />

          <h3 className="col-span-2 text-red-800 font-semibold">
            Secondary Insurance
          </h3>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Insurance Name"
            name="secondary_insurance_name"
            value={formData.secondary_insurance_name}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Insurance Address"
            name="secondary_insurance_address"
            value={formData.secondary_insurance_address}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Referral"
            name="secondary_insurance_referral"
            value={formData.secondary_insurance_referral}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="ID"
            name="secondary_insurance_id"
            value={formData.secondary_insurance_id}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Group"
            name="secondary_insurance_group"
            value={formData.secondary_insurance_group}
            onChange={handleInputChange}
          />

          {/* Referring & Reading Physician */}
          <h3 className="col-span-2 text-red-800 font-semibold">
            Referring Physician
          </h3>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Name"
            name="referring_physician_name"
            value={formData.referring_physician_name}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Phone Number"
            name="referring_physician_phone"
            value={formData.referring_physician_phone}
            onChange={handleInputChange}
          />

          <h3 className="col-span-2 text-red-800 font-semibold">
            Reading Physician
          </h3>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Name"
            name="reading_physician_name"
            value={formData.reading_physician_name}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Phone Number"
            name="reading_physician_phone"
            value={formData.reading_physician_phone}
            onChange={handleInputChange}
          />
        </div>

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
  );
}
