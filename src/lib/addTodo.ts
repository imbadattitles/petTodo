import { Dispatch, SetStateAction } from "react";
import { IStep, ITodo, addTodoAction } from "../Redux/todoReducer";
import { stepsDoneLength } from "./stepsDoneLength";
import { Idispatch } from "../Redux";

export const addTodo = (
  valueTitle: string,
  initialState: {
    startDate: Date;
    endDate: null;
    focusedInput: null;
  },
  dispatch: Idispatch,
  dateState: any,
  valueDesc: string,
  steps: IStep[],
  setSteps: Dispatch<SetStateAction<IStep[]>>,
  setValueDesc: Dispatch<SetStateAction<string>>,
  setValueTitle: Dispatch<SetStateAction<string>>,
  setDateVisible: Dispatch<SetStateAction<boolean>>,
  dateDispatch: Dispatch<
    SetStateAction<{ type: "dateReborn"; payload: typeof initialState }>
  >,
  setDescVisible: Dispatch<SetStateAction<boolean>>,
  setAddTodoVisible: Dispatch<SetStateAction<boolean>>
): void => {
  if (valueTitle) {
    const data = new Date();
    const startDate =
      dateState.startDate.getFullYear() +
      "." +
      dateState.startDate.getMonth() +
      "." +
      dateState.startDate.getDate();
    let endDate = dateState.endDate;
    if (dateState.endDate) {
      endDate =
        dateState.endDate.getFullYear() +
        "." +
        dateState.endDate.getMonth() +
        "." +
        dateState.endDate.getDate();
    }
    const id =
      data.getFullYear() +
      "." +
      data.getMonth() +
      "." +
      data.getDate() +
      " " +
      data.getHours() +
      ":" +
      data.getMinutes() +
      ":" +
      data.getSeconds();
    const todo: ITodo = {
      title: valueTitle,
      description: valueDesc,
      id: id,
      steps: steps,
      stepsDone: stepsDoneLength(steps),
      startDate: startDate,
      endDate: endDate,
      status: true,
    };
    setSteps([]);
    dispatch(addTodoAction(todo));
    setValueDesc("");
    setValueTitle("");
    setDateVisible(false);
    dateDispatch({ type: "dateReborn", payload: initialState });
    setDescVisible(false);
    setAddTodoVisible(false);
  }
};
