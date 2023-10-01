import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({ reducer: { todos: todoReducer } });
export default store;

export const useAppDispatch = () => {
  return useDispatch<typeof store.dispatch>();
};
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export type Idispatch = typeof store.dispatch;
