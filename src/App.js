import React from 'react';
import AddTodo from './containers/add-todo';
import TodoList from './components/list-todo';
import VisibilityFilters from "./components/visibility-filters";
import './App.css';

function App() {
  return (
    <div className="App">
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export default App;
