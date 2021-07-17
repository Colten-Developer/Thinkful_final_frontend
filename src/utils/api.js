/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
//thinkful provided fetchJson

async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}




/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

//thinkful provided list reservations
/*
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  console.log(url)
  return await fetchJson(`${API_BASE_URL}/reservations`, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}
*/

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//export asycn fucntion listreverstionColtne
/*
async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.status < 200 || response.status > 399) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
  }
}
*/


export async function listReservations(signal) {
  const url = `${API_BASE_URL}/reservations`;
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`
  return await fetchJson(url, {signal})
}

export async function listReservationsByDate(params, signal) {
  const url = `${API_BASE_URL}/reservations?date=${params}`
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function createReservation(reservation, signal) {
  reservation.people = Number(reservation.people)
  reservation.status = 'booked'
  let formatReservation = {data: reservation}
  const url = `${API_BASE_URL}/reservations`
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(formatReservation),
    signal,
  };
  return await fetchJson(url, options)
}

export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url, { headers, signal }, [])
}

export async function createTable(table, signal) {
  let formatTable = {data: table}
  const url = `${API_BASE_URL}/tables`
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(formatTable),
    signal,
  };
  return await fetchJson(url, options)
}

export async function updateTableOccupation(table, reservation_id, signal) {
  table.reservation_id = reservation_id

  let data = {data: {reservation_id: reservation_id}}
  const url = `${API_BASE_URL}/tables/${table.table_id}/seat`
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
    signal,
  }
  return await fetchJson(url, options)
}

export async function freeTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

export async function updateReservationStatus(updatedReservation, signal) {
  let reservation_id = updatedReservation.reservation_id
  updatedReservation.status = 'cancelled'

  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  let data = {data: {status: 'cancelled'}}
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
    signal,
  }
  return await fetchJson(url, options)
}

export async function updateReservation(updatedReservation, signal){
  let reservation_id = updatedReservation.reservation_id
  let data = {data: updatedReservation}
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
    signal,
  }
  return await fetchJson(url, options)
}
