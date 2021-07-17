import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";

function EditReservation() {
    const initialReservation = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time:'',
        people: ''
    }

    const [reservation, setReservation] = useState({ ...initialReservation })
    //const [reservationId, setReservationId] = useState()
    const {reservation_id} = useParams()
    const [reservationId, setReservationId] = useState(reservation_id)
    const history = useHistory()
    //setReservationId(reservation_id)
    
/*
    useEffect(() => {
        readReservation(reservation_id)
          .then((response) => setReservation(response));
      }, [reservation_id]);
      */
      useEffect(() => {
        readReservation(reservationId)
          .then((response) => setReservation(response));
      }, [reservationId]);
      

    function handleChange(event) {
        setReservation({
            ...reservation,
            [event.target.name]: event.target.value,
        })
    }

    const formHandler = (event) => {
        event.preventDefault()
        updateReservation(reservation)
            .then((response) => {
                setReservation({ ...initialReservation })
                goHome()
            })
            .catch((error) => {
                setReservationId(reservation.reservation_id)
            })
    }

    function goHome() {
        history.push('/dashboard')
    }

    return (
        <div>
            <h1>
                Edit Reservation
            </h1>
            <h2>
                Reservation ID: {`${reservation.reservation_id}`}
            </h2>
            <form>
                <label htmlFor='first_name'>
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
        </div>
    )
}

export default EditReservation