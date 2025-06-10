import React from 'react';
import Header from '../component/Header';
import VillageObservation from '../component/villageobservasion/VillageObservation';
import RadarCompositeFrames from '../component/videoFramsData/RadarCompositeFrames';
import SatelliteRgbFrames from '../component/videoFramsData/SatelliteRgbFrames';
import VsrfRgbFramesList from '../component/videoFramsData/VsrfRgbFramesList';
import ShortTermForecast from '../component/villageobservasion/ShortTermForecast';

import { Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // 추가 스타일링이 있다면 여기에 작성

export default function Home() {
    return (
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            {/* 실황 정보: 위치/기온/비교/미세먼지 */}
            <section className="village-observation mb-4">
                <VillageObservation />
            </section>

            {/* 실황 지도 및 영상 */}
            <section className="live-weather-map-section mb-4">
                <Row className="g-3">
                    <Col md={4}><VsrfRgbFramesList /></Col>
                    <Col md={4}><RadarCompositeFrames /></Col>
                    <Col md={4}><SatelliteRgbFrames /></Col>
                </Row>
            </section>

            {/* 시간대별 예보 */}
            <section className="VSTForecast-section">
                <ShortTermForecast />
            </section>
        </Container>
    );
}
