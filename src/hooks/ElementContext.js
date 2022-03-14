import { createContext } from "react";
import useElementReducer from "./useElementReducer";

const ElementContext = createContext(undefined);
const ElementDispatchContext = createContext(undefined);

function ElementProvider({ children }) {
  const { state, actions } = useElementReducer();
  console.log(state);
  return (
    <ElementContext.Provider value={state}>
      <ElementDispatchContext.Provider value={actions}>
        {children}
      </ElementDispatchContext.Provider>
    </ElementContext.Provider>
  );
}

export { ElementProvider, ElementContext, ElementDispatchContext };
