import {create} from "zustand";

const useWeatherStore = create(set => (
    {
        states: {
            location: {},
            observation: {},
            forecast: [],
            vstForecast: [],
            particulateMatter: {},
            nowDate: "",
            nowTime: "",
            willBeRaining: false
        },
        actions: {
            setLocation: data => set(state => ({states: {...state.states, location: data}})),
            setObservation: data => set(state => ({states: {...state.states, observation: data}})),
            setForecast: data => set(state => ({states: {...state.states, forecast: data}})),
            setVSTForecast: data => set(state => ({states: {...state.states, vstForecast: data}})),
            setPM: data => set(state => ({states: {...state.states, particulateMatter: data}})),
            setNowDate: data => set(state => ({states: {...state.states, nowDate: data}})),
            setNowTime: data => set(state => ({states: {...state.states, nowTime: data}})),
            setWillBeRaining: data => set(state => ({states: {...state.states, willBeRaining: data}}))
        }
    }
))

export default useWeatherStore;