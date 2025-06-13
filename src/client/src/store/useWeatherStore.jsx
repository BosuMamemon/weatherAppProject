import {create} from "zustand";

const useWeatherStore = create(set => ({
    location: {},
    observation: {},
    forecast: [],
    vstForecast: [],
    particulateMatter: {},
    nowDate: "",
    nowTime: "",
    formattedForecast: [],
    
    // actions
    setLocation: data => set({ location: data }),
    setObservation: data => set({ observation: data }),
    setForecast: data => set({ forecast: data }),
    setVSTForecast: data => set({ vstForecast: data }),
    setPM: data => set({ particulateMatter: data }),
    setNowDate: data => set({ nowDate: data }),
    setNowTime: data => set({ nowTime: data }),
    setFormattedForecast: data => set({ formattedForecast: data }),
}));

export default useWeatherStore;