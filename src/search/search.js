import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { listReservations } from "../utils/api";
import { useState } from 'react';

function SearchNumber() {

    
    const [reservations, setReservations] = useState([])
    const [searchedReservations, setSearchedReservations] = useState([])
    const [search, setSearch] = useState({})
    let reservationItem

    const history = useHistory()

    useEffect(() => {
        listReservations()
          .then((response) => setReservations(response));
      }, []);

    function handleChange(event) {
        setSearch({
            [event.target.name]: event.target.value
        })
    }

    function formHandler(event) {
        event.preventDefault()
        setSearchedReservations(reservations.filter((reservation) => reservation.mobile_number.includes(search.search)))
        /*
        setSearchedReservations(reservations.filter((reservation) => {
            if(reservation.mobile_number.includes(search.search)){
                return reservation
            }
        })
        )
        */
    }
    function editPage(reservation_id) {
        history.push(`/reservations/${reservation_id}/edit`)
      }

    reservationItem = searchedReservations.map((reservation) => {
        return (
            <div key={reservation.reservation_id}>
                <h4>{`${reservation.last_name}, ${reservation.first_name}`}</h4>
                <p>Mobile Number, People, Date, Time</p>
                <p>{`${reservation.mobile_number}, ${reservation.people}, ${reservation.reservation_date}, ${reservation.reservation_time}`}</p>
                <button
          onClick={() => editPage(reservation.reservation_id)}
          style={reservation.status === 'booked' ? {opacity: 100} : {opacity: 0}}
          >Edit</button>
            </div>
        )
    })
    

    return (
        <main>
            <div>
                <h1>Search</h1>
                <form>
                    <label htmlFor="search">
                        Search By Number
                    </label>
                    <br />
                        <input
                            id="search"
                            type = 'text'
                            name='search'
                            value={search.phoneNumber}
                            placeholder='###-###-####'
                            onChange={handleChange}
                            />
                </form>
                <button onClick={formHandler}>
                    Submit
                </button>
            </div>
            <div>
                {reservationItem}
            </div>
        </main>
    )
}

export default SearchNumber