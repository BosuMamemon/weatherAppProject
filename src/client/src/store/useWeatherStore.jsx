import {create} from "zustand";

const useWeatherStore = create(set => (
    {
        states: {
            location: {},
            observation: {},
            forecast: [],
            vstForecast: []
        },
        actions: {
            setLocation: data => set(state => ({states: {...state.states, location: data}})),
            setObservation: data => set(state => ({states: {...state.states, observation: data}})),
            setForecast: data => set(state => ({states: {...state.states, forecast: data}})),
            setVSTForecast: data => set(state => ({states: {...state.states, vstForecast: data}}))
        }
    }
))

export default useWeatherStore;