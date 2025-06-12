
import useWeatherStore from "../../store/useWeatherStore.jsx";
import { Card, Table } from 'react-bootstrap';
import './ShortTermForecast.css';
import {getWindDirectionArrow} from "../../../util.jsx";

export default function ShortTermForecast() {
    const {forecast} = useWeatherStore(state => state.states);

    return (
        <Card className="short-term-forecast-card mb-4">
            <Card.Header className="forecast-header">
                <h5 className="mb-0">
                    <i className="bi bi-calendar-week me-2"></i>
                    우리 동네 단기 예보
                </h5>
            </Card.Header>
            <Card.Body className="forecast-body">
                <div className="table-container">
                    <Table responsive hover className="forecast-table">
                        <thead>
                        <tr>
                            <th className="item-header">
                                <i className="bi bi-list-ul me-2"></i>
                                항목
                            </th>
                            {forecast.map((item, index) => (
                                <th key={index} className="time-header">
                                    <div className="time-badge">
                                        <div className="date-part">
                                            {item.fcstDate.substring(4,6)}/{item.fcstDate.substring(6,8)}
                                        </div>
                                        <div className="time-part">
                                            {item.fcstTime.substring(0,2)}:{item.fcstTime.substring(2,4)}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {/* 기온 행 */}
                        <tr className="forecast-row">
                            <td className="item-cell temp-item">
                                <i className="bi bi-thermometer-half me-2"></i>
                                기온 (°C)
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell temp-cell">
                                    <span className="temp-value">{item.TMP}</span>
                                    <span className="temp-unit">°</span>
                                </td>
                            ))}
                        </tr>

                        {/* 습도 행 */}
                        <tr className="forecast-row">
                            <td className="item-cell humidity-item">
                                <i className="bi bi-droplet me-2"></i>
                                습도 (%)
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell humidity-cell">
                                    <span className="humidity-value">{item.REH}</span>
                                    <span className="humidity-unit">%</span>
                                </td>
                            ))}
                        </tr>

                        {/* 하늘상태 행 */}
                        <tr className="forecast-row">
                            <td className="item-cell sky-item">
                                <i className="bi bi-cloud-sun me-2"></i>
                                하늘상태
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell sky-cell">
                                    <div className="sky-icon">
                                        {item.SKY === "1" ? "☀️" :
                                            item.SKY === "3" ? "⛅" :
                                                item.SKY === "4" ? "☁️" : item.SKY}
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* 강수량 행 */}
                        <tr className="forecast-row">
                            <td className="item-cell rainfall-item">
                                <i className="bi bi-cloud-rain me-2"></i>
                                강수량
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell rainfall-cell">
                                        <span className={`rainfall-value ${item.PCP !== '강수없음' && item.PCP !== '0' ? 'has-rain' : ''}`}>
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
                        <tr className="forecast-row">
                            <td className="item-cell wind-direction-item">
                                <i className="bi bi-compass me-2"></i>
                                풍향
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell wind-direction-cell">
                                    <div className="wind-direction-arrow">
                                        {getWindDirectionArrow(item.VEC)}
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* 풍속 행 */}
                        <tr className="forecast-row">
                            <td className="item-cell wind-item">
                                <i className="bi bi-wind me-2"></i>
                                풍속 (m/s)
                            </td>
                            {forecast.map((item, index) => (
                                <td key={index} className="data-cell wind-cell">
                                    <span className="wind-value">{item.WSD}</span>
                                    <span className="wind-unit">m/s</span>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
}