import "./App.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./components/TodoItem";
import FilterButton from "./components/FilterButton";
import { selectTodos, selectFilters } from "./redux/selectors";
import { addTodo } from "./redux/actions";

function App() {
  const [value, setValue] = useState("");
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();

  const checkFilter = (todo) => {
    if (filter === "") return todo;
    if (filter === "done") return todo.isDone === true;
    if (filter === "undone") return todo.isDone === false;
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        className="input-todo"
        type="text"
        placeholder="type todo"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="add-button"
        onClick={() => {
          if (value !== "") {
            dispatch(addTodo(value));
            setValue("");
          }
        }}
      >
        新增
      </button>
      <FilterButton />
      {todos
        .filter((todo) => checkFilter(todo))
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </div>
  );
}

export default App;
