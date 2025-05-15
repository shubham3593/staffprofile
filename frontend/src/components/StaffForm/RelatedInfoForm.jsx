



import React, { useState } from 'react';
import './RelatedInfoForm.scss';
import { FaFacebook, FaLinkedin, FaSkype } from 'react-icons/fa';

const RelatedInfoForm = ({ onClose }) => {
  
  const [formData, setFormData] = useState({
    domicile: '',
    maritalStatus: '',
    currentAddress: '',
    nation: '',
    placeOfBirth: '',
    religion: '',
    citizenId: '',
    dateOfIssue: '',
    placeOfIssue: '',
    resident: '',
    bankAccountNumber: '',
    bankAccountName: '',
    bankName: '',
    taxCode: '',
    epfNo: '',
    socialSecurityNo: '',
    facebook: '',
    linkedin: '',
    skype: '',
  });

  const [loading, setLoading] = useState(false);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleSave = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/related-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Related info saved successfully!');
        
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving related info:', error);
      alert('An error occurred while saving related info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="related-info-form">
      <div className="form-header">
        <h2>Related Information</h2>
        
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Domicile</label>
          <input
            type="text"
            name="domicile"
            value={formData.domicile}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">None Selected</option>
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Current Address</label>
          <input
            type="text"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nation</label>
          <input
            type="text"
            name="nation"
            value={formData.nation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Place of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Religion</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Citizen Identification</label>
          <input
            type="text"
            name="citizenId"
            value={formData.citizenId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Issue</label>
          <input
            type="date"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Place of Issue</label>
          <input
            type="text"
            name="placeOfIssue"
            value={formData.placeOfIssue}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Resident</label>
          <input
            type="text"
            name="resident"
            value={formData.resident}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bank Account Number</label>
          <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bank Account Name</label>
          <input
            type="text"
            name="bankAccountName"
            value={formData.bankAccountName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Personal Tax Code</label>
          <input
            type="text"
            name="taxCode"
            value={formData.taxCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>EPF No</label>
          <input
            type="text"
            name="epfNo"
            value={formData.epfNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Social Security No</label>
          <input
            type="text"
            name="socialSecurityNo"
            value={formData.socialSecurityNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaFacebook className="social-icon" /> Facebook
          </label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaLinkedin className="social-icon" /> LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaSkype className="social-icon" /> Skype
          </label>
          <input
            type="text"
            name="skype"
            value={formData.skype}
            onChange={handleChange}
          />
        </div>
      



      </div>

      <div className="form-actions">
         <button className="relate-close-btn" onClick={onClose}>Close</button>
          <button className="relate-save-btn" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
         
        </div>
    </div>
  );
};

export default RelatedInfoForm;
