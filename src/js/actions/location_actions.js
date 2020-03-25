import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = "http://localhost:3001";

async function searchLocations(token) {
  const response = await fetch(
    `${api_url}/location_search?latitude=45.5419799&longitude=122.6486`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return await response;
}

async function callPracticeLocations(token, practiceId) {
  const response = await fetch(`${api_url}/practices/${practiceId}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response;
}

function requestLocations() {
  return { type: REQUEST_LOCATIONS };
}

function receiveLocations(json) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: json,
    RECEIVEdAt: Date.now()
  };
}

export function addLocation(payload) {
  return { type: ADD_LOCATION, payload };
}

export function fetchLocations(type, practiceId) {
  return dispatch => {
    dispatch(requestLocations());
    var token = localStorage.auth_token;
    let callToMake = (function(callType) {
      switch (callType) {
        case "practice":
          return callPracticeLocations;
        case null:
        default:
          return searchLocations;
      }
    })(type);
    return callToMake(token, practiceId)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLocations(json));
      });
  };
}
