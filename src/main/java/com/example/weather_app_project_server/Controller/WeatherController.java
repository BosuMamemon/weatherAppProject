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
        List<Map<String, String>> lists = weatherService.getForecast((int)Math.round(xys.get("x")), (int)Math.round(xys.get("y")));
        log.info(lists);
        return lists;
    }
}
