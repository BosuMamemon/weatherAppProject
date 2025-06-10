package com.example.weather_app_project_server.Service;

import com.example.weather_app_project_server.Domain.Observation;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Log4j2
public class WeatherService {
    public Map<String, String> getObservation(double x, double y) throws Exception {
        Observation observation = Observation.builder()
                .nx(x)
                .ny(y)
                .build();
        return observation.findValues();
    }
}
