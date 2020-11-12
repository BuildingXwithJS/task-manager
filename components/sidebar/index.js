import { Project } from '../project';
import { AddProject } from '../project/add';

export function Sidebar() {
  return (
    <div className="flex flex-col space-y-2 h-screen bg-gray-900 text-white p-2">
      <Project project={{ name: 'Test' }} />

      <AddProject />
    </div>
  );
}
