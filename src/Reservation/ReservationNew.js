import React from 'react';
import {useHistory} from "react-router-dom";
import { createReservation } from "../utils/api";
import { useState } from 'react';

function CreateReservation() {
    const initialReservation = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time:'',
        people: ''
    }

    const [reservation, setReservation] = useState({ ...initialReservation })
    const [reservationsError, setReservationsError] = useState([]);
    let reserveError = ''
    const history = useHistory()

    function handleChange(event) {
        setReservation({
            ...reservation,
            [event.target.name]: event.target.value,
        })
    }

    function goHome() {
        history.push('/')
      }

    async function formHandler(event) {
        event.preventDefault()
        await createReservation(reservation)
            .then((response) => {
                setReservation({ ...initialReservation })
                goHome()
            })
            .catch((error) => {
                setReservationsError(error)
                reserveError = error
                //window.location.reload(false)
                
            })
       setReservationsError(reserveError)
    }
    
    return (
        <div>
            <form>
                <label htmlFor="first_name">
                    First Name
                </label>
                <br />
                    <input
                      id="first_name"
                      type="text"
                      name="first_name"
                      value={reservation.first_name}
                      placeholder='First Name'
                      onChange={handleChange}
                      />
            </form>
            <form>
                <label htmlFor="last_name">
                    Last Name
                </label>
                <br />
                    <input
                      id="last_name"
                      type="text"
                      name="last_name"
                      value={reservation.last_name}
                      placeholder='Last Name'
                      onChange={handleChange}
                      />
            </form>
            <form>
                <label htmlFor="mobile_number">
                    Mobile Number
                </label>
                <br />
                    <input
                      id="mobile_number"
                      type="text"
                      name="mobile_number"
                      value={reservation.mobile_number}
                      placeholder='Mobile Number'
                      onChange={handleChange}
                      />
            </form>
            <form>
                <label htmlFor="reservation_date">
                    Reservation Date
                </label>
                <br />
                    <input
                      id="reservation_date"
                      type="text"
                      name="reservation_date"
                      value={reservation.reservation_date}
                      placeholder='YYYY-MM-DD'
                      onChange={handleChange}
                      />
            </form>
            <form>
                <label htmlFor="reservation_time">
                    Reservation Time
                </label>
                <br />
                    <input
                      id="reservation_time"
                      type="text"
                      name="reservation_time"
                      value={reservation.reservation_time}
                      placeholder='Reservation Time'
                      onChange={handleChange}
                      />
            </form>
            <form>
                <label htmlFor="reservation_time">
                    People
                </label>
                <br />
                    <input
                      id="people"
                      type="text"
                      name="people"
                      value={reservation.people}
                      placeholder='Number of people'
                      onChange={handleChange}
                      />
            </form>
            <button onClick={goHome}>
                Cancel
            </button>
            <button onClick={formHandler}>
                Submit
            </button>
            <div 
            style={reservationsError.message ? {opacity: 100} : {opacity: 0}}
            className='alert alert-danger'
            >
            <h4>{`There is an error: ${reservationsError.message}`}</h4>
            </div>
        </div>
    )
}

export default CreateReservation