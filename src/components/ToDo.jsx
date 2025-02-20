import { useDrag } from "react-dnd";
import EditTask from "./EditTask";

const Todo = ({ task, index, taskList, setTaskList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (itemID) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
    // setTaskList((currentTasks) =>
    //   currentTasks.filter((todo) => todo.id !== itemID)
    // );
  };

  return (
    <>
      <div
        className="flex flex-col items-start justify-start bg-pink-100 my-4 py-4 px-6 w-3/4 max-w-lg"
        ref={drag}
      >
        <div className="w-full flex flex-row justify-between ">
          <p className="font-semibold text-xl">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-black text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
