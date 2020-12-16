import {
  ADD_TODO,
  DELETE_ALL_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
} from "../actionTypes";

let todoId = 0;

const initialState = {
  todos: [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false,
          },
        ],
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case DELETE_ALL_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id === action.payload.id),
      };
    }

    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (action.payload.id !== todo.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    default: {
      return state;
    }
  }
}
