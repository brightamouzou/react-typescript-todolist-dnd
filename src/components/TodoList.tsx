import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Todo } from '../models/models'
import SingleTodo from './SingleTodo'

interface Props {
  todos: Array<Todo>,
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>,
  completedTodos:Array<Todo>,
  setCompletedTodos:React.Dispatch<React.SetStateAction<Array<Todo>>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (

    <div className="container">

      <Droppable droppableId='TodoList'>
        {
          (provider) => (
            <div className='todos' ref={provider.innerRef} {...provider.droppableProps}>
              <span className="todos__heading">Taches actives</span>

              {
                todos.map((todo, idx) => {
                  return <SingleTodo key={idx} index={idx} todos={todos} setTodos={setTodos} todo={todo} />
                })
              }


              {provider.placeholder}
            </div>
          )
        }
      

      </Droppable>

      <Droppable droppableId='TodoRemove'>
        {
          ((provided,snapshot) => (
            <div className={`todos remove completed ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos__heading">Taches achevées</span>
              {
                completedTodos.length?  completedTodos.map((todo, idx) => {
                  return <SingleTodo key={idx} index={todo.id} todos={todos} setTodos={setTodos} todo={todo} />
                }):<></>
              }

                {provided.placeholder}


            </div>
          ))
        }


      </Droppable>
    </div>

  )
}

export default TodoList