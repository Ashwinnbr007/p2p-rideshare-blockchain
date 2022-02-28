pragma solidity ^0.5.0;

contract rideshare {
    string public name;
    uint public rideCount = 0;
    mapping(uint => ride) public riders;

    struct ride {
        uint id;
        string name;
        string from;
        string to;
        uint fare;
        uint seats;
        address payable owner;
    }

    event rideAdded(
        uint id,
        string name,
        string from,
        string to,
        uint fare,
        uint seats,
        address payable owner
    );

    event rideCompleted(
        uint id,
        string from,
        string to, 
        uint fare,
        uint seats,
        address payable owner
    );

    constructor() public {
        name = "rideshare";
    }

    function createRide(string memory _name, string memory _from, string memory _to, uint _price, uint _seats) public {
        require(bytes(_name).length > 0);
        require(bytes(_from).length > 0);
        require(bytes(_to).length > 0);
        require(_price > 0);
        rideCount ++;
        riders[rideCount] = ride(rideCount,_name, _from, _to, _price, _seats, msg.sender);
        emit rideAdded(rideCount,_name, _from, _to, _price, _seats, msg.sender);
    }

    function completeRide(uint _id) public payable {
        // find the product
        ride memory _ride = riders[_id];
        // find the owner
        address payable _rider = _ride.owner;
        //validate id
        require(_ride.id > 0 && _ride.id <= rideCount);
        // check balance amt 
        require(msg.value >= _ride.fare);
        //rider cannot purchase the ride
        require(_rider != msg.sender);
        //update seats
        _ride.seats = _ride.seats-1;
        // Update the ride
        riders[_id] = _ride;
        //pay the rider
        address(_rider).transfer(msg.value);
        // trigger the event
        emit rideCompleted(rideCount, _ride.from, _ride.to, _ride.fare, _ride.seats, msg.sender);
    }
}