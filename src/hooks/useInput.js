import { useState } from "react";

const useInput = (validator, validClass, inValidClass, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);


  const valueIsValid = validator(value);
  // console.log(valueIsValid)
  const hasError = !valueIsValid && isTouched;
  const inputClasses = !hasError
    ? `${validClass}`
    : `${validClass} ${inValidClass}`;

  const valueChangeHandler = (event) => {
    // console.log(event.target.value)
    setIsTouched(true);
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    // console.log('blur')
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setValue(initialValue);
  };

    return {
      value: value,
      isValid: valueIsValid,
      classes: inputClasses,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset,
    };
};

export default useInput;