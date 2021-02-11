export const filterMessage = (message, userType) => {
  if (userType === "admin") {
    if (message.user.isAdmin) {
      return "sent";
    } else {
      return "received";
    }
  }

  if (userType === "client") {
    if (!message.user.isAdmin) {
      return "sent";
    } else {
      return "received";
    }
  }
}

export const getMessageTime = date => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let dateObj = new Date(date);

  let day = dateObj.getDate();
  let month = monthNames[dateObj.getMonth()];
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${month} ${hours}:${minutes}`;
}