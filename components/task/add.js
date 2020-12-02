import { useRef, useState } from 'react';
import Modal from 'react-modal';
import axios from 'redaxios';

Modal.setAppElement('#__next');

export function AddTask({ onNewTask, currentProject }) {
  const taskNameRef = useRef();
  const [isEditing, setEditing] = useState(false);

  const createNewTask = async () => {
    const data = {
      name: taskNameRef.current.value,
      project: currentProject._id,
    };
    const {
      data: { task },
    } = await axios.post(`/api/task/new`, data);
    taskNameRef.current.value = '';
    onNewTask(task);
    setEditing(false);
  };

  return (
    <>
      {!isEditing && (
        <button
          className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3 rounded flex justify-center items-center focus:outline-none"
          onClick={() => setEditing((s) => true)}
        >
          Add new task
        </button>
      )}

      {isEditing && (
        <>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-coolGray-700 mb-2"
              htmlFor="taskName"
            >
              Task name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taskName"
              type="text"
              placeholder="Task name"
              ref={taskNameRef}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={createNewTask}
            >
              Add
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-600"
              href="#"
              onClick={() => setEditing(false)}
            >
              Cancel
            </a>
          </div>
        </>
      )}
    </>
  );
}
