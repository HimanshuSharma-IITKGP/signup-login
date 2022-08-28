import React from "react";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useHistory } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import { useDispatch } from "react-redux/es/exports";

import {
  nameValidator,
  emailValidator,
  passwordValidator
} from "../../utils/inputValidators";

const Signup = () => {
  const history = useHistory();
  const dispatchUser = useDispatch();

  const {
    value: enteredName,
    isValid: nameIsValid,
    classes: nameClasses,
    hasError: nameHasError,
    valueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(nameValidator, "form-input", "form-invalid-input");
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    classes: emailClasses,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(emailValidator, "form-input", "form-invalid-input");
  const {
    value: enteredPassword1,
    isValid: password1IsValid,
    classes: password1Classes,
    hasError: password1HasError,
    valueChangeHandler: password1ValueChangeHandler,
    inputBlurHandler: password1BlurHandler,
    reset: password1Reset,
  } = useInput(passwordValidator, "form-input", "form-invalid-input");
  const {
    value: enteredPassword2,
    isValid: password2IsValid,
    classes: password2Classes,
    hasError: password2HasError,
    valueChangeHandler: password2ValueChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: password2Reset,
  } = useInput(passwordValidator, "form-input", "form-invalid-input");

  // console.log(nameValueChangeHandler)
  // console.log(emailIsValid)
  // console.log(nameIsValid, emailIsValid, password1IsValid, password2IsValid)
  const isFormValid = nameIsValid && emailIsValid && password1IsValid && password2IsValid && (enteredPassword1 === enteredPassword2)

  // console.log(isFormValid)
  const signUpFormSubmitHandler = async(event) => {
    event.preventDefault()

    try{
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword1,
        }),

      });
      const responseData = await response.json();
      console.log(responseData)
      dispatchUser(userActions.signUp({token: responseData.token, name: responseData.user.name, email: responseData.user.email}))
      localStorage.setItem('KTJ_Authentication_token', responseData.token)
    }catch(error){
      console.log(error)
    }



    nameReset()
    emailReset()
    password1Reset()
    password2Reset()
    history.replace('/profile')
  }

  return (
    <div>
      <form className={classes.form} onSubmit={signUpFormSubmitHandler}>
        <div className={classes["form-control"]}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={enteredName}
            className={nameClasses}
            onChange={nameValueChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p>This field is required</p>}
        </div>

        <div className={classes["form-control"]}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={enteredEmail}
            className={emailClasses}
            onChange={emailValueChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p>This field is required</p>}
        </div>

        <div className={classes["form-control"]}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter some password"
            value={enteredPassword1}
            className={password1Classes}
            onChange={password1ValueChangeHandler}
            onBlur={password1BlurHandler}
          />
          {password1HasError && <p>This field is required</p>}
        </div>

        <div className={classes["form-control"]}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={enteredPassword2}
            className={password2Classes}
            onChange={password2ValueChangeHandler}
            onBlur={password2BlurHandler}
          />
          {password2HasError && <p>This field is required</p>}
        </div>

        <div className={classes["form-action"]}>
          <button
            type="submit"
            className={classes["submitBtn"]}
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </div>

        <small style={{ marginTop: "10px" }}>
          Already have an account?
          <Link to="/login" style={{ color: "red" }}>
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Signup;
