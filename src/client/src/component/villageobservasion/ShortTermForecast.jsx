import {useEffect} from "react";
import useWeatherStore from "../../store/useWeatherStore.jsx";
import axios from "axios";

// 풍향(도)을 화살표로 변환하는 함수
const getWindDirectionArrow = (direction) => {
    if (!direction || direction === '' || direction === '0') return '🔘';
    
    const degree = parseInt(direction);
    
    // 8방위로 구분
    if (degree >= 337.5 || degree < 22.5) return '⬆️'; // 북
    else if (degree >= 22.5 && degree < 67.5) return '↗️'; // 북동
    else if (degree >= 67.5 && degree < 112.5) return '➡️'; // 동
    else if (degree >= 112.5 && degree < 157.5) return '↘️'; // 남동
    else if (degree >= 157.5 && degree < 202.5) return '⬇️'; // 남
    else if (degree >= 202.5 && degree < 247.5) return '↙️'; // 남서
    else if (degree >= 247.5 && degree < 292.5) return '⬅️'; // 서
    else if (degree >= 292.5 && degree < 337.5) return '↖️'; // 북서
    
    return '⬆️'; // 기본값
};

export default function ShortTermForecast() {
    const {location, forecast} = useWeatherStore(state => state.states);
    const {setForecast} = useWeatherStore(state => state.actions);

    useEffect(() => {
        if (!location.x || !location.y) return;

        const fetchForecast = async () => {
            try {
                const response = await axios.post('/api/weather/forecast', JSON.parse(JSON.stringify(location)));
                setForecast(response.data);
            } catch(e) {
                console.error('기상 초단기예보 데이터 페치 실패:', e);
            }
        }

        fetchForecast();
    }, [location, setForecast]);

    return (
        <div className="container-fluid">
            <h2 className="text-center mb-4">단기예보</h2>
            <div className="d-flex justify-content-center">
                <div
                    className="table-container"
                    style={{
                        maxWidth: '90vw',
                        maxHeight: '70vh',
                        overflowX: 'auto',
                        overflowY: 'auto',
                        border: '1px solid #dee2e6',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
                    }}
                >
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark sticky-top">
                            <tr>
                                <th 
                                    style={{
                                        minWidth: '120px',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 2, // tbody보다 높은 z-index
                                        backgroundColor: 'white', // table-dark 색상
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    항목
                                </th>
                                {forecast.map((item, index) => (
                                    <th key={index} style={{minWidth: '80px', fontSize: '0.9rem'}}>
                                        {item.측정날짜.substring(4,6)}/{item.측정날짜.substring(6,8)}<br/>
                                        {item.측정시간.substring(0,2)}:{item.측정시간.substring(2,4)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td 
                                    className="fw-bold" 
                                    style={{
                                        position: 'sticky', 
                                        left: 0, 
                                        zIndex: 1, // 헤더보다 낮은 z-index
                                        backgroundColor: '#f8f9fa',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    기온(°C)
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center">{item.TMP}</td>
                                ))}
                            </tr>
                            <tr>
                                <td 
                                    className="fw-bold" 
                                    style={{
                                        position: 'sticky', 
                                        left: 0, 
                                        zIndex: 1,
                                        backgroundColor: '#ffffff',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    습도(%)
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center">{item.REH}</td>
                                ))}
                            </tr>
                            <tr>
                                <td 
                                    className="fw-bold" 
                                    style={{
                                        position: 'sticky', 
                                        left: 0, 
                                        zIndex: 1,
                                        backgroundColor: '#f8f9fa',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    하늘상태
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center">
                                        {item.SKY === "1" ? "☀️" :
                                         item.SKY === "3" ? "⛅" :
                                         item.SKY === "4" ? "☁️" : item.SKY}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className="fw-bold"
                                    style={{
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 1,
                                        backgroundColor: '#ffffff',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    강수량
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center">
                                        {item.RN1}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className="fw-bold"
                                    style={{
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 1,
                                        backgroundColor: '#f8f9fa',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    풍향
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center" style={{fontSize: '1.5rem'}}>
                                        {getWindDirectionArrow(item.VEC)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className="fw-bold"
                                    style={{
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 1,
                                        backgroundColor: '#ffffff',
                                        borderRight: '2px solid #dee2e6'
                                    }}
                                >
                                    풍속
                                </td>
                                {forecast.map((item, index) => (
                                    <td key={index} className="text-center">
                                        {item.WSD}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}