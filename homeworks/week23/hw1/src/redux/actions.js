import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_ALL_TODO,
  TOGGLE_TODO,
  FILTER_ALL,
  FILTER_DONE,
  FILTER_UNDONE,
} from "./actionTypes";

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function deleteAllTodo(id) {
  return {
    type: DELETE_ALL_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function filterAll() {
  return {
    type: FILTER_ALL,
    payload: {
      filter: "",
    },
  };
}

export function filterDone() {
  return {
    type: FILTER_DONE,
    payload: {
      filter: "done",
    },
  };
}

export function filterUndone() {
  return {
    type: FILTER_UNDONE,
    payload: {
      filter: "undone",
    },
  };
}
