import './App.css';
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import React, {useEffect, useState} from 'react'
import {REACT_MAP_BOX} from "./api";
import * as parkDate from "../src/data/skateboard-parks.json"
import skatePark from "./skateboarding.svg"

function App() {
    const [viewport, setViewport] = useState({
        latitude: 40.4094976,
        longitude: 49.9253248,
        width: "100vw",
        height: "100vh",
        zoom: 10
    });

    let [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        let listener = e => {
            if (e.key == "Escape") {
                setSelectedPark(null)
            }

        }


        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }


    }, [])


    return (

        <div>
            <ReactMapGL {...viewport} mapboxApiAccessToken={REACT_MAP_BOX}
                        mapStyle="mapbox://styles/tair2000/cknzud9282kuh17pjysw572w9"
                        onViewportChange={viewport => {
                            setViewport(viewport)
                        }}
            >


                {parkDate.features.map((park) => (
                        <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]}
                                longitude={park.geometry.coordinates[0]}>
                            <button className="marker-btn" onClick={e => {
                                e.preventDefault();
                                setSelectedPark(park)
                            }}>
                                <img src={skatePark} alt=""/>

                            </button>
                        </Marker>
                    )
                )}

                {selectedPark ? (
                    <Popup longitude={selectedPark.geometry.coordinates[0]}
                           latitude={selectedPark.geometry.coordinates[1]}
                           onClose={() => {
                               setSelectedPark(null)
                           }}>

                        <div>
                            <h2>
                                {selectedPark.properties.NAME}
                            </h2>
                            <p>
                                {selectedPark.properties.DESCRIPTIO}
                            </p>
                        </div>


                    </Popup>
                ) : null}

            </ReactMapGL>

        </div>

    );
}

export default App;
