import useWeatherStore from "../../store/useWeatherStore.jsx";
import {useEffect} from "react";
import axios from "axios";

export default function VillageObservation() {
    const {location, observation} = useWeatherStore(state => state.states);
    const {setLocation, setObservation} = useWeatherStore(state => state.actions);

    useEffect(() => {
        if(!navigator.geolocation) {
            alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            geodata => {
                setLocation({
                    x: geodata.coords.latitude,
                    y: geodata.coords.longitude,
                });
            },
            (err) => {
                alert('위치 정보를 가져오는 데 실패했습니다: ' + err.message);
            }
        );
        console.log(location);

        const fetchObservation = async () => {
            try {
                const data = {'x': location.x, 'y': location.y};
                console.log(data);
                const response = await axios.get("/api/weather/observation", JSON.parse(JSON.stringify(data)));
                setObservation(response.data);
            } catch(e) {
                console.error(e);
            }
        }

        fetchObservation();
    }, [location, setLocation, setObservation]);

    return(
        <div className={'card'}>
            {observation.toString()}
        </div>
    )
}