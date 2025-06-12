import React from 'react';
import Header from '../component/Header';
import VillageObservation from '../component/villageobservasion/VillageObservation';
import ShortTermForecast from '../component/villageobservasion/ShortTermForecast';

import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import VideoFrames from "../component/videoFramsData/VideoFrames.jsx";
import useWeatherStore from "../store/useWeatherStore.jsx";
import VeryShortTermForecast from "../component/villageobservasion/VeryShortTermForecast.jsx"; // 추가 스타일링이 있다면 여기에 작성

export default function Home() {
    const {willBeRaining} = useWeatherStore(state => state.states);

    const now = new Date();
    now.setMinutes(now.getMinutes() - 10); // 10분 전으로 이동
    now.setMinutes(Math.floor(now.getMinutes() / 10) * 10); // 분 단위 버림 (ex. 37 -> 30)

    const startTime = now.getHours() * 60 + now.getMinutes();

    if(willBeRaining) return (
        <Container fluid className="home-page py-4 px-3">
            {/* 헤더 */}
            <header className="mb-4">
                <Header />
            </header>

            {/* 초단기 예보 정보 */}
            <section>
                <VeryShortTermForecast />
            </section>

            {/* 실황 정보: 위치/기온/비교/미세먼지 */}
            <section className="village-observation mb-4">
                <VillageObservation />
            </section>

            {/* 실황 지도 및 영상 */}
            <section className="live-weather-map-section mb-4">
                <Row className="g-3">
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={''}
                                                            videoTitle={'초단기예보'} /></Col>
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={'/api/video/downloadRadarFrames'}
                                                            videoTitle={'레이더영상'}/></Col>
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={'/api/video/downloadSatelliteFrames'}
                                                            videoTitle={'위성영상'} /></Col>
                </Row>
            </section>

            {/* 시간대별 예보 */}
            <section className="VSTForecast-section">
                <ShortTermForecast />
            </section>
        </Container>
    )

    else return (
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
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={'/api/video/downloadVSTFFrames'}
                                                            videoTitle={'초단기예보'} startTime={startTime} FrameTerm={10} /></Col>
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={'/api/video/downloadRadarFrames'}
                                                            videoTitle={'레이더영상'} startTime={0} FrameTerm={5}/></Col>
                    <Col xs={12} sm={6} md={4}><VideoFrames videoUrl={'/api/video/downloadSatelliteFrames'}
                                                            videoTitle={'위성영상'} startTime={9*60} FrameTerm={2}/></Col>
                </Row>
            </section>

            {/* 시간대별 예보 */}
            <section className="VSTForecast-section">
                <ShortTermForecast />
            </section>
        </Container>
    )
}
