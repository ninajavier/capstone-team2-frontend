import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeDropdown, setActiveDropdown] = useState('');

  const handleClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? '' : dropdown);
  };

  return (
    <div style={{ padding: '20px', display: 'flex' }}>
      <aside style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        {/* User Profile */}
        <h2 onClick={() => toggleDropdown('user-profile')} style={{ padding: '10px', cursor: 'pointer' }}>
          <i className="material-icons">account_circle</i> User Profile
        </h2>
        <div style={{ paddingLeft: '20px', display: activeDropdown === 'user-profile' ? 'block' : 'none' }}>
          <p onClick={() => handleClick('user-profile/edit-profile')} style={{ backgroundColor: isActive('edit-profile') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">edit</i> Edit Profile
          </p>
          <p onClick={() => handleClick('user-profile/change-password')} style={{ backgroundColor: isActive('change-password') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">lock</i> Change Password
          </p>
        </div>

        {/* Notifications */}
        <h2 onClick={() => toggleDropdown('notifications')} style={{ padding: '10px', cursor: 'pointer' }}>
          <i className="material-icons">notifications</i> Notifications
        </h2>
        <div style={{ paddingLeft: '20px', display: activeDropdown === 'notifications' ? 'block' : 'none' }}>
          <p onClick={() => handleClick('notifications/email-notifications')} style={{ backgroundColor: isActive('email-notifications') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">email</i> Email Notifications
          </p>
          <p onClick={() => handleClick('notifications/sms-notifications')} style={{ backgroundColor: isActive('sms-notifications') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">sms</i> SMS Notifications
          </p>
        </div>

        {/* Privacy */}
        <h2 onClick={() => toggleDropdown('privacy')} style={{ padding: '10px', cursor: 'pointer' }}>
          <i className="material-icons">privacy_tip</i> Privacy
        </h2>
        <div style={{ paddingLeft: '20px', display: activeDropdown === 'privacy' ? 'block' : 'none' }}>
          <p onClick={() => handleClick('privacy/visibility')} style={{ backgroundColor: isActive('visibility') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">visibility_off</i> Visibility
          </p>
          <p onClick={() => handleClick('privacy/security')} style={{ backgroundColor: isActive('security') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">fingerprint</i> Security
          </p>
        </div>

        {/* Support */}
        <h2 onClick={() => toggleDropdown('support')} style={{ padding: '10px', cursor: 'pointer' }}>
          <i className="material-icons">help_outline</i> Support
        </h2>
        <div style={{ paddingLeft: '20px', display: activeDropdown === 'support' ? 'block' : 'none' }}>
          <p onClick={() => handleClick('support/help-center')} style={{ backgroundColor: isActive('help-center') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">live_help</i> Help Center
          </p>
          <p onClick={() => handleClick('support/send-feedback')} style={{ backgroundColor: isActive('send-feedback') ? '#f0f0f0' : 'transparent', padding: '10px', cursor: 'pointer' }}>
            <i className="material-icons">feedback</i> Send Feedback
          </p>
        </div>
      </aside>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <Routes>
          {/* User Profile */}
          <Route path="user-profile/edit-profile" element={<EditProfile />} />
          <Route path="user-profile/change-password" element={<ChangePassword />} />
          {/* Notifications */}
          <Route path="notifications/email-notifications" element={<EmailNotifications />} />
          <Route path="notifications/sms-notifications" element={<SmsNotifications />} />
          {/* Privacy */}
          <Route path="privacy/visibility" element={<Visibility />} />
          <Route path="privacy/security" element={<Security />} />
          {/* Support */}
          <Route path="support/help-center" element={<HelpCenter />} />
          <Route path="support/send-feedback" element={<SendFeedback />} />
        </Routes>
      </div>
    </div>
  );
};

// ... Create separate components for each route ...

const EditProfile = () => (
  <div>
    <h2>Edit Profile</h2>
    {/* ... edit profile content ... */}
  </div>
);

const ChangePassword = () => (
  <div>
    <h2>Change Password</h2>
    {/* ... change password content ... */}
  </div>
);

const EmailNotifications = () => (
  <div>
    <h2>Email Notifications</h2>
    {/* ... email notifications content ... */}
  </div>
);

const SmsNotifications = () => (
  <div>
    <h2>SMS Notifications</h2>
    {/* ... SMS notifications content ... */}
  </div>
);

const Visibility = () => (
  <div>
    <h2>Visibility</h2>
    {/* ... visibility settings content ... */}
  </div>
);

const Security = () => (
  <div>
    <h2>Security</h2>
    {/* ... security settings content ... */}
  </div>
);

const HelpCenter = () => (
  <div>
    <h2>Help Center</h2>
    {/* ... help center content ... */}
  </div>
);

const SendFeedback = () => (
  <div>
    <h2>Send Feedback</h2>
    {/* ... send feedback content ... */}
  </div>
);

export default Settings;
