
const isNotEmpty = (value) => {
  return value.trim().length !== 0
}


const isEmailValid = (email) => {
  // console.log(email.includes('@'))
  return email.includes('@')
}

// const isPasswordValid = (ps) => {
//   const regex =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/;

//   return regex.test(ps);
// };

export {
  isNotEmpty as nameValidator,
  isEmailValid as emailValidator,
  isNotEmpty as passwordValidator,
};

