import React from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";
import { PackageOpen, Plus, Trash } from "lucide-react";

const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);

  function handleFormSubmit(e) {
    e.preventDefault(); //for some browser on click of submit button the page refreshes, to avoid that call preventDefault method
    const toDoText = e.target["todo"].value;
    if (!toDoText) return;
    const newTodos = [
      ...todos,
      {
        text: toDoText,
        id: crypto.randomUUID(),
        completed: false,
      },
    ];
    setTodos(newTodos);
    e.target.reset();
  }

  function handleOnToDoToggleIsChecked(id, checked) {
    const newToDos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: checked };
      }
      return item;
    });
    setTodos(newToDos);
  }

  function handleOnToDoDelete(id) {
    const newToDos = todos.filter((item) => item.id !== id);
    setTodos(newToDos);
  }

  const emptyState = (
    <div className="mt-20 flex flex-col gap-8 items-center">
      <PackageOpen size={40} />
      <h1 className="font-bold text-secondary">No Todos yet</h1>
      <p className="text-secondary">Tap + to add your first task.</p>
    </div>
  );

  const completedToDos = todos.filter((item) => item.completed).length;

  function handleAllDeleteOperation() {
    setTodos([]);
  }

  function handleUpdateToDoText(id, toDoText) {
    if (!toDoText) return;
    const newToDos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, text: toDoText };
      }
      return item;
    });
    setTodos(newToDos);
  }

  function handleToDoMoveUp(index) {
    if (index == 0) return;
    const newToDos = [...todos];
    [newToDos[index], newToDos[index - 1]] = [
      newToDos[index - 1],
      newToDos[index],
    ]; //logic of swapping in java script
    setTodos(newToDos);
  }

  function handleToDoMoveDown(index) {
    if (index == todos.length - 1) return;
    const newToDos = [...todos];
    [newToDos[index], newToDos[index + 1]] = [
      newToDos[index + 1],
      newToDos[index],
    ]; //logic of swapping in java script
    setTodos(newToDos);
  }

  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
      <h1 className="text-center font-display text-6xl font-bold text-primary">
        Super To Do
      </h1>
      <form
        className=" bg-gray-800 px-6 py-4 rounded-lg flex justify-between gap-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="todo"
          autoComplete="off"
          required
          placeholder="Enter your todo here..."
          className="flex-1 font-body focus:outline-none"
        />
        <button className="p-3 bg-primary text-black rounded-lg cursor-pointer hover:bg-primary-hover">
          <Plus />
        </button>
      </form>

      <div className="flex justify-end">
        {todos.length > 0 && (
          <button
            className="px-3 py-2 ring-2 ring-red-400 rounded-lg flex items-center gap-2 hover:bg-red-500 hover:text-black"
            onClick={handleAllDeleteOperation}
          >
            <Trash />
            Delete All Tasks
          </button>
        )}
      </div>

      {todos.length > 0 && (
        <p className="text-secondary text-right">
          <span className="text-green-200">{completedToDos}</span> /{" "}
          {todos.length} Completed
        </p>
      )}

      {todos.length > 0 ? (
        <div className="space-y-4">
          {todos.map((item, index) => (
            <ToDoItem
              key={item.id}
              item={item}
              onToDoToggleIsChecked={handleOnToDoToggleIsChecked}
              onToDoDelete={handleOnToDoDelete}
              onToDoTextUpdate={handleUpdateToDoText}
              onMoveUp={handleToDoMoveUp}
              onMoveDown={handleToDoMoveDown}
              index={index}
              toDosCount={todos.length}
            />
          ))}
        </div>
      ) : (
        emptyState
      )}
    </div>
  );
};

export default ToDoListPage;
