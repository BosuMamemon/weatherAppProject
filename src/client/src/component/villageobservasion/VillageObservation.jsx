import useWeatherStore from "../../store/useWeatherStore.jsx";
import {getWindDirectionArrow} from "../../util.jsx";

export default function VillageObservation() {
    const {observation} = useWeatherStore();

    return (
        <div className="card shadow-lg border-0">
            <div className="card-header bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h5 className="card-title mb-0">
                    <i className="bi bi-cloud-sun me-2"></i>
                    실시간 날씨 정보
                </h5>
            </div>
            <div className="card-body p-4">
                <div className="row g-4">
                    {/* 메인 정보 */}
                    <div className="col-12">
                        <div className="text-center py-3 bg-light rounded">
                            <h2 className="display-4 text-primary mb-1">
                                {observation.T1H ? `${observation.T1H}°` : '--°'}
                            </h2>
                            <p className="text-muted mb-0">현재 기온</p>
                        </div>
                    </div>

                    {/* 상세 정보 그리드 */}
                    <div className="col-md-4">
                        <div className="text-center p-3 border rounded hover-shadow">
                            <i className="bi bi-droplet-half text-info display-6 mb-2"></i>
                            <h6 className="mb-1">습도</h6>
                            <strong>{observation.REH ? `${observation.REH}%` : 'N/A'}</strong>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="text-center p-3 border rounded hover-shadow">
                            <span className="display-6 mb-2">
                                {observation.VEC ? getWindDirectionArrow(observation.VEC) : '🔘'}
                            </span>
                            <h6 className="mb-1">풍향/풍속</h6>
                            <strong>
                                {observation.WSD ? `${observation.WSD}m/s` : 'N/A'}
                            </strong>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="text-center p-3 border rounded hover-shadow">
                            <i className="bi bi-cloud-rain text-primary display-6 mb-2"></i>
                            <h6 className="mb-1">강수량</h6>
                            <strong>{observation.RN1 ? `${observation.RN1}mm` : '0mm'}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}