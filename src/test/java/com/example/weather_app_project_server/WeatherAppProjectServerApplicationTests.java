package com.example.weather_app_project_server;

import com.example.weather_app_project_server.Domain.Observation;
import com.example.weather_app_project_server.Domain.ParticulateMatter;
import com.example.weather_app_project_server.Domain.STForecast;
import com.example.weather_app_project_server.Domain.Station;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
@Log4j2
class WeatherAppProjectServerApplicationTests {

    @Test
    void contextLoads() throws Exception {
        Observation observation = Observation.builder()
                .nx(55)
                .ny(127)
                .build();
        Map<String, String> obsrMap = observation.findValues();
        log.info("observation map:");
        log.info(obsrMap);

//        STForecast stForecast = STForecast.builder()
//                .nx("55")
//                .ny("127")
//                .pageNo("1")
//                .numOfRows("1000")
//                .build();
//        stForecast.generateDocument();
//        stForecast.findValues();

//        ParticulateMatter particulateMatter = ParticulateMatter.builder()
//                .stationName(Station.findStation(55, 127))
//                .build();
//        log.info(particulateMatter.findValues());
    }

}
