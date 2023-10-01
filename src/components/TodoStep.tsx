import React from "react";
import { changeStepStatusTodo } from "../lib/changeStepStatusTodo";
import s from "../Styles/ListTodo.module.sass";
import { useAppDispatch } from "../Redux";
import { IStep, ITodo } from "../Redux/todoReducer";

interface ItodoStep {
  step: IStep;
  todo: ITodo;
  index: number;
}

const TodoStep: React.FC<ItodoStep> = ({ step, todo, index }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={s.step} key={Math.random()}>
      <div className={s.stepStatus}>
        <div>
          <span className={s.stepCifer}>{index + 1}</span> подзадача{" "}
        </div>
        {step.done ? (
          <span className={s.stepStatusDone}>выполнено</span>
        ) : (
          <span className={s.stepStatusNotDone}>не выполнено</span>
        )}{" "}
        {step.done ? (
          <button
            className={s.StepStatusBtn}
            onClick={() => changeStepStatusTodo(dispatch, todo.id, step, todo)}
          >
            Не выполнено
          </button>
        ) : (
          <button
            className={s.StepStatusBtn}
            onClick={() => changeStepStatusTodo(dispatch, todo.id, step, todo)}
          >
            Выполнено
          </button>
        )}
      </div>
      <div className={s.stepText}>{step.value}</div>
    </div>
  );
};

export default TodoStep;
