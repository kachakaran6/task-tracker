import { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter Project name is continue");
    }

    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter Project name is continue");
    } else {
      // let timestamp = new Date();
      let tempList = taskList;
      tempList.push({
        projectName,
        taskDescription,
      });
      localStorage.setItem("taskList", JSON.stringify(tempList));
      window.location.reload();
      setTaskList([...taskList, { projectName, taskDescription }]);
      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  };

  return (
    <div>
      <button
        className="bg-pink-400 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70 "
        type="button"
        onClick={() => setAddModal(true)}
      >
        +New
      </button>
      {addModal ? (
        <div>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-pink-200 border rounded-lg shadow-md relative flex flex-col">
              <div className=" flex flex-row justify-between p-5 border-b border-slate-200 rounded rounded-t ">
                <h3 className="text-3xl font-semibold">Add new Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setAddModal(false)}
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
                <p className="text-red-500 text-center mt-2 mb-5">
                  {errorMessage}
                </p>
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
                  onClick={handleAdd}
                  className="bg-pink-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddTask;
