import React from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";

const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);

  function handleFormSubmit(e) {
    e.preventDefault(); //for some browser on click of submit button the page refreshes, to avoid that call preventDefault method
    const toDoText = e.target["todo"].value;
    console.log(toDoText);
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

  const emptyState = <h3>Nothing is here, Add a Todo</h3>;
  const completedToDos = todos.filter((item) => item.completed).length;

  function handleAllDeleteOperation() {
    setTodos([]);
  }

  function handleUpdateToDoText(id, toDoText) {
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
    <div>
      <h1>Super To Do</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="todo" placeholder="Enter your todo here..." />
        <button>Submit</button>
      </form>

      {todos.length > 0 && (
        <button onClick={handleAllDeleteOperation}>Delete All Tasks</button>
      )}

      {todos.length > 0 && (
        <p>
          {completedToDos} / {todos.length} Completed
        </p>
      )}

      {todos.length > 0 ? (
        <div>
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
