import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Todo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);
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
              <>
                <Todo
                  key={new Date().getTime()}
                  task={task}
                  index={i}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </>
            ))}
        </div>
        <div className="w-full">
          <h2 className="ml-6 text-xl w-3/4 max-w-lg my-4 py-2 px-4  bg-gray-300">
            Completed:{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
