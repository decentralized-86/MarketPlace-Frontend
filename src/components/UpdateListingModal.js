import React from 'react';

const UpdateListingModal = ({ isOpen, onRequestClose, newListingPrice, setNewListingPrice, onConfirmUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Listing Price</h2>
        <input
          type="text"
          placeholder="Enter new listing price"
          className="border border-gray-400 p-2 rounded w-full mb-4"
          value={newListingPrice}
          onChange={(e) => setNewListingPrice(e.target.value)}
        />
        <div className="flex items-center justify-end">
          <button onClick={onRequestClose} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={onConfirmUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateListingModal;
