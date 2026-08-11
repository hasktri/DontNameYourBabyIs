import * as nameModel from '../models/nameModel.js';

// Get all names (list)
export const getAllNames = (req, res) => {
  const data = nameModel.getAll();
  // Only return the list of names (not descriptions)
  const names = data.map(item => ({ id: item.id, name: item.name, description: item.description }));
  res.json(names);
};

// Get detail by id (name + description)
export const getNameDetail = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = nameModel.getById(id);
  if (!item) {
    return res.status(404).json({ error: 'Name not found' });
  }
  res.json({ id: item.id, name: item.name, description: item.description });
};

// Add new name
export const addName = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const newItem = nameModel.add(name, description);
  res.status(201).json(newItem);
};

// Update name by id
export const updateName = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;
  if (!name && !description) {
    return res.status(400).json({ error: 'Name or description required' });
  }
  const names = nameModel.getAll();
  const idx = names.findIndex((item) => item.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Name not found' });
  }
  if (name) names[idx].name = name;
  if (description) names[idx].description = description;
  // Save changes
  nameModel._writeAll(names);
  res.json(names[idx]);
};

// Get detail by id (alias for getNameDetail, for /detail/:id route)
export const getNameDetailAlias = (req, res) => {
  return getNameDetail(req, res);
};
// src/controllers/nameController.js