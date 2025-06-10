import {Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import React from "react";

export default function Information(){
    return(
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            <section className="village-observation mb-4">
                <div>
                    여기서는 오늘 날씨 해설도 해주고, 특보발령기준 알려주고 그런거 다 한다 마!
                </div>
            </section>
        </Container>

    )
}