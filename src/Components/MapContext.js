import React, { createContext, useContext, useReducer } from 'react';

// Define action types
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const SET_DIRECTIONS_RESPONSE = 'SET_DIRECTIONS_RESPONSE';
export const SET_DEPARTURE_TIME = 'SET_DEPARTURE_TIME'; // New action type

// Create the context
const MapContext = createContext();

// Define the initial state
const initialState = {
  currentPosition: null,
  directionsResponse: null,
  departureTime: null, // Add departureTime to the initial state
};

// Define the reducer function
const mapReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload,
      };
    case SET_DIRECTIONS_RESPONSE:
      return {
        ...state,
        directionsResponse: action.payload,
      };
    case SET_DEPARTURE_TIME:
      return {
        ...state,
        departureTime: action.payload,
      };
    default:
      return state;
  }
};

// Create the MapProvider component
export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

// Action creators
export const setDepartureTime = (time) => ({
  type: SET_DEPARTURE_TIME,
  payload: time,
});
