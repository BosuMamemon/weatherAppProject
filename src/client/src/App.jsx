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

// export const WeatherStateContext   = React.createContext();
// export const weatherDispatchContext = React.createContext();

function App() {
  const {setLocation} = useWeatherStore(state => state.actions);

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

  return (
    <div className={'container mt-5'}>
      {/*<WeatherStateContext.Provider value={ {villageForecastList, radarCompositeFramesList, satelliteRgbFrames, vsrfRgbFramesList} }>*/}
      {/*  <WeatherDispatchContext.Provider value{{onCreate, onUpdate, onDelete}}>*/}
          <div className={'App'}>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/index'} element={<EnvironIndex />} />
              <Route path={'/map'} element={<WeatherMap />} />
              <Route path={'/info'} element={<Information />} />
            </Routes>
          </div>
      {/*  </WeatherDispatchContext.Provider>*/}
      {/*</WeatherStateContext.Provider>*/}
    </div>
  )
}

export default App
