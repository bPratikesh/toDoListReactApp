import React, { useReducer } from "react";
import ToDoItem from "./ToDoItem";
import { PackageOpen, Plus, Trash } from "lucide-react";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_ALL = "DELETE_ALL";
const MOVE_UP = "MOVE_UP";
const MOVE_DOWN = "MOVE_DOWN";

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
      };

      return [...state, newTodo];
    }

    case TOGGLE_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.checked }
          : todo,
      );
    }

    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload);
    }

    case UPDATE_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );
    }

    case DELETE_ALL: {
      return [];
    }

    case MOVE_UP: {
      const index = action.payload;

      if (index === 0) return state;

      const newState = [...state];

      [newState[index], newState[index - 1]] = [
        newState[index - 1],
        newState[index],
      ];

      return newState;
    }

    case MOVE_DOWN: {
      const index = action.payload;

      if (index === state.length - 1) return state;

      const newState = [...state];

      [newState[index], newState[index + 1]] = [
        newState[index + 1],
        newState[index],
      ];

      return newState;
    }

    default:
      return state;
  }
}

const ToDoListPage = () => {
  const [todos, dispatch] = useReducer(reducer, []);

  function handleFormSubmit(e) {
    e.preventDefault();

    const toDoText = e.target.todo.value.trim();

    if (!toDoText) return;

    dispatch({
      type: ADD_TODO,
      payload: toDoText,
    });

    e.target.reset();
  }

  function handleOnToDoToggleIsChecked(id, checked) {
    dispatch({
      type: TOGGLE_TODO,
      payload: {
        id,
        checked,
      },
    });
  }

  function handleOnToDoDelete(id) {
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  }

  function handleUpdateToDoText(id, text) {
    if (!text) return;

    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        text,
      },
    });
  }

  function handleAllDeleteOperation() {
    dispatch({
      type: DELETE_ALL,
    });
  }

  function handleToDoMoveUp(index) {
    dispatch({
      type: MOVE_UP,
      payload: index,
    });
  }

  function handleToDoMoveDown(index) {
    dispatch({
      type: MOVE_DOWN,
      payload: index,
    });
  }

  const completedToDos = todos.filter((todo) => todo.completed).length;

  const emptyState = (
    <div className="mt-20 flex flex-col gap-8 items-center">
      <PackageOpen size={40} />
      <h1 className="font-bold text-secondary">No Todos yet</h1>
      <p className="text-secondary">Tap + to add your first task.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
      <h1 className="text-center font-display text-6xl font-bold text-primary">
        Super To Do
      </h1>

      <form
        className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between gap-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="todo"
          autoComplete="off"
          placeholder="Enter your todo here..."
          className="flex-1 font-body focus:outline-none"
          required
        />

        <button className="p-3 bg-primary text-black rounded-lg hover:bg-primary-hover">
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
              index={index}
              toDosCount={todos.length}
              onToDoToggleIsChecked={handleOnToDoToggleIsChecked}
              onToDoDelete={handleOnToDoDelete}
              onToDoTextUpdate={handleUpdateToDoText}
              onMoveUp={handleToDoMoveUp}
              onMoveDown={handleToDoMoveDown}
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
