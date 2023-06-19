
import { ChangeEvent, useReducer } from 'react';
import { Action } from '../shared/utils/models/action.interface';
import { ValidatorFunction } from '../shared/utils/validation/models/validatorFunction';
import { InputState } from './inputState.interface';
import { INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR, InputActionType } from './inputAction';


const initialInputState: InputState = {
  text: '',
  hasBeenTouched: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, value = '' } = action;

  switch (type) {
    case INPUT_ACTION_CHANGE:
      return { text: value, hasBeenTouched: state.hasBeenTouched };
    case INPUT_ACTION_BLUR:
      return { text: state.text, hasBeenTouched: true };
    case INPUT_ACTION_CLEAR:
      return { text: '', hasBeenTouched: false };

    default:
      return { ...state };
  }
};

const useInput = (validatorFunction?: ValidatorFunction) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;

  if (validatorFunction) {
    const isValid = validatorFunction(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  const clearHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
};

export default useInput;
