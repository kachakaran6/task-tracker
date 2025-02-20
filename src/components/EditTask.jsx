import { useEffect } from "react";
import { useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
    // setTaskList([...taskList, { projectName, taskDescription }]);
    setEditModal(false);
  };

  return (
    <>
      <button
        onClick={() => setEditModal(true)}
        className="bg-gray-400 text-black text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-pink-200 border rounded-lg shadow-md relative flex flex-col">
              <div className=" flex flex-row justify-between p-5 border-b border-slate-200 rounded rounded-t ">
                <h3 className="text-3xl font-semibold">Edit Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setEditModal(false)}
                >
                  x
                </button>
              </div>
              <form className="px-6 pt-6 pb-4 " action="">
                <label
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="project-name"
                  name="projectName"
                  placeholder="Project name"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor=""
                  >
                    Project Description
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    name="taskDescription"
                    id="task-description"
                    rows={5}
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={handleInput}
                  ></textarea>
                </div>
              </form>
              <div className="flex justify-end p-6 border-slate-200 rounded-b">
                <button
                  onClick={handleUpdate}
                  className="bg-pink-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditTask;
