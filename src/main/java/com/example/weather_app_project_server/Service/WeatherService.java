package com.example.weather_app_project_server.Service;

import com.example.weather_app_project_server.Domain.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Log4j2
public class WeatherService {
    public Map<String, String> getObservation(int x, int y) throws Exception {
        Observation observation = Observation.builder()
                .nx(x)
                .ny(y)
                .build();
        return observation.findValues();
    }

    public List<Map<String, String>> getForecast(int x, int y) throws Exception {
        STForecast stForecast = STForecast.builder()
                .nx(x)
                .ny(y)
                .build();
        return stForecast.findValues();
    }

    public List<Map<String, String>> getVSTForecast(int x, int y) throws Exception {
        VSTForecast vstForecast = VSTForecast.builder()
                .nx(x)
                .ny(y)
                .build();
        log.info(vstForecast.findValues());
        return vstForecast.findValues();
    }

    public Map<String, String> getPM(double x, double y) throws Exception {
        ParticulateMatter particulateMatter = ParticulateMatter.builder()
                .stationName(Station.findStation(x, y))
                .build();
        log.info(particulateMatter.findValues());
        return particulateMatter.findValues();
    }
}
