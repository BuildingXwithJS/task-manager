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
          className="hover:bg-gray-700 p-3 rounded flex justify-center items-center focus:outline-none"
          onClick={() => setEditing((s) => true)}
        >
          Add new task
        </button>
      )}

      {isEditing && (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-100 text-sm font-bold mb-2"
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
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={createNewTask}
            >
              Add
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-200 hover:text-blue-800"
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
