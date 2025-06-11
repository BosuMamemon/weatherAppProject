package com.example.weather_app_project_server.Controller;

import com.example.weather_app_project_server.Service.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Log4j2
public class WeatherController {
    private final WeatherService weatherService;

    @PostMapping("/observation")
    @ResponseBody
    public Map<String, String> getObservation(@RequestBody Map<String, Double> xys) throws Exception {
        return weatherService.getObservation((int)Math.round(xys.get("x")), (int)Math.round(xys.get("y")));
    }

    @PostMapping("/forecast")
    @ResponseBody
    public List<Map<String, String>> getForecast(@RequestBody Map<String, Double> xys) throws Exception {
        return weatherService.getForecast((int)Math.round(xys.get("x")), (int)Math.round(xys.get("y")));
    }

    @PostMapping("/vstforecast")
    @ResponseBody
    public List<Map<String, String>> getVSTForecast(@RequestBody Map<String, Double> xys) throws Exception {
        return weatherService.getVSTForecast((int)Math.round(xys.get("x")), (int)Math.round(xys.get("y")));
    }

    @PostMapping("/pm")
    @ResponseBody
    public Map<String, String> getPM(@RequestBody Map<String, Double> xys) throws Exception {
        return weatherService.getPM(xys.get("x"), xys.get("y"));
    }
}
