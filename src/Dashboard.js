import React, { useState } from "react";
import PatientEnrollment from "./PatientEnrollment";
import AccountCreation from "./AccountCreation";

const Dashboard = () => {
  const [formType, setFormType] = useState("enrollment"); // To toggle between forms

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-red-800 text-white w-1/4 p-6">
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Samantha"
            className="rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-bold">Samantha</h3>
          <p>samantha@email.com</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-4">
            <button>Lifeline</button>
          </p>
          {formType === "enrollment" ? (
            <p className="mb-2 font-bold">
              <button onClick={() => setFormType("enrollment")}>
                1.1 Patient Enrollment
              </button>
            </p>
          ) : (
            <p className="mb-2">
              <button onClick={() => setFormType("enrollment")}>
                1.1 Patient Enrollment
              </button>
            </p>
          )}
          {formType === "account" ?
          (<p className="mb-2 font-bold">
            <button onClick={() => setFormType("account")}>
              1.2 Account Creation
            </button>
          </p>)
          :
          (
            <p className="mb-2">
            <button onClick={() => setFormType("account")}>
              1.2 Account Creation
            </button>
          </p>
          )}
          <div className="mt-4">
            <p>CRM - A</p>
            <p>CRM - B</p>
            <p>CRM - C</p>
          </div>
        </div>
      </div>
      <div class="w-3/4 p-6">
        {formType === "enrollment" ? (
          <PatientEnrollment />
        ) : (
          <AccountCreation />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
