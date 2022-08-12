import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [isUpdating, setIsUpdating] = useState('');
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [updating, setUpdating] = useState();
  const [id, setId] = useState();
  const [todoId, setTodoId] = useState();
  const [tru, setTrue] = useState(false);

  const [value, setValue] = useState({
    title: '',
    description: '',
  });

  const deleteTodo = async (id) => {
    const url = `http://localhost:5000/delete/${id}`;
    const { data } = await axios.delete(url);
    console.log(data);
    // window.location.reload();
  };

  const updateTodo = (listId) => {
    let lists = [...list];
    const temp = lists.find((list) => {
      return list._id === listId;
    });

    setName(temp.name);
    setIsUpdating(listId);
  };

  const sendTodo = async () => {
    const url = 'http://localhost:5000/add';
    const { data } = await axios.post(url, { name, todos: [] });
    setName('');

    console.log(data);
    // window.location.reload();
  };
  // console.log(name);

  const putTodo = async () => {
    const url = `http://localhost:5000/update/${isUpdating}`;
    const { data } = await axios.put(url, { name });
    setName('');
    setIsUpdating('');
  };
  const addTodo = async () => {
    let lists = [...list];
    const temp2 = lists.filter((list) => {
      if (list._id === id) {
        const temp = [
          ...list.todos,
          { title: value.title, description: value.description },
        ];
        list.todos = temp;
        return list;
      }
    })[0];
    if (temp2) {
      const url = `http://localhost:5000/update/${id}`;
      const { data } = await axios.put(url, temp2);
      // window.location.reload();
    }
  };

  const updateReady = (todoId) => {
    setTodoId(todoId);
    if (list) {
      let lists = [...list];
      const temp2 = lists.filter((list) => {
        if (list._id === id) {
          let updatedTodos = [...list.todos].map((todo) =>
            todo._id === todoId
              ? setValue({ title: todo.title, description: todo.description })
              : todo
          );
        }
        setUpdating(todoId);
      });
    }
  };

  const updateOneTodo = async () => {
    let lists = [...list];
    const temp2 = lists.filter((list) => {
      if (list._id === id) {
        let updatedTodos = [...list.todos].map((todo) =>
          todo._id === todoId
            ? {
                ...todo,
                title: value.title,
                description: value.description,
              }
            : todo
        );
        list.todos = updatedTodos;
        return list;
      }
    })[0];

    if (temp2) {
      const url = `http://localhost:5000/update/${id}`;
      const { data } = await axios.put(url, temp2);
      // window.location.reload();
    }
    setValue({ title: '', description: '' });
    setUpdating('');
  };

  const deleteOneTodo = async (todoId) => {
    let lists = [...list];
    const temp2 = lists.filter((list) => {
      if (list._id === id) {
        let updatedTodos = [...list.todos].filter(
          (todo) => todo._id !== todoId
        );
        list.todos = updatedTodos;
        return list;
      }
    })[0];
    if (temp2) {
      const url = `http://localhost:5000/update/${id}`;
      const { data } = await axios.put(url, temp2);
      // window.location.reload();
    }
  };

  const todoLists = (e, id) => {
    if (e.target.outerText !== 'update' && e.target.outerText !== 'delete') {
      setId(id);
      let lists = [...list];
      const temp = lists.find((list) => {
        return list._id === id;
      });

      setTrue(!tru);
      setUpdating('');
      setValue('');
    }
  };

  useEffect(() => {
    async function get() {
      const url = 'http://localhost:5000';
      const { data } = await axios.get(url);
      setList(data);
    }
    get();
  }, [
    deleteTodo,
    todoLists,
    deleteOneTodo,
    updateOneTodo,
    updateReady,
    addTodo,
    sendTodo,
    putTodo,
    updateTodo,
  ]);

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div>
          <div className="flex">
            <input
              className="border-b-2 w-[400px] ring-0 outline-none"
              type="name"
              placeholder="Todo List Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div
              className="cursor-pointer bg-black text-white px-5 py-1 rounded-lg"
              onClick={isUpdating ? putTodo : sendTodo}
            >
              {isUpdating ? 'Update' : 'Add'}
            </div>
          </div>
          <div>
            {list.map((item) => (
              <div
                onClick={(e) => todoLists(e, item._id)}
                className="flex justify-between bg-gray-500 px-3 py-2 rounded-lg mt-5 w-[470px]"
                key={item._id}
              >
                <div>{item.name}</div>
                <div className="font-bold">
                  <i className="mr-3 " onClick={() => updateTodo(item._id)}>
                    update
                  </i>
                  <i className="mr-3 " onClick={() => deleteTodo(item._id)}>
                    delete
                  </i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {tru && (
            <div>
              <div className="flex">
                <input
                  className="border-b-2 w-[300px] ring-0 outline-none"
                  type="name"
                  placeholder="title..."
                  value={value.title}
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                />
                <input
                  className="border-b-2 ml-5 w-[300px] ring-0 outline-none"
                  type="name"
                  placeholder="description..."
                  value={value.description}
                  onChange={(e) =>
                    setValue({ ...value, description: e.target.value })
                  }
                />
                <div
                  className="cursor-pointer bg-black text-white px-5 py-1 rounded-lg"
                  // onClick={isUpdating ? putTodo : sendTodo}
                  onClick={updating ? updateOneTodo : addTodo}
                >
                  {updating ? 'Update' : 'Add'}
                </div>
              </div>
              {list.map(
                (list) =>
                  list._id === id &&
                  list.todos.map((todo) => (
                    <div
                      // onClick={() => todoLists(item._id)}
                      className="flex justify-between bg-gray-500 px-3 py-2 rounded-lg mt-5 w-[470px]"
                      key={todo._id}
                    >
                      <div>{todo.title}</div>
                      <div>{todo.description}</div>
                      <div className="font-bold">
                        <i
                          className="mr-3 "
                          onClick={() => updateReady(todo._id)}
                        >
                          update
                        </i>
                        <i onClick={() => deleteOneTodo(todo._id)}>delete</i>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
