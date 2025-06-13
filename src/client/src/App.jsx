import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Information from "./page/Information.jsx";
import WeatherMap from "./page/WeatherMap.jsx";
import EnvironIndex from "./page/EnvironIndex.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect} from "react";
import useWeatherStore from "./store/useWeatherStore.jsx";
import axios from "axios";

function App() {
    const {location, forecast, nowDate, nowTime, willBeRaining, vstForecast} = useWeatherStore();
    const {setLocation, setForecast, setVSTForecast, setObservation, setNowDate, setNowTime, setWillBeRaining} = useWeatherStore();

    useEffect(() => {
        if(!navigator.geolocation) {
          alert('위치 정보를 가져올 수 없습니다.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
            resp => {
              setLocation({"x": resp.coords.latitude, "y": resp.coords.longitude});
            },
            e => {
              alert('위치 정보를 가져오는 데 실패했습니다: ' + e.message);
            }
        );
    }, [setLocation]);

    useEffect(() => {
        if (!location.x || !location.y) return;

        const fetchObservation = async () => {
            try {
                const response = await axios.post("/api/weather/observation", JSON.parse(JSON.stringify(location)));
                setObservation(response.data);
            } catch (e) {
                console.error('기상 단기현황 데이터 페치 실패:', e);
            }
        }

        fetchObservation();
    }, [location, setObservation]);

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

        fetchForecast();
    }, [location, setForecast]);

    useEffect(() => {
        let formattedToday = String(new Date().getFullYear());
        formattedToday += new Date().getMonth() + 1 < 10 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth());
        formattedToday += new Date().getDate() < 10 ? "0" + String(new Date().getDate()) : String(new Date().getDate());
        let formattedTime = new Date().getHours() < 10 ? "0" + String(new Date().getHours()) + "00" : String(new Date().getHours()) + "00";

        setNowDate(formattedToday);
        setNowTime(formattedTime);
    }, [setNowDate, setNowTime]);


    // 강수 여부 판단 및 초단기예보 호출을 하나의 useEffect로 통합
    useEffect(() => {
        if (!forecast.length || !nowDate || !nowTime) return;

        let formattedForecast = forecast.filter(it => it.fcstDate === nowDate && new Date(2025, 1, 1, parseInt(it.fcstTime.substring(0, 2))).getHours() >= new Date().getHours() && it.PCP === "강수없음");
        console.log("nowDate:", nowDate);
        console.log("formattedForecast:", formattedForecast);

        // 로컬 변수로 현재 상태 추적
        let shouldBeRaining = formattedForecast.length > 0;
        setWillBeRaining(shouldBeRaining);

        // 로컬 변수를 사용해서 조건 확인
        if (shouldBeRaining) {
            console.log("formattedForecast[0]: ", formattedForecast[0]);
            console.log("nowTime: ", nowTime);
            console.log("formattedForecast[0].fcstTime === nowTime: ", formattedForecast[0].fcstTime === nowTime);
            if (formattedForecast[0].fcstTime === nowTime) {
                const fetchVSTForecast = async () => {
                    try {
                        const response = await axios.post('/api/weather/vstforecast', JSON.parse(JSON.stringify(location)));
                        setVSTForecast(response.data);
                        console.log("fetchVSTForecast 실행됨!");
                    } catch (e) {
                        console.error('기상 초단기예보 데이터 페치 실패:', e);
                    }
                }

                fetchVSTForecast();
            }
        }
    }, [forecast, location.x, location.y, nowDate, nowTime, setVSTForecast, setWillBeRaining])

    useEffect(() => {
        console.log("vstForecast: ", vstForecast);
    }, [vstForecast]);

    return (
        <div className={'container mt-5'}>
            <div className={'App'}>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/index'} element={<EnvironIndex />} />
                    <Route path={'/map'} element={<WeatherMap />} />
                    <Route path={'/info'} element={<Information />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
