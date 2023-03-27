import React from "react";

const Notification = ({ notificationMessage }) => {
  const { type, message } = notificationMessage;
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
