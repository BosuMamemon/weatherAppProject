import useWeatherStore from "../store/useWeatherStore.jsx";
import React, {useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ParticulateMatter(){
    const {location, particulateMatter, setPM} = useWeatherStore();

    useEffect(() => {
        if(!location.x || !location.y) return;

        const fetchPM = async () => {
            try {
                const response = await axios.post('/api/weather/pm', JSON.parse(JSON.stringify(location)));
                setPM(response.data);
            } catch (e) {
                console.error('미세먼지 정보 데이터 페치 실패:', e);
            }
        }

        fetchPM();
    }, [location, setPM]);

    // 등급에 따른 색상과 상태 텍스트 반환
    const getGradeInfo = (grade) => {
        switch(grade) {
            case '1': return { color: 'success', text: '좋음', icon: '😊' };
            case '2': return { color: 'primary', text: '보통', icon: '😐' };
            case '3': return { color: 'warning', text: '나쁨', icon: '😷' };
            case '4': return { color: 'danger', text: '매우나쁨', icon: '😨' };
            default: return { color: 'secondary', text: '-', icon: '❓' };
        }
    };

    // 대기질 항목 정보
    const airQualityItems = [
        {
            key: 'pm10',
            name: 'PM10',
            fullName: '미세먼지',
            unit: 'μg/m³',
            grade: particulateMatter.pm10Grade,
            value: particulateMatter.pm10Value,
            icon: 'bi-cloud-haze'
        },
        {
            key: 'pm25',
            name: 'PM2.5',
            fullName: '초미세먼지',
            unit: 'μg/m³',
            grade: particulateMatter.pm25Grade,
            value: particulateMatter.pm25Value,
            icon: 'bi-cloud-haze2'
        },
        {
            key: 'o3',
            name: 'O₃',
            fullName: '오존',
            unit: 'ppm',
            grade: particulateMatter.o3Grade,
            value: particulateMatter.o3Value,
            icon: 'bi-shield-check'
        },
        {
            key: 'no2',
            name: 'NO₂',
            fullName: '이산화질소',
            unit: 'ppm',
            grade: particulateMatter.no2Grade,
            value: particulateMatter.no2Value,
            icon: 'bi-exclamation-triangle'
        },
        {
            key: 'co',
            name: 'CO',
            fullName: '일산화탄소',
            unit: 'ppm',
            grade: particulateMatter.coGrade,
            value: particulateMatter.coValue,
            icon: 'bi-cloud-fog'
        },
        {
            key: 'so2',
            name: 'SO₂',
            fullName: '아황산가스',
            unit: 'ppm',
            grade: particulateMatter.so2Grade,
            value: particulateMatter.so2Value,
            icon: 'bi-cloud-lightning'
        }
    ];

    return(
        <Container fluid className="py-4 px-3">
            {/* 헤더 섹션 */}
            <section className="mb-4">
                <div className="text-center mb-4">
                    <h2 className="mb-3">
                        <i className="bi bi-lungs me-2 text-primary"></i>
                        미세먼지 현황
                    </h2>
                    <p className="text-muted">현재 지역의 실시간 대기질 상태를 확인하세요.</p>
                </div>
            </section>

            {/* 대기질 카드 그리드 */}
            <section className="air-quality-section">
                <Row className="g-3 justify-content-center">
                    {airQualityItems.map((item) => {
                        const gradeInfo = getGradeInfo(item.grade);
                        return (
                            <Col xs={6} sm={4} md={3} lg={2} xl={2} key={item.key} style={{minWidth: '170px'}}>
                                <Card className="h-100 shadow-sm border-0 air-quality-card">
                                    <Card.Body className="text-center p-3" style={{minHeight: '190px'}}>
                                        {/* 아이콘 */}
                                        <div className="mb-2">
                                            <i className={`${item.icon} text-${gradeInfo.color}`} 
                                               style={{fontSize: '2.2rem'}}></i>
                                        </div>
                                        
                                        {/* 항목명 */}
                                        <h6 className="card-title mb-1 fw-bold" style={{fontSize: '1rem'}}>
                                            {item.name}
                                        </h6>
                                        <small className="text-muted d-block mb-2" style={{
                                            fontSize: '0.8rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.fullName}
                                        </small>
                                        
                                        {/* 수치 */}
                                        <div className="mb-2">
                                            <div className="fw-bold text-dark" style={{fontSize: '1.3rem'}}>
                                                {item.value || '-'}
                                            </div>
                                            <small className="text-muted" style={{fontSize: '0.75rem'}}>
                                                {item.unit}
                                            </small>
                                        </div>
                                        
                                        {/* 등급 배지 */}
                                        <span className={`badge bg-${gradeInfo.color} rounded-pill px-2 py-1`} 
                                              style={{fontSize: '0.75rem', whiteSpace: 'nowrap'}}>
                                            <span className="me-1">{gradeInfo.icon}</span>
                                            {gradeInfo.text}
                                        </span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </section>

            {/* 안내 메시지 */}
            <section className="mt-4">
                <div className="alert alert-info border-0 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong className="me-3">대기질 등급 안내:</strong>
                            <span className="badge bg-success" style={{fontSize: '0.8rem'}}>😊 좋음</span>
                            <span className="badge bg-primary" style={{fontSize: '0.8rem'}}>😐 보통</span>
                            <span className="badge bg-warning" style={{fontSize: '0.8rem'}}>😷 나쁨</span>
                            <span className="badge bg-danger" style={{fontSize: '0.8rem'}}>😨 매우나쁨</span>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}