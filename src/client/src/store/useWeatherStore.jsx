import {create} from "zustand";

const useWeatherStore = create(set => (
    {
        states: {
            location: {},
            observation: {},
            forecast: [],
            vstForecast: [],
            particulateMatter: {}
        },
        actions: {
            setLocation: data => set(state => ({states: {...state.states, location: data}})),
            setObservation: data => set(state => ({states: {...state.states, observation: data}})),
            setForecast: data => set(state => ({states: {...state.states, forecast: data}})),
            setVSTForecast: data => set(state => ({states: {...state.states, vstForecast: data}})),
            setPM: data => set(state => ({states: {...state.states, particulateMatter: data}}))
        }
    }
))

export default useWeatherStore;