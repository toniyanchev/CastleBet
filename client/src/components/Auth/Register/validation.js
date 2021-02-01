export const validUsername = username => {
  if (username.length < 8) {
    return "username: at least 8 characters";
  }
  if (/\d/.test(username)){
    return true;
  }
  return "username: must include at least one number";
}

export const validPassword = password => {
  if (password.length < 10) {
    return "password: at least 10 characters";
  }
  if (!(/\d/.test(password))) {
    return "password: must include at least one number";
  }
  return true;
}

export const validBirthDate = date => {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const validateUserData = userData => {
  if (validUsername(userData.username) !== true) return false;
  if (validPassword(userData.password) !== true) return false;
  if (validBirthDate(userData.birthdate) < 18) return false;
  
  return true;
}

export default validateUserData;