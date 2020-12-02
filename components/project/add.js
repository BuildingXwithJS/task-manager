import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'redaxios';

Modal.setAppElement('#__next');

export function AddProject({ onNewProject }) {
  const projectNameRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  const createNewProject = async () => {
    const data = { name: projectNameRef.current.value };
    const {
      data: { project },
    } = await axios.post('/api/project/new', data);
    projectNameRef.current.value = '';
    setModalOpen(false);
    onNewProject(project);
  };

  return (
    <>
      <button
        className="text-xl bg-coolGray-700 border border-coolGray-800 rounded-full w-12 h-12 flex justify-center items-center focus:outline-none"
        onClick={() => setModalOpen(true)}
      >
        <FaPlus />
      </button>

      <Modal
        isOpen={modalOpen}
        contentLabel="Create new project"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        className="bg-gray-900 p-2 shadow-md rounded text-white w-64 h-auto px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-100 text-sm font-bold mb-2"
            htmlFor="projectName"
          >
            Project name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            placeholder="Project name"
            ref={projectNameRef}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={createNewProject}
          >
            Create
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </a>
        </div>
      </Modal>
    </>
  );
}
