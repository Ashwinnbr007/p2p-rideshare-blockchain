import React, { Component } from 'react';
import Autocomp from './placesAutocomplete'


class Main extends Component {

  render() {
    let rideNumber = 1;
    return (
      <div id="content">
        <h1 className='text-center'><b>Add <b>Rydes</b></b></h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.name.value
          const from = document.getElementById('from').value
          const to = document.getElementById('to').value
          const seat = this.inp_seat.value
          const fare = window.web3.utils.toWei(this.rideFare.value.toString(), 'Ether')
          this.props.rideAdded(name, from, to, fare, seat)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="name"
              type="string"
              ref={(input) => { this.name = input }}
              className="form-control"
              placeholder="Driver Name"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <Autocomp placeHold={'from'} />
          </div>

          <div className="form-group mr-sm-2">
            <Autocomp placeHold={'to'} />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="inp_seat"
              type="number"
              min='1'
              ref={(input) => { this.inp_seat = input }}
              className="form-control"
              placeholder="No of seats"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="rideFare"
              type="text"
              ref={(input) => { this.rideFare = input }}
              className="form-control"
              placeholder="Ride Fare"
              required />
          </div>
          <button type="submit"
            className="btn btn-dark"
            onClick={(event) => {
              rideNumber += 1
              console.log(rideNumber)
            }} >
            Add Ride
          </button>
        </form>
        <p>&nbsp;</p>
        {/* <add Distance Matrix API> */}
        <h2>Check Current Rides Available</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Start</th>
              <th scope="col">Destination</th>
              <th scope="col">Fare</th>
              <th scope="col">Name</th>
              <th scope="col">Block address</th>
              <th scope="col">Seats</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="rideList">
            {this.props.rides.map((rides, key) => {
              let availableSeats = window.web3.utils.hexToNumber(rides.seats.toString())
              if (availableSeats) {
                return (
                  <tr key={key}>
                    <td scope="row"><b>{rideNumber++}</b></td>
                    <td>{rides.from}</td>
                    <td>{rides.to}</td>
                    <td>{window.web3.utils.fromWei(rides.fare.toString(), 'Ether')} Eth</td>
                    <td>{rides.name}</td>
                    <td>{rides.owner}</td>
                    <td>{availableSeats}</td>
                    <td>
                      {
                        <button
                          name={rides.id}
                          value={rides.fare}
                          onClick={(event) => {
                            this.props.rideCompleted(event.target.name, event.target.value)
                            availableSeats -= 1
                            rideNumber -= 1
                          }}
                        >
                          Purchase Ride
                        </button>
                      }
                    </td>
                  </tr>
                )
              }
              else {
                return (
                  <div>
                  </div>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
