package com.example.weather_app_project_server;

import com.example.weather_app_project_server.Domain.Observation;
import com.example.weather_app_project_server.Domain.Xys;
import com.example.weather_app_project_server.repository.XysRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Log4j2
class WeatherAppProjectServerApplicationTests {
    @Autowired
    private XysRepository xysRepository;

    @Test
    void contextLoads() throws Exception {
        Xys xys = xysRepository.findClosestOneByLatitudeLongitude(35.1567872, 129.0600448).get();

        Observation observation = Observation.builder()
                .nx(xys.getNx())
                .ny(xys.getNy())
                .build();
        log.info(observation.findValues());
    }

}
