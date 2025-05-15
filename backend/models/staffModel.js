
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffCode: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String },
  birthday: { type: Date },
  email: { type: String, required: true },
  phone: { type: String },
  workplace: { type: String },
  status: { type: String, required: true },
  jobPosition: { type: String },
  directManager: { type: String },
  role: { type: String },
  academicLevel: { type: String },
  hourlyRate: { type: Number },
  language: { type: String },
  direction: { type: String },
  emailSignature: { type: String },
  otherInfo: { type: String },
  twilioPhoneNumber: { type: String },
  isTwilioWhatsAppEnabled: { type: String },
  password: { type: String, required: true },
  profilePic: { type: Buffer }, 
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
