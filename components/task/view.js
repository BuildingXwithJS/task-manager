import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import axios from 'redaxios';

const DynamicEditorJs = dynamic(() => import('../editor'), { ssr: false });

export function TaskView({ project, task }) {
  const saveTimeout = useRef();
  const [taskData, setTaskData] = useState(task);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const saveTask = async (data) => {
    console.log('update', data);
    await axios.post(`/api/task/${data._id}`, data);
  };

  const throttledSave = (data) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => saveTask(data), 500);
  };

  const selectEmoji = (emoji) => {
    const newEmojiId = emoji.id;
    const newTask = { ...taskData, icon: newEmojiId };
    setTaskData(newTask);
    saveTask(newTask);
    setShowEmojiPicker(false);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    const newTask = { ...taskData, name: newName };
    setTaskData(newTask);
    throttledSave(newTask);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    const newTask = { ...taskData, description: newDescription };
    setTaskData(newTask);
    throttledSave(newTask);
  };

  const handleBodyChange = (newBody) => {
    const newTask = { ...taskData, body: newBody };
    setTaskData(newTask);
    saveTask(newTask);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="text-xl p-1 pr-2 justify-center items-center">
          <Emoji
            emoji={taskData.icon ?? 'hammer'}
            size={24}
            onClick={() => setShowEmojiPicker((s) => !s)}
          />
          {showEmojiPicker && (
            <div className="absolute">
              <Picker
                emoji={taskData.icon ?? 'hammer'}
                onSelect={selectEmoji}
                title="Task icon"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <input
            className="font-bold p-1"
            type="text"
            placeholder="Task name"
            value={taskData.name}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="flex">
        <textarea
          className="flex flex-1"
          value={taskData.description}
          placeholder="Task description"
          onChange={handleDescriptionChange}
        />
      </div>

      <DynamicEditorJs data={taskData.body} onChange={handleBodyChange} />
    </div>
  );
}
