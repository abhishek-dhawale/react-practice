import { useState } from 'react'
import './App.css'

function App() {
  let [toDoList, setToDoList] = useState([]);

  let saveToDoList = (e) => {
    e.preventDefault();
    let toDoName = e.target.toDoName.value;
    if (!toDoList.includes(toDoName)) {
      let finalToDoList = [...toDoList, toDoName];
      setToDoList(finalToDoList); 
      e.target.toDoName.value = "";
    } else {
      alert("To Do already exists");
    }
  }

  let list = toDoList.map((value, index) => {
    return (
      <ToDoListItem 
        value={value} 
        key={index} 
        indexNumber={index} 
        toDoList={toDoList} 
        setToDoList={setToDoList}
      />
    )
  });

  return (
    <>
      <div className='App'>
        <h1>To Do list</h1>
        <form onSubmit = {saveToDoList}>
          <input type="text" name='toDoName' />
          <button>Add</button>
        </form>

        <div className='outerDiv'>
          <ul>
            {list}
          </ul>
        </div>
        
      </div>
    </>
  )
}

export default App

function ToDoListItem({value, indexNumber, toDoList, setToDoList}) {
  let [status, setStatus] = useState(false);

  let deleteRow = () => {
    let finalToDoList = toDoList.filter((item, index) => {
      return index !== indexNumber;
    })
    setToDoList(finalToDoList);
    console.log(finalToDoList);
  }

  let checkStatus = () => {
    setStatus(!status);
  }
  return (
    <li className={(status) ? 'completetodo': ''} onClick={checkStatus}>{indexNumber + 1}. {value} <span onClick={deleteRow}>&times;</span></li>
  )
}
