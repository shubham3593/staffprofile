// // src/App.js
// import React from 'react';

// import ProfileTabs from './components/StaffForm/ProfileTabs';

// import StaffView from './components/StaffView/StaffView';
// import '@fortawesome/fontawesome-free/css/all.min.css';


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
    
//       <ProfileTabs />
//       <StaffView/>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from 'react';

import ProfileTabs from './components/StaffForm/ProfileTabs';
import StaffView from './components/StaffView/StaffView';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [showProfileTabs, setShowProfileTabs] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {showProfileTabs && (
        <ProfileTabs onClose={() => setShowProfileTabs(false)} />
      )}
      <StaffView />
    </div>
  );
}

export default App;
