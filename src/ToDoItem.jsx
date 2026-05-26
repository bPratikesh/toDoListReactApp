import React, { useState } from "react";

const ToDoItem = ({
  item,
  onToDoToggleIsChecked,
  onToDoDelete,
  onToDoTextUpdate,
  onMoveUp,
  onMoveDown,
  index,
  toDosCount,
}) => {
  const [showEditToDo, setshowEditToDo] = useState(false);
  function handleEditToDo(e) {}

  function handleFormEdittedSubmitted(e) {
    e.preventDefault();
    const toDoText = e.target["todo"].value;
    onToDoTextUpdate(item.id, toDoText);
    setshowEditToDo(false);
  }
  const toDoEditForm = (
    <div>
      <form onSubmit={handleFormEdittedSubmitted}>
        <input type="text" name="todo" defaultValue={item.text} />
        <button>Update</button>
      </form>
      <button onClick={() => setshowEditToDo(false)}>Cancel</button>
    </div>
  );

  const toDoItemDIV = (
    <div>
      <button disabled={index == 0} onClick={() => onMoveUp(index)}>
        ▲
      </button>
      <button
        disabled={index == toDosCount - 1}
        onClick={() => onMoveDown(index)}
      >
        ▼
      </button>
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
      </label>
      <button onClick={() => setshowEditToDo(true)}>Edit</button>
      <button onClick={() => onToDoDelete(item.id)}>Delete</button>
    </div>
  );

  return <div>{showEditToDo ? toDoEditForm : toDoItemDIV}</div>;
};

export default ToDoItem;
