
import React, { useState } from 'react';
import './PersonalInfoForm.scss';

const PersonalInfoForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const [formData, setFormData] = useState({
    staffCode: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthday: '',
    email: '',
    phone: '',
    workplace: '',
    status: 'Working',
    jobPosition: '',
    directManager: '',
    role: 'Employee',
    academicLevel: '',
    hourlyRate: '',
    defaultLanguage: 'System Default',
    direction: 'System Default',
    emailSignature: '',
    otherInformation: '',
    twilioPhoneNumber: '',
    isTwilioWhatsAppEnabled: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        document.querySelector('.avatar-container img')?.setAttribute('src', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    submissionData.append('password', password);
    if (profilePic) {
      submissionData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/staff`, {

        method: 'POST',
        body: submissionData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Staff saved successfully');
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleClose = () => {
    setIsFormVisible(false); // Close the form
  };

  return (
    <div className="staff-form-container">
      <h2 className="form-title">Staff profile Create</h2>

      <div className="form-section">
        <label>
          <input type="checkbox" />
          Enable Email Two Factor Authentication
        </label>
      </div>

      <div className="avatar-section">
        <div className="avatar-container" onClick={() => document.getElementById('file-upload').click()}>
          {profilePic ? <img alt="Profile Avatar" /> : <span></span>}
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="form-grid">
        <div className="form-group wide-field">
          <label>Staff code <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Enter staff code"
            name="staffCode"
            value={formData.staffCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>First name <span className="required">*</span></label>
          <input type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last name <span className="required">*</span></label>
          <input type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>None selected</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Workplace</label>
          <select name="workplace" value={formData.workplace} onChange={handleChange}>
            <option>None selected</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status <span className="required">*</span></label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Working</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label>Job position</label>
          <select name="jobPosition" value={formData.jobPosition} onChange={handleChange}>
            <option>None selected</option>
          </select>
        </div>
        <div className="form-group">
          <label>Direct manager</label>
          <select name="directManager" value={formData.directManager} onChange={handleChange}>
            <option>None selected</option>
          </select>
        </div>
        <div className="form-group wide-field">

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option>Employee</option>
            <option>CEO</option>
          </select>
        </div>
        <div className="form-group">
          <label>Academic Level</label>
          <select name="academicLevel" value={formData.academicLevel} onChange={handleChange}>
            <option>None selected</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hourly Rate</label>
          <div className="input-group">
            <input type="number" placeholder="Enter hourly rate" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
            <span className="currency-symbol">₹</span>
          </div>
        </div>
        <div className="form-group">
          <label>Default Language</label>
          <select name="defaultLanguage" value={formData.defaultLanguage} onChange={handleChange}>
            <option>System Default</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="form-group">
          <label>Direction</label>
          <select name="direction" value={formData.direction} onChange={handleChange}>
            <option>System Default</option>
            <option>LTR</option>
            <option>RTL</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email Signature</label>
          <textarea placeholder="Enter email signature" name="emailSignature" value={formData.emailSignature} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Other Information</label>
          <textarea placeholder="Enter other information" name="otherInformation" value={formData.otherInformation} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Twilio Phone Number</label>
          <input type="tel" placeholder="Enter Twilio phone number" name="twilioPhoneNumber" value={formData.twilioPhoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Is Twilio Number WhatsApp Enabled</label>
          <select name="isTwilioWhatsAppEnabled" value={formData.isTwilioWhatsAppEnabled} onChange={handleChange}>
            <option>None selected</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-group wide-field">

          <label>Password <span className="required">*</span></label>
          <div className=" form-group wide-field">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
            <button type="button" className="eye-icon" onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
            <button type="button" className="refresh-icon">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <small className="password-note">
            Note: If you populate this field, password will be changed on this member.
          </small>
        </div>
      </div>

      <div className="form-buttons">
        <button className="personal-close-btn" onClick={handleClose}>Close</button>
        <button className="personal-save-btn" onClick={handleSubmit}>Save</button>

      </div>
    </div>
  );
};

export default PersonalInfoForm;
