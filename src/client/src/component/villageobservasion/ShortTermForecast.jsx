import {useEffect} from "react";
import useWeatherStore from "../../store/useWeatherStore.jsx";
import axios from "axios";
import {getWindDirectionArrow} from "../../../util.jsx";

export default function ShortTermForecast() {
    const {location, forecast} = useWeatherStore(state => state.states);
    const {setForecast, setVSTForecast} = useWeatherStore(state => state.actions);

    useEffect(() => {
        if (!location.x || !location.y) return;

        const fetchForecast = async () => {
            try {
                const response = await axios.post('/api/weather/forecast', JSON.parse(JSON.stringify(location)));
                setForecast(response.data);
            } catch(e) {
                console.error('기상 단기예보 데이터 페치 실패:', e);
            }
        }

        const fetchVSTForecast = async () => {
            try {
                const response = await axios.post('/api/weather/vstforecast', JSON.parse(JSON.stringify(location)));
                setVSTForecast(response.data);
            } catch(e) {
                console.error('기상 초단기예보 데이터 페치 실패:', e);
            }
        }

        fetchForecast();

        let formattedToday = String(new Date().getFullYear());
        formattedToday += new Date().getMonth() + 1 < 10 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth());
        formattedToday += new Date().getDate() < 10 ? "0" + String(new Date().getDate()) : String(new Date().getDate());
        let formattedTime = new Date().getHours() < 10 ? "0" + String(new Date().getHours()) + "00" : String(new Date().getHours()) + "00";
        let formattedForecast = forecast.filter(it => it.fcstDate === formattedToday & it.PCP !== "강수없음")

        if(formattedForecast.length > 0) {
            if(formattedForecast[0].fcstTime === formattedTime) {
                fetchVSTForecast();
            }
        }
    }, [location, setForecast, setVSTForecast]);

    return (
        <div className="container-fluid py-4" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh'}}>
            {/* 헤더 섹션 */}
            <div className="text-center mb-5">
                <div className="d-inline-block p-3 rounded-circle bg-white shadow-sm mb-3">
                    <i className="bi bi-cloud-sun text-primary" style={{fontSize: '2.5rem'}}></i>
                </div>
                <h1 className="display-5 fw-bold text-primary mb-2">우리 동네 단기예보</h1>
                <p className="text-muted lead">향후 3일간 상세 날씨 정보</p>
            </div>

            {/* 메인 카드 */}
            <div className="row justify-content-center">
                <div className="col-12 col-xl-11">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-gradient p-4" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '1rem 1rem 0 0 !important'
                        }}>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-calendar-week text-white me-3" style={{fontSize: '1.5rem'}}></i>
                                <h4 className="text-white mb-0 fw-bold">시간별 예보</h4>
                            </div>
                        </div>
                        
                        <div className="card-body p-0">
                            <div
                                className="table-responsive"
                                style={{
                                    maxHeight: '70vh',
                                    overflowY: 'auto'
                                }}
                            >
                                <table className="table table-hover mb-0">
                                    <thead className="sticky-top">
                                        <tr style={{background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)'}}>
                                            <th 
                                                className="fw-bold text-dark border-end"
                                                style={{
                                                    minWidth: '140px',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                    background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                <i className="bi bi-list-ul me-2"></i>
                                                항목
                                            </th>
                                            {forecast.map((item, index) => (
                                                <th key={index} className="text-center border-start" style={{
                                                    minWidth: '100px', 
                                                    fontSize: '0.85rem',
                                                    padding: '1rem 0.5rem'
                                                }}>
                                                    <div className="fw-bold text-primary">
                                                        {item.fcstDate.substring(4,6)}/{item.fcstDate.substring(6,8)}
                                                    </div>
                                                    <div className="text-muted small">
                                                        {item.fcstTime.substring(0,2)}:{item.fcstTime.substring(2,4)}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* 기온 행 */}
                                        <tr className="bg-light">
                                            <td 
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky', 
                                                    left: 0, 
                                                    zIndex: 1,
                                                    background: '#f8f9fa'
                                                }}
                                            >
                                                <i className="bi bi-thermometer-half text-danger me-2"></i>
                                                기온 (°C)
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <span className="fs-5 fw-bold text-primary">{item.TMP}°</span>
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {/* 습도 행 */}
                                        <tr>
                                            <td 
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky', 
                                                    left: 0, 
                                                    zIndex: 1,
                                                    backgroundColor: '#ffffff'
                                                }}
                                            >
                                                <i className="bi bi-droplet text-info me-2"></i>
                                                습도 (%)
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <span className="fw-semibold">{item.REH}%</span>
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {/* 하늘상태 행 */}
                                        <tr className="bg-light">
                                            <td 
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky', 
                                                    left: 0, 
                                                    zIndex: 1,
                                                    background: '#f8f9fa'
                                                }}
                                            >
                                                <i className="bi bi-cloud-sun text-warning me-2"></i>
                                                하늘상태
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <div style={{fontSize: '2rem', lineHeight: '1'}}>
                                                        {item.SKY === "1" ? "☀️" :
                                                         item.SKY === "3" ? "⛅" :
                                                         item.SKY === "4" ? "☁️" : item.SKY}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {/* 강수량 행 */}
                                        <tr>
                                            <td
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 1,
                                                    backgroundColor: '#ffffff'
                                                }}
                                            >
                                                <i className="bi bi-cloud-rain text-primary me-2"></i>
                                                강수량
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <span className={`fw-semibold ${item.PCP !== '강수없음' && item.PCP !== '0' ? 'text-primary' : 'text-muted'}`}>
                                                        {
                                                            item.PCP === '0' ? '강수없음' :
                                                            item.PCP === '1' ? '약한 비' :
                                                            item.PCP === '2' ? '보통 비' :
                                                            item.PCP === '3' ? '강한 비' :
                                                            item.PCP
                                                        }
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {/* 풍향 행 */}
                                        <tr className="bg-light">
                                            <td
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 1,
                                                    background: '#f8f9fa'
                                                }}
                                            >
                                                <i className="bi bi-compass text-success me-2"></i>
                                                풍향
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <div style={{fontSize: '2rem', lineHeight: '1'}}>
                                                        {getWindDirectionArrow(item.VEC)}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {/* 풍속 행 */}
                                        <tr>
                                            <td
                                                className="fw-bold border-end py-3"
                                                style={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 1,
                                                    backgroundColor: '#ffffff'
                                                }}
                                            >
                                                <i className="bi bi-wind text-info me-2"></i>
                                                풍속 (m/s)
                                            </td>
                                            {forecast.map((item, index) => (
                                                <td key={index} className="text-center py-3 border-start">
                                                    <span className="fw-semibold">{item.WSD}</span>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* 카드 푸터 */}
                        <div className="card-footer bg-light text-center py-3">
                            <small className="text-muted">
                                <i className="bi bi-info-circle me-1"></i>
                                데이터는 기상청에서 제공되며 실시간으로 업데이트됩니다
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}