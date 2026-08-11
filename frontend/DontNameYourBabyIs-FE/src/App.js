import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './features/setting/settingSlice';
import { useAddItemMutation, useGetItemsQuery, useUpdateNameMutation } from './features/name/nameApiSlice';
import NameForm from './components/NameForm';
import NameList from './components/NameList';
import Modal from './components/Modal';
import './components/App.css';
import './components/Modal.css';


function App() {
  const [addItem, { isLoading }] = useAddItemMutation();
  const [updateName, { isLoading: isUpdating }] = useUpdateNameMutation();
  const { data: items, isLoading: isListLoading, isError } = useGetItemsQuery();
  const [search, setSearch] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [viewItem, setViewItem] = React.useState(null);
  const theme = useSelector(state => state.setting.theme);
  const dispatch = useDispatch();

  const handleAdd = async ({ name, description }) => {
    try {
      await addItem({ name, description }).unwrap();
      setModalOpen(false);
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleEditSave = async ({ name, description }) => {
    if (!editItem) return;
    try {
      await updateName({ id: editItem.id, name, description }).unwrap();
      setEditModalOpen(false);
      setEditItem(null);
    } catch (e) {
      // Optionally handle error
    }
  };

  return (
    <div className={`app-container${theme === 'dark' ? ' dark-theme' : ''}`}> 
      <div className="main-content">
        <div className="header-row">
          <h2 className="main-title">Đừng đặt tên con là...</h2>
          <button
            className="button add-btn"
            onClick={() => setModalOpen(true)}
          >
            Thêm tên mới
          </button>
          <button
            className="button"
            style={{ marginLeft: 16 }}
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
          </button>
        </div>
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Bạn muốn đặt tên con là gì?"
          />
        </div>
        <NameList
          items={items}
          isLoading={isListLoading}
          isError={isError}
          search={search}
          onEdit={handleEdit}
          onCardClick={item => {
            setViewItem(item);
            setViewModalOpen(true);
          }}
        />
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <NameForm onAdd={handleAdd} isLoading={isLoading} />
        </Modal>
        <Modal open={editModalOpen} onClose={() => { setEditModalOpen(false); setEditItem(null); }}>
          {editItem && (
            <NameForm
              onAdd={handleEditSave}
              isLoading={isUpdating}
              initialName={editItem.name}
              initialDescription={editItem.description}
              editMode
            />
          )}
        </Modal>
        <Modal open={viewModalOpen} onClose={() => { setViewModalOpen(false); setViewItem(null); }}>
          {viewItem && (
            <div className="modal-view">
              <div className="modal-view-title">{viewItem.name}</div>
              <div className="modal-view-desc" dangerouslySetInnerHTML={{ __html: viewItem.description }} />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
