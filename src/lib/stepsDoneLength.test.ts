import { stepsDoneLength } from "./stepsDoneLength";
describe("doneLenght", () => {
  test("Пустой проект", () => {
    const init = [
      { done: true },
      {
        done: true,
      },
      {
        done: false,
      },
    ];
    expect(stepsDoneLength(init)).toBe("67");
  });
  test("Пять шагов", () => {
    const test = [
      { done: true },
      {
        done: true,
      },
      {
        done: false,
      },
      {
        done: false,
      },
      {
        done: false,
      },
    ];
    expect(stepsDoneLength(test)).toBe("40");
  });
});
