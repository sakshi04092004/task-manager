import React, { useState } from "react";

const Card = ({ title, description, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDesc, setNewDesc] = useState(description);

  const handleSave = () => {
    onUpdate(newDesc);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
      {/* Title */}
      <h4 className="font-semibold text-gray-800">{title}</h4>

      {/* Description */}
      {isEditing ? (
        <textarea
          className="w-full mt-2 p-2 border rounded-md text-sm"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
      ) : (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md"
          >
            Edit
          </button>
        )}

        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-500 text-white text-xs rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
