import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';

// TODO: figure out why Editor.js overlays every modal / absolute div
// in existence and prevents from using them
export default function Editor({ data = {}, onChange }) {
  const editorRef = useRef();

  const handleUpdate = async () => {
    const output = await editorRef.current.save();
    onChange(output);
  };

  useEffect(() => {
    if (editorRef.current) {
      return;
    }

    editorRef.current = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      placeholder: 'Task body',
      logLevel: 'ERROR',
      data,
      onChange: handleUpdate,
    });
  }, []);

  return <div id="editorjs" />;
}
