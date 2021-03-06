import React, { useReducer } from "react";
import { validate } from "../../utils/validators";
import "./Input.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "change": {
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    }
    case "touch": {
      return { ...state, isTouched: true };
    }
    default: {
      return state;
    }
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const changeHandler = (event) => {
    dispatch({
      type: "change",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "touch" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p>{props.errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
