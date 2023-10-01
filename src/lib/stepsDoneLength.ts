export interface IStepDone {
  done: boolean;
  value?: string;
  index?: number;
}

export const stepsDoneLength = (steps: IStepDone[]): string => {
  let doneLength = 0;
  let percent = "0";
  if (steps.length) {
    doneLength = steps.filter((step) => step.done === true).length;
    percent = ((doneLength / steps.length) * 100).toFixed();
    return percent;
  }
  return percent;
};
