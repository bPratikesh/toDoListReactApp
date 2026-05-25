import React from "react";

const ToDoItem = ({ item, onToDoToggleIsChecked, onToDoDelete }) => {
  return (
    <div>
      <input
        id={item.id}
        type="checkbox"
        onChange={(e) => onToDoToggleIsChecked(item.id, e.target.checked)}
      />
      <label
        style={{ textDecoration: item.completed ? "line-through" : "none" }}
        htmlFor={item.id}
      >
        {item.text}
        <button onClick={() => onToDoDelete(item.id)}>Delete</button>
      </label>
    </div>
  );
};

export default ToDoItem;
