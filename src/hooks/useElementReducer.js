import { useReducer, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDocument } from "../contexts/document";

const initialState = { imutable: [], mutable: [], elementSelectedId: null };

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "addElement":
      newState = {
        ...state,
        mutable: [...state.mutable, action.payload],
        imutable: [...state.mutable, action.payload],
      };
      break;
    case "updateElement":
      const updatedElement = { ...action.payload };
      const updatedMutableElements = state.mutable.map((element) => {
        if (element.id === updatedElement.id) {
          return { ...element, ...updatedElement };
        }
        return element;
      });
      newState = {
        ...state,
        mutable: updatedMutableElements,
      };
      break;
    case "resizeElements":
      const newMutableElements = state.imutable.map(
        ({ x, y, width, height, ...restElement }) => ({
          ...restElement,
          x: x * scale,
          y: y * scale,
          width: width * scale,
          height: height * scale,
        })
      );
      newState = { ...state, mutable: newMutableElements };
      break;
    case "setElementSelected":
      newState = { ...state, elementSelectedId: action.payload };
      break;
    case "removeElementSelected":
      newState = { ...state, elementSelectedId: null };
      break;
    default:
      throw new Error("Invalid Action on Element Reducer");
  }

  return newState;
}

function useElementReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hidehighlighter, setHideHighlighter] = useState(false);

  const { scale } = useDocument();

  const addElement = (element) => {
    console.log(element);
    dispatch({
      type: "addElement",
      payload: { ...element, x: 0, y: 0, id: uuidv4() },
    });
  };

  const updateElement = (elementChanges) => {
    dispatch({
      type: "updateElement",
      payload: elementChanges,
    });
  };

  const setElementSelected = (itemId) => {
    dispatch({
      type: "setElementSelected",
      payload: itemId,
    });
  };

  const removeElementSelected = () => {
    dispatch({ type: "removeElementSelected" });
  };

  useEffect(() => {
    dispatch({ type: "resizeElements" });
  }, [scale]);

  return {
    state: {
      elements: state.mutable,
      elementSelectedId: state.elementSelectedId,
    },
    actions: {
      addElement,
      updateElement,
      setElementSelected,
      removeElementSelected,
    },
  };
}
export default useElementReducer;
