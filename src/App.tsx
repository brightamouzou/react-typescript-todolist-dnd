import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/styles.css';
import InputField from './components/InputField';
import {Todo} from "./models/models";
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from "react-beautiful-dnd";

function App() {
  const [todo, setTodo]=useState<string>("");
  const [todos, setTodos]=useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos]=useState<Array<Todo>>([]);

  function handleAdd(e:React.FormEvent){
    e.preventDefault();
    
    if(todo){
      setTodos(v=>[...v,{id:Date.now(), todo:todo, isDone:false}]);
      setTodo("");
    } 
  }

  function onDragEnd(result:DropResult){
      console.log(result);

      const {destination, source}=result;

      let add,
      active=todos,
      complete=completedTodos;

      if(!destination){
        return
      }
      if(source.droppableId===destination?.droppableId && source.index==destination.index){
        return;
      }
      
      //Source logic
      if(source.droppableId==="TodoList"){
          add=active[source.index]
          active.splice(source.index,1)
      }else{
        add=complete[source.index]
        complete.splice(source.index, 1)
      }

      //Destination logic

      if(destination.droppableId==="TodoList"){
          active.splice(destination.index??0,0,add);
      }else{
        complete.splice(destination.index??0,0,add);
      }
      
      setCompletedTodos(c=>complete.slice())
      setTodos(active)
      
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">
          Taskify
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList setCompletedTodos={setCompletedTodos} completedTodos={completedTodos} setTodos={setTodos} todos={todos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
