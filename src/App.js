import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import { useDrop } from "react-dnd";
import Todo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]); // Fix: Initialize with empty array

  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(item.id, item.projectName, item.taskDescription),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id, projectName, taskDescription) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription },
    ]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hey there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click </p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2 "> to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 text-xl w-3/4 max-w-lg my-4 py-2 px-4  bg-gray-300">
            To Do:{" "}
          </h2>
          {taskList
            .slice(0)
            .reverse()
            .map((task, i) => (
              <Todo
                key={new Date().getTime()}
                task={task}
                index={i}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="text-xl w-3/4 max-w-lg my-4 py-2 px-4  bg-gray-300">
            Completed:{" "}
          </h2>
          {completed
            .slice(0)
            .reverse()
            .map((task, i) => (
              <Todo
                key={new Date().getTime()}
                task={task}
                index={i}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
