import { Idispatch } from "../Redux";
import { ITodo, changeTodoAction } from "../Redux/todoReducer";

export const changeStatusTodo = (
  dispatch: Idispatch,
  id: string,
  todo: ITodo
) => {
  if (todo.status) {
    const newTodo = { ...todo, status: false };
    dispatch(changeTodoAction({ id, newTodo }));
  } else {
    const newTodo = { ...todo, status: true };
    dispatch(changeTodoAction({ id, newTodo }));
  }
};
