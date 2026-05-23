const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

// Multer — memory mein store karo
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getEvents);
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

// Photo upload route
router.post('/:id/photos', auth, upload.array('photos', 10), async (req, res) => {
  try {
    const urls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'evolvit/events' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });

      urls.push(result.secure_url);
    }

    // Event ke photos array mein add karo
    const Event = require('../models/Event');
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $push: { photos: { $each: urls } } },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Photo upload failed' });
  }
});

module.exports = router;