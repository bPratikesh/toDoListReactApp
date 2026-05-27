import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  SquarePen,
  Trash,
  Check,
  X,
} from "lucide-react";
import Checkbox from "./Checkbox";

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
    <div className="flex justify-between items-center bg-gray-800 px-4 py-2 min-h-20 rounded-lg group">
      <form
        className="flex-1 flex item-center gap-4 px-2"
        onSubmit={handleFormEdittedSubmitted}
      >
        <input
          className="flex-1 border-2 border-secondary px-4 py-2 rounded-lg font-body"
          type="text"
          name="todo"
          defaultValue={item.text}
        />
        <button className="bg-hover cursor-pointer">
          <Check />
        </button>
      </form>
      <button
        className="text-red-400 cursor-pointer"
        onClick={() => setshowEditToDo(false)}
      >
        <X />
      </button>
    </div>
  );

  const toDoItemDIV = (
    <div className="flex gap-4 justify-between items-center hover:bg-gray-800 rounded-lg px-4 py-2 group">
      <div className="flex flex-col gap-1 text-secondary">
        <button
          className="hover:bg-gray-700 rounded-md p-1 cursor-pointer"
          disabled={index == 0}
          onClick={() => onMoveUp(index)}
        >
          <ChevronUp />
        </button>
        <button
          className="hover:bg-gray-700 rounded-md p-1 cursor-pointer"
          disabled={index == toDosCount - 1}
          onClick={() => onMoveDown(index)}
        >
          <ChevronDown />
        </button>
      </div>

      <div className="flex-1 flex gap-4 items-start min-w-0">
        <Checkbox
          id={item.id}
          checked={item.completed}
          onChange={(e) => onToDoToggleIsChecked(item.id, e.target.checked)}
          label={item.text}
        />
      </div>

      <div className="hidden group-hover:flex gap-4">
        <button className="cursor-pointer" onClick={() => setshowEditToDo(true)}>
          <SquarePen />
        </button>
        <button className="text-red-400 cursor-pointer" onClick={() => onToDoDelete(item.id)}>
          <Trash />
        </button>
      </div>
    </div>
  );

  return (
    <div className="border-t border-secondary pt-3">
      {showEditToDo ? toDoEditForm : toDoItemDIV}
    </div>
  );
};

export default ToDoItem;
