const express = require('express');
const multer = require('multer');
const Staff = require('../models/staffModel');

const router = express.Router();

// Set up Multer to handle image upload in memory (as a buffer)
const storage = multer.memoryStorage(); // Store image in memory instead of the filesystem
const upload = multer({ storage: storage });

// POST route to save staff data (with image upload)
router.post('/', upload.single('profilePic'), async (req, res) => {
  try {
    // Extract form data from req.body
    const { staffCode, firstName, lastName, gender, birthday, email, phone, workplace, status, jobPosition, directManager, role, academicLevel, hourlyRate, language, direction, emailSignature, otherInfo, twilioPhoneNumber, isTwilioWhatsAppEnabled, password } = req.body;

    // The image (if uploaded) will be available in req.file.buffer
    const profilePicBuffer = req.file ? req.file.buffer : null;

    // Create a new Staff instance with the provided data
    const newStaff = new Staff({
      staffCode,
      firstName,
      lastName,
      gender,
      birthday,
      email,
      phone,
      workplace,
      status,
      jobPosition,
      directManager,
      role,
      academicLevel,
      hourlyRate,
      language,
      direction,
      emailSignature,
      otherInfo,
      twilioPhoneNumber,
      isTwilioWhatsAppEnabled,
      password,
      profilePic: profilePicBuffer, // Store image as binary data (Buffer)
    });

    // Save the staff data to the database
    await newStaff.save();
    
    res.status(200).json({ message: 'Staff data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving staff data' });
  }
});

// GET route to retrieve all staff members
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving staff data' });
  }
});

// GET route to retrieve a single staff member by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving staff data' });
  }
});

// PUT route to update a staff member's data
router.put('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const { staffCode, firstName, lastName, gender, birthday, email, phone, workplace, status, jobPosition, directManager, role, academicLevel, hourlyRate, language, direction, emailSignature, otherInfo, twilioPhoneNumber, isTwilioWhatsAppEnabled, password } = req.body;
    
    const profilePicBuffer = req.file ? req.file.buffer : null;

    // Update staff member by ID
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        staffCode,
        firstName,
        lastName,
        gender,
        birthday,
        email,
        phone,
        workplace,
        status,
        jobPosition,
        directManager,
        role,
        academicLevel,
        hourlyRate,
        language,
        direction,
        emailSignature,
        otherInfo,
        twilioPhoneNumber,
        isTwilioWhatsAppEnabled,
        password,
        profilePic: profilePicBuffer, // Store updated image as binary data (Buffer)
      },
      { new: true } // Return the updated staff document
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    res.status(200).json({ message: 'Staff data updated successfully', staff: updatedStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating staff data' });
  }
});

// DELETE route to delete a staff member
router.delete('/:id', async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting staff data' });
  }
});

module.exports = router;
