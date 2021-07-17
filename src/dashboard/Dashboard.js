import React, { useEffect, useState } from "react";
import { listReservationsByDate, listTables, freeTable, updateReservationStatus } from "../utils/api";
import {useHistory} from "react-router-dom";
//import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reloadWithTodaysDate, reloadWithPreviousDate, reloadWithNextDate}) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    listReservationsByDate(date)
      .then((response) => setReservations(response));
  }, [date]);

  useEffect(() => {
    listTables()
      .then((response) => setTables(response))
  }, [])

  async function seatTheTable(reservation_id) {
    history.push(`/reservations/${reservation_id}/seat`)
  }

  function finishTableHandler(tableId) {
    if (window.confirm('Finish this table?')) {
      freeTable(tableId).then((response) => {
        tables.forEach((table) => {
          if(table.table_id === response.table_id){
            Object.assign(table, response)
          }
        })
      })
      setTables(tables)
      window.location.reload(false);
    }
  }

  function editPage(reservation_id) {
    history.push(`/reservations/${reservation_id}/edit`)
  }

  function cancelReservationHandler(reservation) {
    //todo make cancel reservations work
    
    if (window.confirm('Cancel this reservation?')) {
      reservation.status = 'cancelled'
      updateReservationStatus(reservation)
        .then((response) => {
          reservations.forEach((reservation) => {
            if(reservation.reservation_id === response.reservation_id){
              Object.assign(reservation, response)
            }
          })
        })
        setReservations(reservations)
        window.location.reload(false);
    }
    
  }


  const reservationItem = reservations.map((reservation) => (
    <div key={reservation.reservation_id}>
      <div>
        <h4>{`${reservation.last_name}, ${reservation.first_name}`}</h4>
        <h5>{`Status: ${reservation.status}`}</h5>
        <p>Mobile Number, People, Date, Time</p>
        <p>{`${reservation.mobile_number}, ${reservation.people}, ${reservation.reservation_date}, ${reservation.reservation_time}`}</p>
        <button
          onClick={() => editPage(reservation.reservation_id)}
          style={reservation.status === 'booked' ? {opacity: 100} : {opacity: 0}}
          >Edit</button>
          <button
          onClick={() => cancelReservationHandler(reservation)}
          data-reservation-id-cancel={reservation.reservation_id}
          >Cancel</button>
          <button
          onClick={() => seatTheTable(reservation.reservation_id)}
          style={reservation.status === 'booked' ? {opacity: 100} : {opacity: 0}}
          >Seat</button>
      </div>
    </div>
  ))

  const tableList = tables.map((table) => {
    let tableStatus = ''
    if(table.reservation_id) {
      tableStatus = 'Occupied'
    }else {
      tableStatus = 'Free'
    }
    return (
      <div className = 'row' key={table.table_id}>
        <div className="col-md-5" data-table-id-status={table.table_id}>
        <h4>
          {`${table.table_name}`}
        </h4>
        </div>
        <div className="col-md-2">
        <h4>
          {`${table.capacity}`}
        </h4>
        </div>
        <div className="col-md-3">
        <h4>
          {`${tableStatus}`}
        </h4>
        </div>
        <div 
        className="col-md-2"
        style={tableStatus === 'Occupied' ? {opacity: 100} : {opacity: 0}}
        data-table-id-finish={table.table_id}
        >
          <button onClick={() => finishTableHandler(table.table_id)}>
            Finish Table
          </button>
        </div>
      </div>
    )
  })

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3>{`Reservations for ${date}`}</h3>
            <button
                onClick={() => reloadWithPreviousDate()}
                >Previous</button>
            <button
                onClick={() => reloadWithTodaysDate() }
                >Today</button>
            <button
                onClick={() => reloadWithNextDate()}
                >Next</button>
            <br />
            <h3>Last Name, First Name</h3>
            {reservationItem}
            <br />
          </div>
          <br />
          <div className="col-md-6">
            <h3>{`Tables`}</h3>
            <h3>
              Table Name, Capacity, Status
            </h3>
            {tableList}
            <br />
          </div>
        </div>
      </div>
    </main>
  )
  
 /*
 return (
   <main>
     <div className="row mb-5">div 1
        <div className= 'col mb-5'>div 2</div>
        <div className= 'col mb-5'>div 4</div>
        <div className= 'col mb-5'>div 6</div>
     </div>
   </main>
 )
 */
}

export default Dashboard;
