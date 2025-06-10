import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Information from "./page/Information.jsx";
import WeatherMap from "./page/WeatherMap.jsx";
import EnvironIndex from "./page/EnvironIndex.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';

// export const WeatherStateContext   = React.createContext();
// export const weatherDispatchContext = React.createContext();

function App() {
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
