import React, { useState } from "react";

interface CurrencyAndLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (language: string, currency: string) => void;
}

const CurrencyAndLanguageModal: React.FC<CurrencyAndLanguageModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Regional settings
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Your settings will apply to this browser only.
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English (United Kingdom)</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              {/* ...other languages */}
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD - $</option>
              <option value="EUR">EUR - €</option>
              <option value="GBP">GBP - £</option>
              {/* ...other currencies */}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={() => onSave(language, currency)}
            >
              Save
            </button>
            <button
              id="cancel-btn"
              className="mt-3 px-4 py-2 bg-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyAndLanguageModal;
