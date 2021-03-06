import styled from 'styled-components';
import React from 'react';
import './styles.css';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from './constants/style';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  & + & {
    margin-top: 12px;
  }
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_300};
  font-size: 15px;

  ${(props) =>
    props.size === 'XL' &&
    `
    font-size: 20px;  
  `}
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 5px 10px;
  background: #ccc;
  border: 0 none;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 12px;
  }

  &:hover {
    filter: brightness(90%);
  }

  & + & {
    margin-left: 6px;
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

const TodoItem = ({ todo, size, handleDeleteTodo, handleToggleIsDone }) => {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleDoneClick = () => {
    handleToggleIsDone(todo.id);
  };

  return (
    <TodoItemWrapper data-id={todo.id}>
      <TodoContent $isDone={todo.isDone} size={size}>
        {todo.content}
      </TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleDoneClick}>
          {todo.isDone ? '未完成' : '已完成'}
        </Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
};

export default TodoItem;
