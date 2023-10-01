import { Idispatch } from "../Redux";
import { IStep, ITodo, changeTodoAction } from "../Redux/todoReducer";
import { stepsDoneLength } from "./stepsDoneLength";

export const changeStepStatusTodo = (
  dispatch: Idispatch,
  id: string,
  step: IStep,
  todo: ITodo
) => {
  let newTodo;
  if (step.done === true) {
    const steps = todo.steps.map((obj) => {
      if (obj.index === step.index) {
        obj = { ...step, done: false };
      }
      return obj;
    });
    const stepsDone = stepsDoneLength(steps);
    newTodo = { ...todo, steps, stepsDone };
  }
  if (step.done === false) {
    const steps = todo.steps.map((obj) => {
      if (obj.index === step.index) {
        obj = { ...step, done: true };
      }
      return obj;
    });
    const stepsDone = stepsDoneLength(steps);
    newTodo = { ...todo, steps, stepsDone };
  }
  if (newTodo) {
    dispatch(changeTodoAction({ id, newTodo }));
  }
};
