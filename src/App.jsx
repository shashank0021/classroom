import React, { useReducer, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  text: '',
  theme: 'light',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'UPPERCASE':
      return { ...state, text: state.text.toUpperCase() };
    case 'LOWERCASE':
      return { ...state, text: state.text.toLowerCase() };
    case 'CLEAR':
      return { ...state, text: '' };
    case 'REMOVE_EXTRA_SPACE':
      return { ...state, text: state.text.replace(/\s+/g, ' ').trim() };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.className = state.theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [state.theme]);

  function clipboard() {
    if(state.text==''){

      toast('please add something then copy  the text');
    }else{

      navigator.clipboard.writeText(state.text);
      toast('Text copied to clipboard!');
    }
  }

  return (
    <div className="app-container">
      <h1>Enter Your Task</h1>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        <FontAwesomeIcon icon={state.theme === 'light' ? faMoon : faSun} />
      </button>
      <br />
      <textarea
        className="textarea"
        onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.currentTarget.value })}
        value={state.text}
      ></textarea>
      <br />
      <div className="button-container">
        <button onClick={() => dispatch({ type: 'UPPERCASE' })}>Convert Uppercase</button>
        <button onClick={() => dispatch({ type: 'LOWERCASE' })}>Convert Lowercase</button>
        <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Text</button>
        <button onClick={clipboard}>Copy to Clipboard</button>
        <button onClick={() => dispatch({ type: 'REMOVE_EXTRA_SPACE' })}>Remove Extra Space</button>
      </div>
      <br />
      <h1>Summary</h1>
      <p>Number Of Words: {state.text.split(' ').length}</p>
      <p>Number of Characters: {state.text.length}</p>
      <p>Reading Time: {state.text.split('').length * 0.0001}</p>
      <br />
      <h1>Preview</h1>
      <div style={{color:'black'}} className="preview">{state.text}</div>
      <ToastContainer />
    </div>
  );
}

export default App;