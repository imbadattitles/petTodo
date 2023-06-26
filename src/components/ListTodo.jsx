import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTodoAction, changeTodoStepStatus, deleteTodoAction, fetchTodoAction, saveDeleteTodoAction } from '../Redux/todoReducer'
import { stepsDoneLength } from './AddTodo'
import s from '../Styles/ListTodo.module.sass'
import sAdd from '../Styles/AddTodo.module.sass'

const ListTodo = () => {

const todos = useSelector(action => action.todos.todos)
const dispatch = useDispatch()
const [onChange, setOnChange] = useState(null)
const [OnChangeTitle, setOnChangeTitle] = useState('')
const [OnChangeDescription, setOnChangeDescription] = useState('')
const [OnChangeSteps, setOnChangeSteps] = useState([])
const [onChangeTodo, setOnChangeTodo] = useState({})
const [deleteVisible, setDeleteVisible] = useState(null)


const deleteTodo = (id, todo) => {
    dispatch(deleteTodoAction(id))
    dispatch(saveDeleteTodoAction(todo))
}


useEffect(() => {
    dispatch(fetchTodoAction())
}, [])

const changeTodo = (id, title, description, steps, todo) => {
    setOnChange(id)
    setOnChangeTitle(title)
    setOnChangeDescription(description)
    setOnChangeSteps(steps)
    setOnChangeTodo(todo)
}

const saveTodo = (id) => {
    const newTodo = {...onChangeTodo, title: OnChangeTitle, description: OnChangeDescription, steps: OnChangeSteps}
    dispatch(changeTodoAction({id, newTodo}))
    setOnChange(null)
}

const changeStatusTodo = (id, todo) => {
    if (todo.status) {
        const newTodo = {...todo, status: false}
        dispatch(changeTodoAction({id, newTodo}))
    } else {
        const newTodo = {...todo, status: true}
        dispatch(changeTodoAction({id, newTodo}))
    }
}

const changeStepStatusTodo = (id, step, todo) => {
    let newTodo
    if (step.done === true) {
        const steps = todo.steps.map(obj => {
            if (obj.index === step.index) {
                obj = {...step, done: false}
            }
            return obj
        })
        const stepsDone = stepsDoneLength(steps)
        newTodo = {...todo, steps, stepsDone}
    }
    if (step.done === false) {
        const steps = todo.steps.map(obj => {
            if (obj.index === step.index) {
                obj = {...step, done: true}
            }
            return obj
        })
        const stepsDone = stepsDoneLength(steps)
        newTodo = {...todo, steps, stepsDone}
    }
    dispatch(changeTodoAction({id, newTodo}))
}


  return (
    <div className={s.ListTodo}>
        {
            todos.length ? 
            <div style={{width:'100%', margin:'auto'}}>
                {todos.map(todo =>     
                <div className={s.Todo} style={todo.status ? {} :{opacity:'50%'}} key={todo.id}>
                    {todo.id === onChange 
                    ? 
                    <div>
                        <input className={sAdd.mainInput} value={OnChangeTitle} placeholder='Название' onChange={(e) => setOnChangeTitle(e.target.value)}/>
                        <input className={sAdd.mainInput}  value={OnChangeDescription} placeholder='Описание' onChange={(e) => setOnChangeDescription(e.target.value)}/>
                        {OnChangeSteps.map((obj, index) => 
                        <input className={sAdd.secondInput} placeholder={obj.value} onChange={(e) => {obj.value = (e.target.value)}}/>
                        )}
                        <button className={sAdd.goInput} onClick={() => saveTodo(todo.id)}>Закрыть</button>
                    </div>
                    :
                    <div>
                    <h3 className={s.title}>{todo.title}</h3>
                    <p>{todo.description}</p>
                    {todo.status && 
                    <>
                        {
                        todo.steps.length ?
                        <div className={s.status}>
                        <span className={s.statusText}>{todo.stepsDone.toFixed()} %</span>    
                        <span className={s.statusWidth} style={{width:`${todo.stepsDone}%`}}><span className={s.statusWidthAnim}></span><span className={s.statusWidthAnim2}></span><span className={s.statusWidthAnim}></span><span className={s.statusWidthAnim3}></span></span>
                        </div>
                        :
                        <></>
                    }
                    <div>
                    {
                        todo.steps.length
                        ? todo.steps.map((step, index) =>
                        <div className={s.step} key={Math.random()}>
                            <div className={s.stepStatus}><div><span className={s.stepCifer}>{index +1}</span> подзадача  </div>{step.done ? <span className={s.stepStatusDone}>выполнено</span> : <span className={s.stepStatusNotDone}>не выполнено</span>} {step.done ? <button className={s.StepStatusBtn} onClick={() => changeStepStatusTodo(todo.id, step, todo)}>Не выполнено</button> : <button className={s.StepStatusBtn} onClick={() => changeStepStatusTodo(todo.id, step, todo)}>Выполнено</button>}</div>
                            <div className={s.stepText}>{step.value}</div>

                        </div>    
                        )
                        : <div className={s.NoSteps}>Подзадач нет</div>
                    }
                    </div>
                    <div className={s.stepDates}>
                        <div className={s.stepDate}><span className={s.aboutDate}>Дата начала</span><span className={s.startDate}>{todo.startDate}</span></div>
                        <div className={s.stepDate}><span className={s.id}>{todo.id}</span></div>
                        <div className={s.stepDate}><span className={s.aboutDate}>Дата окончания</span><span className={s.endDate}>{todo.endDate ? todo.endDate : 'дата не выбрана'}</span></div>
                    </div>
                    </>}
                    
                    <div className={s.todoBtns}>
                        <button className={s.deleteBtn} onClick={() => setDeleteVisible(todo.id)}>Удалить запись</button>
                        {todo.status && <button className={s.changeBtn} onClick={() => changeTodo(todo.id, todo.title, todo.description, todo.steps, todo)}>Изменить запись</button>}
                        <button className={s.statusBtn} onClick={() => changeStatusTodo(todo.id, todo)}> {todo.status ? 'На паузу' : 'Снять с паузы'}</button>
                    </div>
                    {
                        deleteVisible === todo.id ? 
                        <div className={s.deleteBg}>
                            <div className={s.deleteModal}>
                                <span className={s.todoText}>Вы действительно хотите удалить запись '{todo.title}' ?</span>
                                <p className={s.stepText} style={{marginTop:'-10px', marginBottom:'20px'}}>Данные сохраняются в корзину и память браузера</p>
                                <div>
                                    <button className={s.deleteBtnModal} onClick={() => deleteTodo(todo.id, todo)}>Удалить запись</button>
                                    <button className={s.noDeleteBtn} onClick={() => setDeleteVisible(null)}>Отмена</button>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
                    }

                </div>
                 
                )}
            </div>
            :
            <div className={s.notTodos}>Записи отсутствуют</div>
        }
    </div>
  )
}

export default ListTodo