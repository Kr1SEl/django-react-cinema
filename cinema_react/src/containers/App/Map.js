import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = (props) => {
    // Set your initial map coordinates and zoom level
    const position = props.location || [51.505, -0.09];
    const zoom = 13;
    const apiKey = 'dH89mwBmNVTAojAhVjN08Z26hmuSkZAIsk0HKz4HNwBQsKQs3HWs6SR09L0SG31C';

    return (
        <MapContainer center={position} zoom={zoom} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url={`https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=${apiKey}`}
                attribution='&copy; <a href="https://www.jawg.io" target="_blank" rel="noopener noreferrer">Jawg</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Sky Tower - Wrocław, Powstańców Śląskich 95
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;