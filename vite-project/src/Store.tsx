import React from "react";
import { UserInfo } from "./types/UserInfo";
import { EventsInfo } from "./types/EventsInfo";

type AppState = {
  mode: string;
  userInfo?: UserInfo;
  event?: EventsInfo;
};

const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,

  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  event: localStorage.getItem("event")
    ? JSON.parse(localStorage.getItem("event")!)
    : {},
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "EVENT_UPLOAD"; payload: EventsInfo }
  | { type: "USER_SIGNOUT" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
      };
    case "EVENT_UPLOAD":
      return { ...state, event: action.payload };
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
