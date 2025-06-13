package com.example.weather_app_project_server.Service;

import com.example.weather_app_project_server.Domain.*;
import com.example.weather_app_project_server.repository.XysRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class WeatherService {
    private final XysRepository xysRepository;

    public Map<String, String> getObservation(double x, double y) throws Exception {
        Xys xys = xysRepository.findClosestOneByLatitudeLongitude(x, y).get();

        Observation observation = Observation.builder()
                .nx(xys.getNx())
                .ny(xys.getNy())
                .build();
        return observation.findValues();
    }

    public List<Map<String, String>> getForecast(double x, double y) throws Exception {
        Xys xys = xysRepository.findClosestOneByLatitudeLongitude(x, y).get();

        STForecast stForecast = STForecast.builder()
                .nx(xys.getNx())
                .ny(xys.getNy())
                .build();
        return stForecast.findValues();
    }

    public List<Map<String, String>> getVSTForecast(double x, double y) throws Exception {
        Xys xys = xysRepository.findClosestOneByLatitudeLongitude(x, y).get();

        VSTForecast vstForecast = VSTForecast.builder()
                .nx(xys.getNx())
                .ny(xys.getNy())
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
