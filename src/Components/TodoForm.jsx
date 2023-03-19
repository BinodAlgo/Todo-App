import { useEffect, useState } from "react";

function TodoForm(props) {
  const { getTodoItem, editData } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const newlyCreatedTodoItem = {
      id: isEdit ? editData.id : Math.floor(Math.random() * 1000),
      text: inputValue,
    };
    getTodoItem(newlyCreatedTodoItem);
    setInputValue("");
    setIsEdit(false);
  };

  useEffect(
    (_) => {
      if (editData && Object.keys(editData).length !== 0) {
        setIsEdit(true);
        setInputValue(editData.text);
      }
    },
    [editData]
  );

  const handleOnChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  return (
    <div className="todo-form">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="add-todo"
          className="todo-input"
          onChange={handleOnChange}
          value={inputValue}
          placeholder="your todo.."
        />
        <button type="submit" className="todo-button">
          {isEdit ? "Edit todo" : "Add todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
