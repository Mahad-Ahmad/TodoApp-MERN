import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let url = `https://todoappsafee.herokuapp.com`;
export const AddTodo = createAsyncThunk(
  "todo/AddTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://todoappsafee.herokuapp.com/todo/addtodo",
        {
          title: todo,
        }
      );

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const GetTodo = createAsyncThunk(
  "todo/GetTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://todoappsafee.herokuapp.com/todo/getTodos"
      );

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const UpdateTodo = createAsyncThunk(
  "todo/UpdateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/todo/updatetodo`, {
        todo,
      });

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteTodo = createAsyncThunk(
  "todo/DeleteTodo",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/todo/deleteTodo`, {
        _id,
      });
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const AddTodoList = createAsyncThunk(
  "todo/AddTodoList",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/todoList/addTodoList`, {
        todo,
      });
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteTodoList = createAsyncThunk(
  "todo/DeleteTodoList",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/todoList/deleteTodoList`, {
        _id,
      });
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const UpdateTodoList = createAsyncThunk(
  "todo/UpdateTodoList",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/todoList/updatetodoList`, {
        todo,
      });

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AddTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(AddTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(UpdateTodo.fulfilled, (state, action) => {
        state.todos.forEach((element) => {
          if (element._id === action.payload._id) {
            element.title = action.payload.title;
          } else {
            state.alert = "todo not found";
          }
        });
      })
      .addCase(UpdateTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(GetTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(GetTodo.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(DeleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(AddTodoList.fulfilled, (state, action) => {
        state.todos.forEach((todo) => {
          if (todo._id === action.payload._id) {
            todo.todoList = action.payload.todoList;
          }
        });
      })
      .addCase(AddTodoList.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(DeleteTodoList.fulfilled, (state, action) => {
        state.todos.forEach((todo) => {
          if (todo._id === action.payload._id) {
            todo.todoList = action.payload.todoList;
          }
        });
      })
      .addCase(UpdateTodoList.fulfilled, (state, action) => {
        state.todos.forEach((todo) => {
          if (todo._id === action.payload._id) {
            todo.todoList = action.payload.todoList;
          }
        });
      })
      .addCase(UpdateTodoList.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = todoSlice;
// Extract and export each action creator by name
export const { getTodos } = actions;
// Export the reducer, either as a default or named export
export default reducer;
