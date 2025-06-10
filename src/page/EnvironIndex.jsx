import Header from "../component/Header.jsx";
import VillageObservation from "../component/villageobservasion/VillageObservation.jsx";
import {Col, Container, Row} from "react-bootstrap";
import VsrfRgbFramesList from "../component/videoFramsData/VsrfRgbFramesList.jsx";
import RadarCompositeFrames from "../component/videoFramsData/RadarCompositeFrames.jsx";
import SatelliteRgbFrames from "../component/videoFramsData/SatelliteRgbFrames.jsx";
import ShortTermForecast from "../component/villageobservasion/ShortTermForecast.jsx";
import React from "react";

export default function EnvironIndex(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <div>
                    나가면 디짐. 미세먼지, 황사, 오존, 이산화탄소, 아황산가스 다 들이 마실만한 날씨임.
                </div>
            </section>
        </Container>

    )
}