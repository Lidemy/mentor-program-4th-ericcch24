import { useState, useRef } from 'react';

const useTodo = () => {
  const id = useRef(1);
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleButtonClick = () => {
    if (value !== '') {
      setTodos([
        {
          id: id.current,
          content: value,
          isDone: false,
        },
        ...todos,
      ]);
      setValue('');
      id.current += 1;
    }
  };

  const handleDeleteTodo = (id) => {
    // eslint-disable-next-line arrow-parens
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (id !== todo.id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteAll = () => {
    setTodos(todos.filter((todo) => todo.id === id));
  };

  const showAll = () => {
    setFilter('');
  };

  const showDone = () => {
    setFilter('done');
  };

  const showUndone = () => {
    setFilter('undone');
  };

  return {
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
  };
};

export default useTodo;
