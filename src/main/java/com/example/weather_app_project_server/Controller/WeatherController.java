package com.example.weather_app_project_server.Controller;

import com.example.weather_app_project_server.Service.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Log4j2
public class WeatherController {
    private final WeatherService weatherService;

    @GetMapping("/observation")
    @ResponseBody
    public Map<String, String> getObsevation(@RequestBody Map<String, Double> xys) throws Exception {
        return weatherService.getObservation(xys.get("x"), xys.get("y"));
    }
}
