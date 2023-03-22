import React from 'react';
import {FullscreenControl, GeolocationControl, Map, Placemark, SearchControl, YMaps} from "react-yandex-maps";
import "../Maps/maps.scss"

const Maps = () => {

    return (
        <YMaps>
            <div className="maps">
                <Map defaultState={{
                    center: [42.875968, 74.603691],
                    zoom: 16,
                    controls:[]
                }} className="maps">
                    <Placemark geometry={[42.875968, 74.603691]}/>
                    <SearchControl options={{
                        float: 'left'
                    }} />
                    <GeolocationControl options={{
                        float: 'left'
                    }} />
                    <FullscreenControl />
                </Map>
            </div>
        </YMaps>
    );
};

export default Maps;