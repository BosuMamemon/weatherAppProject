import useWeatherStore from "../../store/useWeatherStore.jsx";
import {useEffect} from "react";
import axios from "axios";

export default function VillageObservation() {
    const {location, observation} = useWeatherStore(state => state.states);
    const {setObservation} = useWeatherStore(state => state.actions);

    useEffect(() => {
        if (!location.x || !location.y) return;

        const fetchObservation = async () => {
            try {
                const response = await axios.post("/api/weather/observation", JSON.parse(JSON.stringify(location)));
                setObservation(response.data);
            } catch(e) {
                console.error('기상 단기현황 데이터 페치 실패:', e);
            }
        }

        fetchObservation();
    }, [location, setObservation]); // location 변경 시에만 실행

    return(
        <div className={'card'}>
            기온: {observation.T1H ? observation.T1H : null}도 <br/>
            1시간 강수량: {observation.RN1 ? observation.RN1 : null}mm <br/>
            동서바람성분: {observation.UUU ? observation.UUU : null}m/s <br/>
            남북바람성분: {observation.VVV ? observation.VVV : null}m/s <br/>
            습도: {observation.REH ? observation.REH : null}% <br/>
            강수형태: {observation.PTY ? observation.PTY : null} <br/>
            풍향: {observation.VEC ? observation.VEC : null}deg <br/>
            풍속: {observation.WSD ? observation.WSD : null}m/s <br/>
        </div>
    )
}