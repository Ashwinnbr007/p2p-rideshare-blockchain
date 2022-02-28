import React, { useState } from 'react'

export default function rideDistance({ latlngFrom, latlngTo, check }) {
    // console.log(latlngFrom, latlngTo)
    const [d, setD] = useState(0)
    var lat1 = latlngFrom.lat
    var lat2 = latlngTo.lat
    var lon1 = latlngFrom.lng
    var lon2 = latlngTo.lng

    var R = 6378.1; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dist = R * c;
    var rideCost = dist*0.66*0.00038 //setting per km cost at 50Rupees
    const handleClick = () => {
        console.log(dist)
        window.alert('Approx cost will be : ' + Math.round(dist)+ ' Kilometers \n Reccomended cost = ' + rideCost.toFixed(5) + ' ETH');
    };

    return (
        <div>
            <button
                className='btn btn-outline-success'
                type='button'
                onClick={handleClick}
            >
                Get Approximate Distance
            </button>
        </div>
    )

}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
