import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function shuffle(array) {
  // Fisher-Yates shuffle
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}



const NameList = ({ items, isLoading, isError, search, onEdit, onCardClick }) => {
  const [shuffled, setShuffled] = React.useState([]);
  const [filteredShuffled, setFilteredShuffled] = React.useState([]);

  // Shuffle all items when items change
  React.useEffect(() => {
    if (items && Array.isArray(items)) {
      setShuffled(shuffle(items));
    }
  }, [items]);

  // Shuffle filtered items when search changes
  React.useEffect(() => {
    let arr = shuffled;
    if (search) {
      arr = shuffled.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredShuffled(shuffle(arr));
  }, [shuffled, search]);

  return (
    <div className="deck-list">
      {isLoading && <div>Loading list...</div>}
      {isError && <div style={{ color: 'red' }}>Failed to load list.</div>}
      {filteredShuffled.length > 0 ? (
        <div className="deck-grid">
          <AnimatePresence>
            {filteredShuffled.map((item) => {
              const descText = stripHtml(item.description);
              const shortDesc = descText.length > 100 ? descText.slice(0, 100) + '...' : descText;
              return (
                <motion.div
                  className="deck-card"
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 30 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.35 }}
                  onClick={e => {
                    if (e.target.closest('.edit-btn')) return;
                    onCardClick && onCardClick(item);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="deck-name">{item.name}</div>
                    <button
                      className="button edit-btn"
                      style={{ fontSize: '0.95rem', padding: '0.3rem 0.8rem', borderRadius: 6, marginLeft: 8, background: '#f6d365', color: '#fff', minWidth: 60 }}
                      onClick={e => { e.stopPropagation(); onEdit && onEdit(item); }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="deck-desc">{shortDesc}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>No names found.</div>
      )}
    </div>
  );
};

export default NameList;
