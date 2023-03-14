import React, { useState, useContext, useRef } from "react";

const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(getTasks());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [location, setLocation] = useState({});
  const refContainer = useRef(null);

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  return (
    <AppContext.Provider
      value={{tasks, setTasks, removeTask, toggleDone, refContainer, isEditing, setIsEditing, editId, setEditId,
        editTask, name, setName, getTasks, filter, setFilter, inputRef, location, setLocation}}
    >
    {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };