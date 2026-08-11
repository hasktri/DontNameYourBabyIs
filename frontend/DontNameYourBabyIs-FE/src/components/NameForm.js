import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const NameForm = ({ onAdd, isLoading, initialName = '', initialDescription = '', editMode = false }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      await onAdd({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="card">
      <form className="name-form" onSubmit={handleSubmit}>
        <input
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          disabled={isLoading}
        />
        <ReactQuill
          className="quill-input"
          value={description}
          onChange={setDescription}
          placeholder="Description"
          theme="snow"
          readOnly={isLoading}
        />
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? (editMode ? 'Saving...' : 'Adding...') : (editMode ? 'Save' : 'Add')}
        </button>
      </form>
    </div>
  );
};

export default NameForm;
