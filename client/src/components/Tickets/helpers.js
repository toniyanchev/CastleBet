export const formatDate = date => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (date === null) {
    return null;
  }
  let dateObj = new Date(date);

  let day = dateObj.getDate();
  let month = monthNames[dateObj.getMonth()];
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}