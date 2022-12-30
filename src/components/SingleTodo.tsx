import e from 'express'
import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { MdDone, MdToggleOff } from "react-icons/md"
import { Todo } from '../models/models'
import TodoList from './TodoList'

type Props = {
  index:number
  todo: Todo,
  todos:Array<Todo>,
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>,
  
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo??"");
  const inputRef=useRef<HTMLInputElement>(null);
  
  useEffect(()=>{
    inputRef.current?.focus();
  }, [edit])

  
  function handleEdit(e: React.FormEvent, id: number) {    
    e.preventDefault();
    setEdit(false);
    setTodos(
      c=>c.map(ele=>ele.id==id?({...ele, todo:editTodo}):ele)
    )
    
  }

  function handleDone(id: number) {
    setTodos(c => c.map(ele => ele.id !== id ? ele : ({ ...ele, isDone: true })))
  }

  function handleDelete(id: number) {
    setTodos(c => c.filter(ele => ele.id !== id))
  }


  return (

    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot)=>(

        <form onSubmit={(e)=>handleEdit(e, todo.id)} className={`todos__single ${snapshot.isDragging?"drag":""}`} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <span className="todos_single__text">
            {
              todo.isDone ? (
                <span className='line-trough'>{todo.todo}</span>

              ):edit?(
                      // <form action="" onSubmit={(e)=>handleEdit(e, todo.id)}>
                        <input ref={inputRef} type="text" autoFocus className='nostyle' name='toto' value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
                      // </form>
                    ):(
                      <span>
                      {todo.todo}
                    </span>

                    )
                  }
              
            
          </span>

          <div className='todos_single__icons'>
            <span className="icon" onClick={()=>setEdit(v=>true)}><AiFillEdit /></span>
            <span className="icon" onClick={(e) => handleDelete(todo.id)}><AiFillDelete /></span>
            <span className="icon" onClick={(e) => handleDone(todo.id)}><MdDone /></span>
          </div>
        </form>


        
        )

    
                  
      }

      
      
    </Draggable>
  )
}

export default SingleTodo