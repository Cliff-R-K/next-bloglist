import React from "react";

const Notification = ({ notification, setNotification }) => {
  if (notification === null) return null;
  setTimeout(() => {
    setNotification(null);
  }, 5000);

  return (
    <div>
      <div className={notification.type}>{notification.message}</div>;
    </div>
  );
};

export default Notification;
