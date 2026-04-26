/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Order } from "../components/UI/Table/tableTypes";

export interface MonthlyRange {
  start_date: string;
  end_date: string;
}

export interface DashboardState {
  search: string;
  sectionFilter: string;
  statusFilter: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: Order;
  monthlyRange?: MonthlyRange;
}

export type DashboardAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SECTION_FILTER"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_MONTHLY_RANGE"; payload: MonthlyRange }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_SORT"; payload: { sortBy: string; sortDirection: Order } }
  | { type: "RESET" };

const initialState: DashboardState = {
  search: "",
  sectionFilter: "",
  statusFilter: "",
  page: 1,
  pageSize: 10,
  sortBy: "",
  sortDirection: "asc",
  monthlyRange: undefined,
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, page: 1 };
    case "SET_SECTION_FILTER":
      return { ...state, sectionFilter: action.payload, page: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload, page: 1 };
    case "CLEAR_FILTERS":
      return {
        ...state,
        search: "",
        sectionFilter: "",
        statusFilter: "",
        page: 1,
        sortBy: "",
        sortDirection: "asc",
      };
    case "SET_MONTHLY_RANGE":
      return { ...state, monthlyRange: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, page: 1 };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
        page: 1,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface DashboardContextValue {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
}
