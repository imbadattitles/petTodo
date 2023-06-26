import DeleteTodos from "./DeleteTodos";
import TodosPage from "./TodosPage";

export const publicRoutes = [
    {path: '/TodosPage', component: <TodosPage/>, exact: true},
    {path: '/DeleteTodos', component: <DeleteTodos/>, exact: true},
    {path: '/*', component: <TodosPage/>, exact: true},
]