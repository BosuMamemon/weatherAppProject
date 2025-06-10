import {Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import React from "react";

export default function WeatherMap(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <div>
                    마! 여기서 날씨검색하고 싶은 도시 지도에서 골라 찍으바라.
                </div>
            </section>
        </Container>


    )
}