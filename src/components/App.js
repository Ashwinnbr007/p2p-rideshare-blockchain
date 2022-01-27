import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Rideshare from '../abis/rideshare.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Navbar';
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('No metamask, try again!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    // console.log(web3.eth.MyAccounts)
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Rideshare.networks[networkId]
    if(networkData) {
      const rideshare = web3.eth.Contract(Rideshare.abi, networkData.address)
      this.setState({ rideshare })
      const rideCount = await rideshare.methods.rideCount().call()
      this.setState({ rideCount })
      // Load rides
      for (var i = 1; i <= rideCount; i++) {
        const rides = await rideshare.methods.riders(i).call()
        this.setState({
          rides: [...this.state.rides, rides]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('rideshare contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      rideCount: 0,
      rides: [],
      loading: true
    }
    this.rideAdded = this.rideAdded.bind(this)
    this.rideCompleted = this.rideCompleted.bind(this)
  }

  rideAdded(from, to, price) {
    this.setState({ loading: true })
    this.state.rideshare.methods.createRide(from, to, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  rideCompleted(id, price) {
    this.setState({ loading: true })
    this.state.rideshare.methods.completeRide(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <NavBar account = {this.state.account} />
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  rides={this.state.rides}
                  rideAdded={this.rideAdded}
                  rideCompleted={this.rideCompleted} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
