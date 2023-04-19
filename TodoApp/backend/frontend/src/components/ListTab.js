import React, { useEffect } from "react";
import ListHeading from "./ListHeading";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  AddTodoList,
  DeleteTodoList,
  UpdateTodoList,
} from "../slices/todoSlice";
import dayjs from "dayjs";

function ListTab({ id }) {
  const todos = useSelector((state) => state.app.todos);
  const listTodo = todos.find((todo) => todo._id === id);
  const listItem = listTodo.todoList;
  const [update, setUpdate] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [todo, setTodo] = useState("");
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState("");

  const handleAddClick = () => {
    dispatch(
      AddTodoList({
        id,
        todoList: {
          name: todo,
          date: dayjs(value).format("DD-MM-YYYY"),
          status: false,
        },
      })
    );
    setTodo("");
  };
  const handleUpdateClick = (_id, status) => {
    dispatch(
      UpdateTodoList({
        name: todo,
        _id: itemId,
        status: itemStatus,
      })
    );
    setTodo("");
    setUpdate(false);
    setItemId("");
    setItemStatus(false);
  };
  const deleteHandler = (_id) => {
    dispatch(DeleteTodoList(_id));
  };
  const handleEdit = (item_id, text, status) => {
    if (!update) {
      setUpdate(true);
      setItemId(item_id);
      setItemStatus(status);
      setTodo(text);
      setIsActive(item_id);
    } else if (update) {
      setUpdate(false);
      setIsActive("");
      setTodo("");
    }
  };
  const handleStatusChange = (listItem) => {
    dispatch(
      UpdateTodoList({
        name: listItem.name,
        _id: listItem._id,
        status: !listItem.status,
      })
    );
  };
  return (
    <>
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
        {update === false && (
          <div className="px-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enter Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={"DD-MM-YYYY"}
              />
            </LocalizationProvider>
          </div>
        )}
        <div className="ml-3">
          <Button
            variant="contained"
            onClick={update ? handleUpdateClick : handleAddClick}
            size="large"
          >
            {update ? "Update" : "Add"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between content-center w-full ">
        <div className=" flex justify-between content-center h-8 bg-gray-300 px-5 text-white">
          <p>Status</p>
          <p>Name</p>
          <p>Date</p>
          <p>update</p>
          <p>Delete</p>
        </div>
        {listItem.map((listItem, index) => (
          <ListHeading
            key={index}
            title={listItem.name}
            onUpdate={() =>
              handleEdit(listItem._id, listItem.name, listItem.status)
            }
            onDelete={() => deleteHandler(listItem._id)}
            onStatusChange={() => handleStatusChange(listItem)}
            defaultStatus={listItem.status}
            Date={listItem.date}
            activeClass={
              isActive === listItem._id
                ? "flex flex-1 justify-between h-10 bg-gray-600 "
                : "flex flex-1 justify-between h-10  bg-neutral-400"
            }
          />
        ))}
      </div>
    </>
  );
}

export default ListTab;
