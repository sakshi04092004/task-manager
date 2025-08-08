/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const Card = ({ title, description, onUpdate, onDelete, dragHandleProps, draggableProps, refProp }) => {
  const [desc, setDesc] = useState(description);
  const [isEdited, setIsEdited] = useState(false);

  // Sync description prop with local state
  useEffect(() => {
    setDesc(description);
    setIsEdited(false); // reset editing state if description changes externally
  }, [description]);

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    setIsEdited(true);
  };

  // Save just the description
  const saveDesc = () => {
    if (isEdited) {
      onUpdate({ description: desc });
      setIsEdited(false);
    }
  };

  // Full update: e.g., title + description
  const handleFullUpdate = () => {
  onUpdate({
    title: "Updated Title",  // Update the title on backend
    description: desc
  });
  alert("Updated successfully");  // Show popup to user
  setIsEdited(false);
};


  return (
    <div className="card" {...draggableProps} ref={refProp}>
      <div className="card-header" {...dragHandleProps}>
        <h3>{title}</h3>
      </div>

      <textarea
        value={desc}
        onChange={handleDescChange}
        placeholder="Enter description..."
        style={{
          width: "100%",
          border: "1px solid #ccc",
          padding: "0.5rem",
          borderRadius: "6px",
          minHeight: "60px",
          margin: "0.75rem"
        }}
      />

      {/* Save button only when description is edited */}
      {isEdited && (
        <div style={{ padding: "0 0.75rem 0.75rem" }}>
          <button
            onClick={saveDesc}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            💾 Save
          </button>
        </div>
      )}

      <div className="card-actions">
        <button
          onClick={handleFullUpdate}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ✏️ Update
        </button>
        <button onClick={onDelete}>🗑 Delete</button>
      </div>
    </div>
  );
};

export default Card;
