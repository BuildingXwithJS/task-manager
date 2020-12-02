import { useEffect, useState } from 'react';
import { Task } from '../task';
import { AddTask } from '../task/add';

export function TaskList({ initialTasks = [], currentProject, currentTask }) {
  const [tasks, setTask] = useState(initialTasks);

  useEffect(() => {
    setTask(initialTasks);
  }, [initialTasks]);

  const handleNewTask = (newTask) => {
    const newProjects = tasks.concat(newTask);
    setTask(newProjects);
  };

  return (
    <div className="flex flex-col h-screen bg-coolGray-100 p-2 border-r border-coolGray-200">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          project={currentProject}
          isCurrent={task._id === currentTask?._id}
        />
      ))}

      <AddTask onNewTask={handleNewTask} currentProject={currentProject} />
    </div>
  );
}
