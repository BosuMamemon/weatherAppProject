import Header from "../component/Header.jsx";
import {Container} from "react-bootstrap";
import React from "react";
import ParticulateMatter from "../component/ParticulateMatter.jsx";

export default function EnvironIndex(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <ParticulateMatter/>
            </section>
        </Container>

    )
}