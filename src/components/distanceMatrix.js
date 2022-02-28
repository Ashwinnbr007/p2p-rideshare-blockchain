import React, { useState } from 'react'
import 'google-distance-matrix'
import PlacesAutocomplete from './placesAutocomplete'

function rideDistance(latlngFrom, latlngTo) {
    // console.log(latlngFrom, latlngTo)
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
    var d = R * c; // Distance in km
    console.log(d)
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

export default function distanceMatrix() {
    const [latlngFrom, setLatlngFrom] = useState('')
    const [latlngTo, setLatlngTo] = useState('')
    return (
        <>
            <div className="form-group mr-sm-2">
                <PlacesAutocomplete
                    placeHold={'from'}
                    handleLatLng={latlngFrom => setLatlngFrom(latlngFrom)}
                />
            </div>
            <div className="form-group mr-sm-2">
                <PlacesAutocomplete
                    placeHold={'to'}
                    handleLatLng={latlngTo => setLatlngTo(latlngTo)}
                />
            </div>
            <button
                type='button'
                className="btn btn-dark"
                onClick={() =>{
                        return(
                            <div>
                                {rideDistance(latlngFrom,latlngTo)}
                            </div>
                        )
                    }
                }>
                Get approximate cost
            </button>
            <br></br>
        </>
    )
}
