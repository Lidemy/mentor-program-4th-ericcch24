import './App.css';
import React from 'react';
import TodoItem from './TodoItem';
import useTodo from './useTodo';

function App() {
  const {
    value,
    todos,
    filter,
    handleInputChange,
    handleButtonClick,
    handleDeleteTodo,
    handleToggleIsDone,
    handleDeleteAll,
    showAll,
    showDone,
    showUndone,
  } = useTodo();

  const renderTodoItem = (todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      handleDeleteTodo={handleDeleteTodo}
      handleToggleIsDone={handleToggleIsDone}
    />
  );

  const checkFilter = (todo) => {
    if (filter === '') return todo;
    if (filter === 'done') return todo.isDone === true;
    if (filter === 'undone') return todo.isDone === false;
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <input
        className='input-todo'
        type='text'
        placeholder='type todo'
        value={value}
        onChange={handleInputChange}
      />
      <button className='add-button' onClick={handleButtonClick}>
        新增
      </button>
      <div className='filter'>
        <button onClick={showAll}>全部</button>
        <button onClick={showDone}>已完成</button>
        <button onClick={showUndone}>未完成</button>
        <button onClick={handleDeleteAll}>清空</button>
      </div>
      {todos
        .filter((todo) => checkFilter(todo))
        .map((todo) => renderTodoItem(todo))}
    </div>
  );
}

export default App;
