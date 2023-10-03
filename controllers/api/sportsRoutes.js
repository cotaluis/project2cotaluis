const express = require('express');
const router = express.Router();
const { Sports, User } = require('../../models');
const withAuth = require('../../utilities/auth');

// Create a new sport
router.post('/sports', withAuth, async (req, res) => {
  try {
    const newSport = await Sports.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newSport);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all sports
router.get('/sports', async (req, res) => {
  try {
    const sportsData = await Sports.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    res.status(200).json(sportsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific sport by ID
router.get('/sports/:id', async (req, res) => {
  try {
    const sportData = await Sports.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    if (!sportData) {
      res.status(404).json({ message: 'No sport found with this id!' });
      return;
    }

    res.status(200).json(sportData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a specific sport by ID
router.put('/sports/:id', withAuth, async (req, res) => {
  try {
    const updatedSport = await Sports.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (updatedSport[0] === 0) {
      res.status(404).json({ message: 'No sport found with this id or unauthorized to update.' });
      return;
    }

    res.status(200).json(updatedSport);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific sport by ID
router.delete('/sports/:id', withAuth, async (req, res) => {
  try {
    const deletedSport = await Sports.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedSport) {
      res.status(404).json({ message: 'No sport found with this id or unauthorized to delete.' });
      return;
    }

    res.status(200).json(deletedSport);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

