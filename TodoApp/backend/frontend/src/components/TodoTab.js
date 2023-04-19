import React, { useEffect } from "react";
import ListHeading from "./ListHeading";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { AddTodo, DeleteTodo, GetTodo, UpdateTodo } from "../slices/todoSlice";
import { useDispatch } from "react-redux";
import ListTab from "./ListTab";

function TodoTab() {
  const todos = useSelector((state) => state.app.todos);
  const [update, setUpdate] = useState({
    _id: "",
    status: false,
  });
  const [showList, setShowList] = useState(false);
  const [showListId, setShowListId] = useState("");
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("");
  const handleAddClick = () => {
    dispatch(AddTodo(todo));
    setTodo("");
  };
  const handleUpdateClick = () => {
    dispatch(UpdateTodo({ _id: update._id, title: todo }));
    setTodo("");
    setUpdate({ _id: "", status: false });
  };
  const deleteHandler = (_id) => {
    setShowList(false);
    dispatch(DeleteTodo(_id));
  };
  const handleEdit = (_id, text) => {
    if (!update.status) {
      setUpdate({ _id, status: true });
      setTodo(text);
      setIsActive(_id);
    }
    if (update.status) {
      setUpdate({ _id: "", status: false });
      setTodo("");
      setIsActive("");
    }
  };
  const NameClickHandler = (_id) => {
    if (!showList) {
      setShowListId(_id);
      setShowList(!showList);
      setIsActive(_id);
    } else if (showList) {
      // setShowList(!showList);
      setShowListId(_id);
      setIsActive(_id);
    }
  };

  useEffect(() => {
    dispatch(GetTodo());
  }, [dispatch]);

  return (
    <div className="flex flex-1 justify-between">
      <div className="w-1/3 p-3">
        <div className="flex p-5">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={todo}
            required
            size="medium"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <div className="ml-3">
            <Button
              variant="contained"
              onClick={update.status ? handleUpdateClick : handleAddClick}
              size="large"
            >
              {update.status ? "Update" : "Add"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between content-center w-full ">
          <div className=" flex justify-between content-center h-8 bg-gray-300 px-10 text-white">
            <p>Name</p>
            <p>Update</p>
            <p>Delete</p>
          </div>
          {todos.map((todo, index) => (
            <ListHeading
              key={todo._id}
              title={todo.title}
              onUpdate={() => handleEdit(todo._id, todo.title)}
              onDelete={() => deleteHandler(todo._id)}
              onNameClick={() => NameClickHandler(todo._id)}
              activeClass={
                isActive === todo._id
                  ? "flex flex-1 justify-between h-10 bg-gray-600 "
                  : "flex flex-1 justify-between h-10  bg-neutral-400"
              }
            />
          ))}
        </div>
      </div>
      {showList === true && (
        <div className="w-1/2 p-3">
          <ListTab id={showListId} />
        </div>
      )}
    </div>
  );
}

export default TodoTab;
