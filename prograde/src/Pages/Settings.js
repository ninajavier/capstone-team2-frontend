import React from "react";

const Settings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome To Prograde Settings!
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>
          <i className="material-icons">account_circle</i> User Profile
        </h2>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">edit</i> Edit Profile
          </div>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">lock</i> Change Password
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>
          <i className="material-icons">notifications</i> Notifications
        </h2>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">email</i> Email Notifications
          </div>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">sms</i> SMS Notifications
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>
          <i className="material-icons">privacy_tip</i> Privacy
        </h2>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">visibility_off</i> Visibility
          </div>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">fingerprint</i> Security
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>
          <i className="material-icons">help_outline</i> Support
        </h2>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">live_help</i> Help Center
          </div>
          <div style={{ marginBottom: "10px" }}>
            <i className="material-icons">feedback</i> Send Feedback
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
