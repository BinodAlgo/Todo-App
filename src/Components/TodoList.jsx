import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editedData, setEditedData] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const handleModifyTodos = (getTodoItem) => {
    const newTodos = [...todos];
    const indexOfLatestTodoItem = newTodos.findIndex(
      (todoItem) => todoItem.id == getTodoItem.id
    );
    if (indexOfLatestTodoItem === -1) {
      // todo item is not present in todo array, so add the item to newTodos array
      newTodos.push(getTodoItem);
    } else {
      // if the item is already is present in the todo array, so modify the index in the array
      newTodos[indexOfLatestTodoItem] = {
        ...newTodos[indexOfLatestTodoItem],
        text: getTodoItem.text,
      };
    }
    setTodos(newTodos);
    localStorage.setItem("todo-list", JSON.stringify(newTodos));
  };

  const getEditedTodoItem = (getEditedData) => {
    // console.log(getEditedData);
    setEditedData(getEditedData);
  };

  useEffect(() => {
    const getTodosFromLocalStorage = JSON.parse(
      localStorage.getItem("todo-list")
    );
    if (getTodosFromLocalStorage && getTodosFromLocalStorage.length !== 0)
      setTodos(getTodosFromLocalStorage);
  }, []);

  const handleDelete = (deleteID) => {
    let newTodos = [...todos];
    let updatedTodos = newTodos.filter((item) => item.id !== deleteID);
    setTodos(updatedTodos);
    localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
    // console.log(newTodos);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchParam(value.toLowerCase());
  };

  const filteredSearchTodos =
    todos && todos.length
      ? todos.filter((todo) => todo.text.includes(searchParam))
      : [];
  return (
    <div className="todo-list">
      <div className="search-todos-input-wrapper">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search todos here..."
          value={searchParam}
          onChange={handleSearch}
        />
      </div>
      <TodoForm editData={editedData} getTodoItem={handleModifyTodos} />
      {filteredSearchTodos && filteredSearchTodos.length ? (
        <TodoItem
          getIdToDelete={handleDelete}
          getEditedTodoItem={getEditedTodoItem}
          todos={filteredSearchTodos}
        />
      ) : (
        <p className="no-todo">No todos found</p>
      )}
    </div>
  );
};

export default TodoList;
