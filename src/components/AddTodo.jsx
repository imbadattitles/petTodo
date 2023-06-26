import React, {useState, useReducer } from 'react'
import {DateRangeInput} from '@datepicker-react/styled'
import { useDispatch } from 'react-redux'
import { addTodoAction } from '../Redux/todoReducer'
import s from '../Styles/AddTodo.module.sass'
import { Link } from 'react-router-dom'

export const stepsDoneLength = (steps = [{done:true}, {done: true}]) => {
  let doneLength = 0
  let percent = 0
  if (steps.length !== 0) {
    steps.map(step => {
      if (step.done === true) {
        doneLength = doneLength +1
      }
    })
    percent = doneLength / steps.length * 100
    return percent
  }
  return percent
}

const initialState = {
  startDate: new Date(),
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    case 'dateReborn':
      return {...state, endDate: initialState.endDate, focusedInput: initialState.focusedInput}
    default:
      throw new Error()
  }
}

const AddTodo = () => {
    const [valueTitle, setValueTitle] = useState('')
    const [valueDesc, setValueDesc] = useState('')
    const [steps, setSteps] = useState([])
    const [addTodoVisible, setAddTodoVisible] = useState(false)
    const [dateVisible, setDateVisible] = useState(false)
    const [descVisible, setDescVisible] = useState(false)
    const dispatch = useDispatch()

    const [dateState, dateDispatch] = useReducer(reducer, initialState)


    const addTodo = () => {
      if (valueTitle) {
        const data =  new Date()
        const startDate = dateState.startDate.getFullYear() + '.' + dateState.startDate.getMonth() + '.' + dateState.startDate.getDate()
        let endDate = dateState.endDate
        if (dateState.endDate) {
          endDate = dateState.endDate.getFullYear() + '.' + dateState.endDate.getMonth() + '.' + dateState.endDate.getDate()
        }
        const id = data.getFullYear() + '.' + data.getMonth() + '.' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
        const todo = {
            title: valueTitle,
            description: valueDesc,
            id: id,
            steps: steps,
            stepsDone: stepsDoneLength(steps),
            startDate: startDate,
            endDate: endDate,
            status: true
        }
        setSteps([])
        console.log(todo)
        dispatch(addTodoAction(todo))
        setValueDesc('')
        setValueTitle('')
        setDateVisible(false)
        dateDispatch({type: 'dateReborn', payload: initialState})
        setDescVisible(false)
        setAddTodoVisible(false)
      }  
    }


  return (
    <div className={s.AddTodo}>
            <p className={s.link}><Link to="/deleteTodos">Перейти в корзину</Link></p>
      {
        addTodoVisible && 
        <>
        <input className={s.mainInput} value={valueTitle} placeholder='Название' onChange={(e) => setValueTitle(e.target.value)}/>
        {descVisible ? 
        <textarea className={s.mainInput} value={valueDesc} placeholder='Описание' onChange={(e) => setValueDesc(e.target.value)}/> 
        :
        <button className={s.secondInput} style={{marginTop:'10px', marginBottom:'-5px'}} onClick={() => setDescVisible(true)}>Добавить описание</button>
        }
        
        {steps.length !== 0
        ? steps.map((step, index) => 
          <input className={s.mainInput} placeholder={`описание для шага ${index+1} (необязательно)`} key={index} value={steps[index].value} onChange={(e) => {steps[index].value = (e.target.value)}}/>
        )
        : <></>
        }
        <div className={s.dopBtns}>
        <button className={s.secondInput} onClick={() => setSteps([...steps, {done: false, index: steps.length}])}>Добавить подзадачу</button>
        {!dateVisible && <button className={s.secondInput} onClick={() => setDateVisible(true)}>Запланировать даты начала и окончания</button>}
        </div>
        {dateVisible &&
        <div style={{margin:'30px', marginBottom:'50px'}}>
        <DateRangeInput
            onDatesChange={data => dateDispatch({type: 'dateChange', payload: data})}
            onFocusChange={focusedInput => dateDispatch({type: 'focusChange', payload: focusedInput})}
            startDate={dateState.startDate}
            endDate={dateState.endDate} 
            focusedInput={dateState.focusedInput} 
        />
        </div>
        }
        <button className={s.goInput} onClick={() => addTodo()}>Добавить запись</button>
        </>
      }
      {!addTodoVisible &&
        <button className={s.startInput} style={{marginTop:'30px', marginBottom:'-30px'}} onClick={() => setAddTodoVisible(true)}>Нажмите, чтобы пополнить список записей</button>
      }
      
    </div>
  )
}


export default AddTodo