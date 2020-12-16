import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteAllTodo,
  filterAll,
  filterDone,
  filterUndone,
} from "../redux/actions";

const Filter = styled.div`
  margin: 10px;
`;

const Button = styled.button`
  margin: 0px 5px;
  padding: 5px 10px;
  background: #ccc;
  border: 0 none;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;

  &:hover {
    filter: brightness(70%);
  }
  ${(props) =>
    props.active &&
    `
    filter: brightness(70%);
  `}
`;

const filters = [
  { name: "全部", action: filterAll() },
  { name: "已完成", action: filterDone() },
  { name: "未完成", action: filterUndone() },
];

const FilterButton = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(filters[0].name);

  return (
    <Filter>
      {filters.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => {
            dispatch(filter.action);
            setActive(filter.name);
          }}
          active={active === filter.name}
        >
          {filter.name}
        </Button>
      ))}

      <Button
        onClick={() => {
          dispatch(deleteAllTodo());
          dispatch(filterAll());
          setActive(filters[0].name);
        }}
      >
        清空
      </Button>
    </Filter>
  );
};

export default FilterButton;
