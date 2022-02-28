import React, { useState } from 'react'
import 'google-distance-matrix'
import PlacesAutocomplete from './placesAutocomplete'
import GetDistance from './GetDistance'

export default function distanceMatrix() {
    const [latlngFrom, setLatlngFrom] = useState('')
    const [latlngTo, setLatlngTo] = useState('')
    var dist =0 
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
            <GetDistance latlngFrom={latlngFrom} latlngTo={latlngTo} check={false} />
        </>
    )
}
