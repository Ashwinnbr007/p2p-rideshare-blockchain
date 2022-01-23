import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Rides</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const from = this.from.value
          const to = this.to.value
          const fare = window.web3.utils.toWei(this.rideFare.value.toString(), 'Ether')
          this.props.rideAdded(from, to, fare)
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
              id="rideFare"
              type="text"
              ref={(input) => { this.rideFare = input }}
              className="form-control"
              placeholder="Ride Fare"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Ride</button>
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
              <th scope="col">Name/Address</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="rideList">
            { this.props.rides.map((rides, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{rides.id.toString()}</th>
                  <td>{rides.from}</td>
                  <td>{rides.to}</td>
                  <td>{window.web3.utils.fromWei(rides.fare.toString(), 'Ether')} Eth</td>
                  <td>{rides.owner}</td>
                  <td>
                    { !rides.rideCompleted
                      ? <button
                          name={rides.id}
                          value={rides.fare}
                          onClick={(event) => {
                            this.props.rideCompleted(event.target.name, event.target.value)
                          }}
                        >
                          Purchase Ride
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
