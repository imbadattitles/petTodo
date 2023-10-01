import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStep {
  done: boolean;
  value: string;
  index: number;
}

export interface ITodo {
  title: string;
  description: string;
  id: string;
  steps: IStep[];
  stepsDone: string;
  startDate: string;
  endDate: string;
  status: boolean;
}

interface IinitialState {
  todos: ITodo[];
  deletedTodos: ITodo[];
}

const initialState: IinitialState = {
  todos: [],
  deletedTodos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosAction(state) {
      try {
        const todos =
          localStorage.getItem("todos") ||
          '[{"title":"Делай заметки","description":"и отслеживай выполнение своих задач","id":"2023.5.4 17:14:29","steps":[{"done":true,"index":0,"value":"Добавь запись нажав кнопку сверху"},{"done":true,"index":1,"value":"Можешь добавлять неограниченное количество подзадач и отслеживать их выполнение"},{"done":false,"index":2,"value":"Все записи храняться в Вашем браузере, никто не имеет доступ к ним"}],"stepsDone":67,"startDate":"2023.5.4","endDate":null,"status":true}]';
        const json: ITodo[] = JSON.parse(todos);
        state.todos = json;
      } catch (e) {
        console.log(e);
      }
    },
    addTodoAction(state, action: PayloadAction<ITodo>) {
      try {
        const todos = localStorage.getItem("todos") || "[]";
        const json = JSON.parse(todos);
        json.unshift(action.payload);
        state.todos = json;
        localStorage.setItem("todos", JSON.stringify(json));
      } catch (e) {
        console.log(e);
      }
    },
    deleteTodoAction(state, action: PayloadAction<string>) {
      try {
        const todos = localStorage.getItem("todos") || "[]";
        const json: ITodo[] = JSON.parse(todos);
        const newTodos = json.filter((todo) => todo.id !== action.payload);
        state.todos = newTodos;
        localStorage.setItem("todos", JSON.stringify(newTodos));
      } catch (e) {
        console.log(e);
      }
    },
    saveDeleteTodoAction(state, action: PayloadAction<ITodo>) {
      try {
        const deletedTodos = localStorage.getItem("deletedTodos") || "[]";
        const deletedJson: ITodo[] = JSON.parse(deletedTodos);
        deletedJson.push(action.payload);
        state.deletedTodos = deletedJson;
        localStorage.setItem("deletedTodos", JSON.stringify(deletedJson));
      } catch (e) {
        console.log(e);
      }
    },
    changeTodoAction(
      state,
      action: PayloadAction<{ id: string; newTodo: ITodo }>
    ) {
      try {
        const todos = localStorage.getItem("todos") || "[]";
        const json: ITodo[] = JSON.parse(todos);
        const newTodos = json.map((todo) => {
          if (todo.id === action.payload.id) {
            todo = action.payload.newTodo;
          }
          return todo;
        });
        state.todos = newTodos;
        localStorage.setItem("todos", JSON.stringify(newTodos));
      } catch (e) {
        console.log(e);
      }
    },
    fetchDeletedTodoAction(state) {
      try {
        const deletedTodos = localStorage.getItem("deletedTodos") || "[]";
        const json: ITodo[] = JSON.parse(deletedTodos);
        state.deletedTodos = json;
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const {
  fetchTodosAction,
  addTodoAction,
  deleteTodoAction,
  saveDeleteTodoAction,
  changeTodoAction,
  fetchDeletedTodoAction,
} = todoSlice.actions;

export default todoSlice.reducer;
