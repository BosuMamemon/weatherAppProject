import {Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import React from "react";
import AddressLookup from "../component/AddressSelector.jsx";

export default function Information(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <AddressLookup />
            </section>
        </Container>

    )
}