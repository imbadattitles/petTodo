const initialState = {
    todos: [],
    deletedTodos: [],
}

const SET_TODO = 'SET_TODO'
const SET_DELETED_TODO = 'SET_DELETED_TODO'


export const todoReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_TODO:
            return {...state, todos: action.payload}

        case SET_DELETED_TODO:
            return {...state, deletedTodos: action.payload}

        default: 
            return state

    }
}



export const setTodoAction = (payload) => ({type: SET_TODO, payload})
export const setDeletedTodoAction = (payload) => ({type: SET_DELETED_TODO, payload})





export const fetchTodoAction = () => async (dispatch) => {
    try {
        const todos = localStorage.getItem("todos") || '[{"title":"Делай заметки","description":"и отслеживай выполнение своих задач","id":"2023.5.4 17:14:29","steps":[{"done":true,"index":0,"value":"Добавь запись нажав кнопку сверху"},{"done":true,"index":1,"value":"Можешь добавлять неограниченное количество подзадач и отслеживать их выполнение"},{"done":false,"index":2,"value":"Все записи храняться в Вашем браузере, никто не имеет доступ к ним"}],"stepsDone":67,"startDate":"2023.5.4","endDate":null,"status":true}]'
        const json = JSON.parse(todos)
        dispatch(setTodoAction(json));
    }
    catch (e) {
        console.log(e);
    }
}

export const addTodoAction = (todo) => async (dispatch) => {
    try {
        const todos = localStorage.getItem("todos") || '[]'
        const json = JSON.parse(todos)
        json.unshift(todo);
        dispatch(setTodoAction(json));
        localStorage.setItem('todos', JSON.stringify(json));
    }
    catch (e) {
        console.log(e);
    }
}
export const deleteTodoAction = (id) => async (dispatch) => {
    try {
        const todos = localStorage.getItem("todos") || '[]'
        const json = JSON.parse(todos)
        const newTodos = json.filter(todo => todo.id !== id);
        dispatch(setTodoAction(newTodos));
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    catch (e) {
        console.log(e);
    }
}

export const saveDeleteTodoAction = (todo) => async (dispatch) => {
    try {
        const deletedTodos = localStorage.getItem("deletedTodos") || '[]'
        const deletedJson = JSON.parse(deletedTodos)
        deletedJson.push(todo)
        dispatch(setDeletedTodoAction(deletedJson));
        localStorage.setItem('deletedTodos', JSON.stringify(deletedJson));
    }
    catch (e) {
        console.log(e);
    }
}

export const changeTodoAction = ({id, newTodo}) => async (dispatch) => {
    try {
        const todos = localStorage.getItem("todos") || '[]'
        const json = JSON.parse(todos)
        const newTodos = json.map(todo => {
            if (todo.id === id) {
                todo = newTodo
            }
            return todo 
        });
        dispatch(setTodoAction(newTodos));
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    catch (e) {
        console.log(e);
    }
}


export const fetchDeletedTodoAction = () => async (dispatch) => {
    try {
        const deletedTodos = localStorage.getItem("deletedTodos") || '[]'
        const json = JSON.parse(deletedTodos)
        dispatch(setDeletedTodoAction(json));
    }
    catch (e) {
        console.log(e);
    }
}
