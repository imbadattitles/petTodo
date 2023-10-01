import React, { useState, useReducer } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import { IStep } from "../Redux/todoReducer";
import s from "../Styles/AddTodo.module.sass";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../Redux";
import { addTodo } from "../lib/addTodo";
import { changeAddSteps } from "../lib/changeAddSteps";

const initialState = {
  startDate: new Date(),
  endDate: null,
  focusedInput: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    case "dateReborn":
      return {
        ...state,
        endDate: initialState.endDate,
        focusedInput: initialState.focusedInput,
      };
    default:
      throw new Error();
  }
}

const AddTodo = () => {
  const [valueTitle, setValueTitle] = useState("");
  const [valueDesc, setValueDesc] = useState("");
  const [steps, setSteps] = useState<IStep[]>([]);
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const dispatch = useAppDispatch();

  const [dateState, dateDispatch] = useReducer(reducer, initialState);

  return (
    <div className={s.AddTodo}>
      <p className={s.link}>
        <Link to="/deleteTodos">Перейти в корзину</Link>
      </p>
      {addTodoVisible && (
        <>
          <input
            className={s.mainInput}
            value={valueTitle}
            placeholder="Название"
            onChange={(e) => setValueTitle(e.target.value)}
          />
          {descVisible ? (
            <textarea
              className={s.mainInput}
              value={valueDesc}
              placeholder="Описание"
              onChange={(e) => setValueDesc(e.target.value)}
            />
          ) : (
            <button
              className={s.secondInput}
              style={{ marginTop: "10px", marginBottom: "-5px" }}
              onClick={() => setDescVisible(true)}
            >
              Добавить описание
            </button>
          )}

          {steps.length !== 0 &&
            steps.map((step, index) => (
              <input
                className={s.mainInput}
                placeholder={`описание для шага ${index + 1} (необязательно)`}
                key={index}
                value={steps[index].value}
                onChange={(e) => {
                  changeAddSteps(steps, step, e.target.value, setSteps);
                }}
              />
            ))}
          <div className={s.dopBtns}>
            <button
              className={s.secondInput}
              onClick={() =>
                setSteps([
                  ...steps,
                  { done: false, index: steps.length, value: "" },
                ])
              }
            >
              Добавить подзадачу
            </button>
            {!dateVisible && (
              <button
                className={s.secondInput}
                onClick={() => setDateVisible(true)}
              >
                Запланировать даты начала и окончания
              </button>
            )}
          </div>
          {dateVisible && (
            <div
              style={{
                margin: "30px",
                marginBottom: "50px",
                position: "relative",
                zIndex: "150",
              }}
            >
              <DateRangeInput
                onDatesChange={(data) =>
                  dateDispatch({ type: "dateChange", payload: data })
                }
                onFocusChange={(focusedInput) =>
                  dateDispatch({ type: "focusChange", payload: focusedInput })
                }
                startDate={dateState.startDate}
                endDate={dateState.endDate}
                focusedInput={dateState.focusedInput}
              />
            </div>
          )}
          <button
            className={s.goInput}
            onClick={() =>
              addTodo(
                valueTitle,
                initialState,
                dispatch,
                dateState,
                valueDesc,
                steps,
                setSteps,
                setValueDesc,
                setValueTitle,
                setDateVisible,
                dateDispatch,
                setDateVisible,
                setAddTodoVisible
              )
            }
          >
            Добавить запись
          </button>
        </>
      )}
      {!addTodoVisible && (
        <button
          className={s.startInput}
          style={{ marginTop: "30px", marginBottom: "-30px" }}
          onClick={() => setAddTodoVisible(true)}
        >
          Нажмите, чтобы пополнить список записей
        </button>
      )}
    </div>
  );
};

export default AddTodo;
