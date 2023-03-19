import { Fragment } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
export const App = () => {
  return (
    <div className="todo-container">
      <TodoList />
    </div>
  );
};
