
const mongoose = require('mongoose');

const RelatedInfoSchema = new mongoose.Schema({
  staffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff',  
    required: false,  
  },
  domicile: String,
  maritalStatus: String,
  currentAddress: String,
  nation: String,
  placeOfBirth: String,
  religion: String,
  citizenId: String,
  dateOfIssue: Date,
  placeOfIssue: String,
  resident: String,
  bankAccountNumber: String,
  bankAccountName: String,
  bankName: String,
  taxCode: String,
  epfNo: String,
  socialSecurityNo: String,
  facebook: String,
  linkedin: String,
  skype: String,
}, { timestamps: true });

module.exports = mongoose.model('RelatedInfo', RelatedInfoSchema);
