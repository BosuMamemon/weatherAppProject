import {Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import React from "react";
import KoreaWeatherMap from "../component/KoreaWeatherMap.jsx";

export default function WeatherMap(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <div>
                    <KoreaWeatherMap />
                </div>
            </section>
        </Container>

    )
}