
import React, { useState, useEffect } from 'react';
import './StaffView.scss';
import ProfileTabs from '../StaffForm/ProfileTabs';

const StaffView = () => {
  const [staffData, setStaffData] = useState(null);
  const [relatedInfo, setRelatedInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffRes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/staff`);
        const staffJson = await staffRes.json();
        setStaffData(staffJson[0]); // assuming single staff

        const relatedRes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/related-info`);
        const relatedJson = await relatedRes.json();
        setRelatedInfo(relatedJson[0]); // assuming related info matches the staff
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const bufferToBase64 = (buffer) => {
    if (!buffer) return null;
    const byteArray = new Uint8Array(buffer);
    const base64String = btoa(
      byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  if (!staffData) return <div>Loading...</div>;

  return (
    <div className="staff-view-container">
      <div className="left-side">
        <div className="profile-box">
          <div className="avatar">
            <img
              src={
                staffData.profilePic?.data
                  ? bufferToBase64(staffData.profilePic.data)
                  : '/avatar-placeholder.jpg'
              }
              alt="Profile"
            />
          </div>
          <div className="name">
            <strong>{staffData.firstName} {staffData.lastName}</strong>
          </div>
          <div className="social-icons">
            {relatedInfo?.facebook && (
              <a href={relatedInfo.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            )}
            {relatedInfo?.linkedin && (
              <a href={relatedInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {relatedInfo?.skype && (
              <a href={`skype:${relatedInfo.skype}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-skype"></i>
              </a>
            )}
            {relatedInfo?.skype && (
              <a href={`skype:${relatedInfo.skype}`} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
            )}

          </div>

        </div>
        <div className="extra-info-table">
          <div className="row">
            <strong><i className="fas fa-envelope"></i></strong>
            {staffData.email || 'N/A'}
          </div>
          <div className="row">
            <strong><i className="fas fa-phone"></i></strong>
            {staffData.phone || 'N/A'}
          </div>
          <div className="row">
            <strong><i className="fas fa-university"></i></strong>
            {staffData.universityLogin || 'Oxford University'}
          </div>
          <div className="row">
            <strong></strong>
            {staffData.role || 'Employee'}
          </div>

          <div className="row blank-row">
            {/* Blank row for spacing */}
          </div>
          <div className="row">
            <strong>Direct Manager:</strong>
            {staffData.directManagerImage && (
              <img
                src={
                  staffData.profilePic?.data
                    ? bufferToBase64(staffData.profilePic.data)
                    : '/avatar-placeholder.jpg'
                }
                alt="Profile"
              />
            )}
            <span>{staffData.directManager }</span>
          </div>

        </div>





      </div>

      <div className="right-side">
        <div className="general-info">
          <h3>General Information</h3>
          <p><strong>Staff Code:</strong> {staffData.staffCode}</p>
          <p><strong>Staff Name:</strong> {staffData.firstName} {staffData.lastName}</p>
          <p><strong>Gender:</strong> {staffData.gender}</p>
          <p><strong>Birthday:</strong> {new Date(staffData.birthday).toLocaleDateString()}</p>
          <p><strong>Phone:</strong> {staffData.phone}</p>
          <p><strong>Workplace:</strong> {staffData.workplace || 'N/A'}</p>
          <p><strong>Status:</strong> {staffData.status}</p>
          <p><strong>Job Position:</strong> {staffData.jobPosition || 'N/A'}</p>
          <p><strong>Academic Level:</strong> {staffData.academicLevel || 'N/A'}</p>
          <p><strong>Hourly Rate:</strong> {staffData.hourlyRate !== null ? `$${staffData.hourlyRate}` : 'N/A'}</p>
          <p><strong>Religion:</strong> {relatedInfo?.religion || 'N/A'}</p>
          <p><strong>Nation:</strong> {relatedInfo?.nation || 'N/A'}</p>
          <p><strong>Marital Status:</strong> {relatedInfo?.maritalStatus || 'N/A'}</p>
        </div>


        {relatedInfo && (
          <div className="related-info">
            <h3>Related Information</h3>
            <p><strong>Citizen ID:</strong> {relatedInfo?.citizenId || 'N/A'}</p>
            <p><strong>Date of Issue:</strong> {relatedInfo?.dateOfIssue ? new Date(relatedInfo.dateOfIssue).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Place of Birth:</strong> {relatedInfo?.placeOfBirth || 'N/A'}</p>
            <p><strong>Current Address:</strong> {relatedInfo?.currentAddress || 'N/A'}</p>
            <p><strong>Bank Account Number:</strong> {relatedInfo?.bankAccountNumber || 'N/A'}</p>
            <p><strong>Bank Account Name:</strong> {relatedInfo?.bankAccountName || 'N/A'}</p>
            <p><strong>Bank Name:</strong> {relatedInfo?.bankName || 'N/A'}</p>
            <p><strong>Personal Tax Code:</strong> {relatedInfo?.taxCode || 'N/A'}</p>
          </div>

        )}
      </div>

      <div className="update-btn">
        <button onClick={openModal}>Update Profile</button>
        <button onClick={openModal}>Create</button>
      </div>

      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <ProfileTabs onClose={closeModal} />
    </div>
  </div>
)}

    </div>
  );
};

export default StaffView;
