import {create} from "zustand";

const useWeatherStore = create(set => (
    {
        states: {
            location: {},
            observation: {}
        },
        actions: {
            setLocation: geodata => set({location: geodata}),
            setObservation: obsvData => set({observation: obsvData})
        }
    }
))

export default useWeatherStore;