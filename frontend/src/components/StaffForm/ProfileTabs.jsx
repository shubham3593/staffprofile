
import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import RelatedInfoForm from './RelatedInfoForm';
import './ProfileTabs.scss';

const ProfileTabs = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="profile-tabs">
      <div className="header">
        <h1>Staff Profile Create</h1>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <hr />
      <div className="tabs">
        <button
          onClick={() => setActiveTab('profile')}
          className={activeTab === 'profile' ? 'active' : ''}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('related')}
          className={activeTab === 'related' ? 'active' : ''}
        >
          Related information
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'profile' && <PersonalInfoForm />}
        {activeTab === 'related' && <RelatedInfoForm />}
      </div>
    </div>
  );
};

export default ProfileTabs;
