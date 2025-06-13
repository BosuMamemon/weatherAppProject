import useWeatherStore from "../../store/useWeatherStore.jsx";
import { Card, Table } from 'react-bootstrap';
import './VeryShortTermForecast.css';
import {formatTime, getPrecipitationType, getSkyCondition} from "../../util.jsx";

const VeryShortTermForecast = () => {
    const {vstForecast} = useWeatherStore();
    console.log(vstForecast.find(it => it.RN1 === "강수없음"));

    return (
        <Card className="very-short-forecast-card mb-4">
            <Card.Header className="forecast-header">
                <h5 className="mb-0">
                    <i className="bi bi-cloud-rain-heavy me-2"></i>
                    초단기 강수 예보
                </h5>
            </Card.Header>
            <Card.Body className="forecast-body">
                {
                    vstForecast.find(it => new Date(2025, 1, 1, parseInt(it.fcstTime.substring(0, 2))).getHours() > new Date().getHours() && it.RN1 === "강수없음").fcstTime ?
                        <div className="rain-stop-alert">
                            <div className="rain-stop-icon">
                                <i className="bi bi-sun"></i>
                            </div>
                            <div className="rain-stop-content">
                                <h6 className="rain-stop-title">비가 그칠 예정입니다!</h6>
                                <p className="rain-stop-time">
                                    <i className="bi bi-clock me-1"></i>
                                    <strong>{formatTime(vstForecast.find(it => new Date(2025, 1, 1, parseInt(it.fcstTime.substring(0, 2))).getHours() > new Date().getHours() && it.RN1 === "강수없음").fcstTime)}</strong>
                                </p>
                            </div>
                        </div>
                        : ""
                }
                <div className="table-container">
                    <Table responsive hover className="forecast-table">
                        <thead>
                        <tr>
                            <th className="time-header">
                                <i className="bi bi-clock me-2"></i>
                                시간
                            </th>
                            <th className="temp-header">
                                <i className="bi bi-thermometer-half me-2"></i>
                                기온
                            </th>
                            <th className="humidity-header">
                                <i className="bi bi-droplet me-2"></i>
                                습도
                            </th>
                            <th className="rainfall-header">
                                <i className="bi bi-cloud-rain me-2"></i>
                                강수량
                            </th>
                            <th className="sky-header">
                                <i className="bi bi-cloud me-2"></i>
                                하늘상태
                            </th>
                            <th className="precipitation-header">
                                <i className="bi bi-umbrella me-2"></i>
                                강수형태
                            </th>
                            <th className="wind-header">
                                <i className="bi bi-wind me-2"></i>
                                풍속
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {vstForecast.map((forecast, index) => (
                            <tr key={index} className="forecast-row">
                                <td className="time-cell">
                                    <span className="time-badge">
                                        {formatTime(forecast.fcstTime)}
                                    </span>
                                </td>
                                <td className="temp-cell">
                                    <span className="temp-value">{forecast.T1H}</span>
                                    <span className="temp-unit">°C</span>
                                </td>
                                <td className="humidity-cell">
                                    <span className="humidity-value">{forecast.REH}</span>
                                    <span className="humidity-unit">%</span>
                                </td>
                                <td className="rainfall-cell">
                                    <span className="rainfall-value">{forecast.RN1}</span>
                                    <span className="rainfall-unit">mm</span>
                                </td>
                                <td className="sky-cell">
                                    <span className="sky-value">{getSkyCondition(forecast.SKY)}</span>
                                </td>
                                <td className="precipitation-cell">
                                    <span className="precipitation-value">{getPrecipitationType(forecast.PTY)}</span>
                                </td>
                                <td className="wind-cell">
                                    <span className="wind-value">{forecast.WSD}</span>
                                    <span className="wind-unit">m/s</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    )
};

export default VeryShortTermForecast;