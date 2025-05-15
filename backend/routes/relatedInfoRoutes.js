const express = require('express');
const router = express.Router();
const RelatedInfo = require('../models/RelatedInfo');

// POST route to save related info
router.post('/', async (req, res) => {
  try {
    const newInfo = new RelatedInfo(req.body);
    const saved = await newInfo.save();
    res.status(201).json({ message: 'Related info saved', data: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving related info', error });
  }
});

// GET route to fetch all related info
router.get('/', async (req, res) => {
  try {
    const allInfo = await RelatedInfo.find();
    res.status(200).json(allInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching related info', error });
  }
});

// GET route to fetch related info by ID
router.get('/:id', async (req, res) => {
  try {
    const info = await RelatedInfo.findById(req.params.id);
    if (!info) {
      return res.status(404).json({ message: 'Related info not found' });
    }
    res.status(200).json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching related info', error });
  }
});

// PUT route to update related info by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInfo = await RelatedInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInfo) {
      return res.status(404).json({ message: 'Related info not found' });
    }
    res.status(200).json({ message: 'Related info updated', data: updatedInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating related info', error });
  }
});

// DELETE route to delete related info by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInfo = await RelatedInfo.findByIdAndDelete(req.params.id);
    if (!deletedInfo) {
      return res.status(404).json({ message: 'Related info not found' });
    }
    res.status(200).json({ message: 'Related info deleted', data: deletedInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting related info', error });
  }
});

module.exports = router;
