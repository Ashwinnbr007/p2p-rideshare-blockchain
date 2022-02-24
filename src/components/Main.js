import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1><b>Add Rydes</b></h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const from = this.from.value
          const to = this.to.value
          const seat = this.inp_seat.value
          const fare = window.web3.utils.toWei(this.rideFare.value.toString(), 'Ether')
          this.props.rideAdded(from, to, fare, seat)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="from"
              type="text"
              ref={(input) => { this.from = input }}
              className="form-control"
              placeholder="from"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="to"
              type="text"
              ref={(input) => { this.to = input }}
              className="form-control"
              placeholder="To"
              required />
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
          <button type="submit" className="btn btn-dark">Add Ride</button>
        </form>
        <p>&nbsp;</p>
        <h2>Check Current Rides Available</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Start</th>
              <th scope="col">Destination</th>
              <th scope="col">fare</th>
              <th scope="col">Address</th>
              <th scope="col">Seats</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="rideList">
            {this.props.rides.map((rides, key) => {
              let availableSeats = window.web3.utils.hexToNumber(rides.seats.toString())
              console.log(availableSeats)
              if (availableSeats)
              {return (
                <tr key={key}>
                  <th scope="row">{rides.id.toString()}</th>
                  <td>{rides.from}</td>
                  <td>{rides.to}</td>
                  <td>{window.web3.utils.fromWei(rides.fare.toString(), 'Ether')} Eth</td>
                  <td>{rides.owner}</td>
                  <td>{window.web3.utils.hexToNumber(rides.seats.toString())}</td>
                  <td>
                    {!rides.rideCompleted
                      ? <button
                        name={rides.id}
                        value={rides.fare}
                        onClick={(event) => {
                          this.props.rideCompleted(event.target.name, event.target.value)
                          availableSeats-=1
                          console.log(availableSeats)
                        }}
                      >
                        Purchase Ride
                      </button>
                      : null
                    }
                  </td>
                </tr>
              )}
              else {
                return(
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
