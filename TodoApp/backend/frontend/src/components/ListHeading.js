import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CrossIcon from "@mui/icons-material/Close";
import TickIcon from "@mui/icons-material/Check";

import { useState } from "react";
import { blueGrey } from "@mui/material/colors";
function ListHeading({
  defaultStatus,
  title,
  onUpdate,
  onDelete,
  onNameClick,
  Date,
  onStatusChange,
  activeClass,
}) {
  return (
    <div className={activeClass}>
      {Date ? (
        <div className="w-full text-center">
          <IconButton aria-label="edit" size="large" onClick={onStatusChange}>
            {defaultStatus ? <TickIcon /> : <CrossIcon />}
          </IconButton>
        </div>
      ) : (
        <></>
      )}
      <input
        className=" w-full text-white text-center"
        type="button"
        value={title}
        onClick={onNameClick}
      />
      {Date ? (
        <input
          className=" w-full  bg-transparent  text-white text-center"
          type="text"
          value={Date}
          readOnly
        />
      ) : (
        <></>
      )}
      <div className="w-full text-center">
        <IconButton aria-label="edit" size="large" onClick={onUpdate}>
          <EditIcon />
        </IconButton>
      </div>
      <div className="w-full text-center">
        <IconButton aria-label="delete" size="large" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ListHeading;
