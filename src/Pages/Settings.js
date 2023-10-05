import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  // Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Visibility,
  // Security,
  HelpOutline,
  Edit,
  Lock,
  Email,
  Sms,
  Fingerprint,
  LiveHelp,
  Feedback,
} from '@mui/icons-material';

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
        <List>
          <ListItem
            button
            onClick={() => toggleDropdown('user-profile')}
            style={{
              backgroundColor: isActive('user-profile') ? '#f0f0f0' : 'transparent',
            }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItem>
          <Collapse
            in={activeDropdown === 'user-profile'}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleClick('user-profile/edit-profile')}
                style={{
                  backgroundColor: isActive('edit-profile') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleClick('user-profile/change-password')}
                style={{
                  backgroundColor: isActive('change-password') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          {/* Notifications */}
          <ListItem
            button
            onClick={() => toggleDropdown('notifications')}
            style={{
              backgroundColor: isActive('notifications') ? '#f0f0f0' : 'transparent',
            }}
          >
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <Collapse
            in={activeDropdown === 'notifications'}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleClick('notifications/email-notifications')}
                style={{
                  backgroundColor: isActive('email-notifications') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Email Notifications" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleClick('notifications/sms-notifications')}
                style={{
                  backgroundColor: isActive('sms-notifications') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Sms />
                </ListItemIcon>
                <ListItemText primary="SMS Notifications" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          {/* Privacy */}
          <ListItem
            button
            onClick={() => toggleDropdown('privacy')}
            style={{
              backgroundColor: isActive('privacy') ? '#f0f0f0' : 'transparent',
            }}
          >
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText primary="Privacy" />
          </ListItem>
          <Collapse
            in={activeDropdown === 'privacy'}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleClick('privacy/visibility')}
                style={{
                  backgroundColor: isActive('visibility') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Visibility />
                </ListItemIcon>
                <ListItemText primary="Visibility" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleClick('privacy/security')}
                style={{
                  backgroundColor: isActive('security') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          {/* Support */}
          <ListItem
            button
            onClick={() => toggleDropdown('support')}
            style={{
              backgroundColor: isActive('support') ? '#f0f0f0' : 'transparent',
            }}
          >
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
          <Collapse
            in={activeDropdown === 'support'}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleClick('support/help-center')}
                style={{
                  backgroundColor: isActive('help-center') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <LiveHelp />
                </ListItemIcon>
                <ListItemText primary="Help Center" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleClick('support/send-feedback')}
                style={{
                  backgroundColor: isActive('send-feedback') ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemIcon>
                  <Feedback />
                </ListItemIcon>
                <ListItemText primary="Send Feedback" />
              </ListItem>
            </List>
          </Collapse>
        </List>
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
          <Route path="privacy/visibility" element={<VisibilitySettings />} />
          <Route path="privacy/security" element={<SecuritySettings />} />
          {/* Support */}
          <Route path="support/help-center" element={<HelpCenter />} />
          <Route path="support/send-feedback" element={<SendFeedback />} />
        </Routes>
      </div>
    </div>
  );
};

// Separate components for each route

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

const VisibilitySettings = () => (
  <div>
    <h2>Visibility Settings</h2>
    {/* ... visibility settings content ... */}
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2>Security Settings</h2>
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
