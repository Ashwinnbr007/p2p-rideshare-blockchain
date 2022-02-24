pragma solidity ^0.5.0;

contract rideshare {
    string public name;
    uint public rideCount = 0;
    mapping(uint => ride) public riders;

    struct ride {
        uint id;
        string from;
        string to;
        uint fare;
        uint seat;
        address payable owner;
        bool rideCompleted;
    }

    event rideAdded(
        uint id,
        string from,
        string to,
        uint fare,
        uint seat,
        address payable owner,
        bool rideCompleted
    );

    event rideCompleted(
        uint id,
        string from,
        string to, 
        uint fare,
        uint seat,
        address payable owner,
        bool rideCompleted
    );

    constructor() public {
        name = "rideshare";
    }

    function createRide(string memory _from, string memory _to, uint _price, uint _seat) public {
        require(bytes(_from).length > 0);
        require(bytes(_to).length > 0);
        require(_price > 0);
        require(_seat > 0);
        rideCount ++;
        riders[rideCount] = ride(rideCount, _from, _to, _price, _seat, msg.sender, false);
        emit rideAdded(rideCount, _from, _to, _price, _seat, msg.sender, false);
    }

    function completeRide(uint _id) public payable {
        // find the ride
        ride memory _ride = riders[_id];
        // find the owner
        address payable _rider = _ride.owner;
        //validate id
        require(_ride.id > 0 && _ride.id <= rideCount);
        // check balance amt 
        require(msg.value >= _ride.fare);
        //check ride has not been completed already
        require(!_ride.rideCompleted);
        //rider cannot purchase the ride
        require(_rider != msg.sender);
        // Mark as rideCompleted
        _ride.rideCompleted = true;
        // Update the ride
        riders[_id] = _ride;
        //updating the number of seats
        _ride.seat = _ride.seat-1;
        //pay the rider
        address(_rider).transfer(msg.value);
        // trigger the event
        emit rideCompleted(rideCount, _ride.from, _ride.to, _ride.fare, _ride.seat, msg.sender, true);
    }
}