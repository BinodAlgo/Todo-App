import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
const TodoItem = (props) => {
  // console.log(props);
  const { todos, getEditedTodoItem, getIdToDelete } = props;
  return todos.map((todoItem, index) => (
    <div className="todo-item-wrapper" key={`${todoItem.id}${index}`}>
      <p className="todo-text">{todoItem.text}</p>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => getIdToDelete(todoItem.id)}
          className="delete-icon"
        />
        <TiEdit
          className="edit-icon"
          onClick={() =>
            getEditedTodoItem({ id: todoItem.id, text: todoItem.text })
          }
        />
      </div>
    </div>
  ));
};

export default TodoItem;
