import { Dispatch, SetStateAction } from "react";
import { IStep } from "../Redux/todoReducer";

export const changeAddSteps = (
  steps: IStep[],
  step: IStep,
  value: string,
  setSteps: Dispatch<SetStateAction<IStep[]>>
) => {
  const changedSteps = steps.map((item) => {
    if (item.index === step.index) return { ...item, value: value };
    else return item;
  });
  setSteps(changedSteps);
};
