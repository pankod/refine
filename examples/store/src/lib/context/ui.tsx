import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useMemo,
} from "react";
import { ThemeProvider } from "next-themes";

export interface State {
  displaySidebar: boolean;
  displayModal: boolean;
  sidebarView: string;
  modalView: string;
}

export interface ContextType extends State {
  openSidebar: () => void;
  closeSidebar: () => void;
  closeSidebarIfPresent: () => void | false;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (view: MODAL_VIEWS) => void;
  setSidebarView: (view: SIDEBAR_VIEWS) => void;
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  modalView: "LOGIN_VIEW",
  sidebarView: "CART_VIEW",
};

type Action =
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
    }
  | {
      type: "SET_SIDEBAR_VIEW";
      view: SIDEBAR_VIEWS;
    };

type MODAL_VIEWS = "SIGNUP_VIEW" | "LOGIN_VIEW";

type SIDEBAR_VIEWS = "CART_VIEW" | "MOBILE_MENU_VIEW";

export const UIContext = React.createContext<State>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
  }
}

export const UIProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch],
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch],
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch, state.displaySidebar],
  );
  const openModal = useCallback(
    () => dispatch({ type: "OPEN_MODAL" }),
    [dispatch],
  );
  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch],
  );
  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
    [dispatch],
  );
  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: "SET_SIDEBAR_VIEW", view }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
    }),
    [state],
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = (): ContextType => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context as ContextType;
};

export const ManagedUIContext: FC<PropsWithChildren> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
