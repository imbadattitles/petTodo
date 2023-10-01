import { Idispatch } from "../Redux";
import {
  ITodo,
  deleteTodoAction,
  saveDeleteTodoAction,
} from "../Redux/todoReducer";

export const deleteTodo = (dispatch: Idispatch, id: string, todo: ITodo) => {
  dispatch(deleteTodoAction(id));
  dispatch(saveDeleteTodoAction(todo));
};
