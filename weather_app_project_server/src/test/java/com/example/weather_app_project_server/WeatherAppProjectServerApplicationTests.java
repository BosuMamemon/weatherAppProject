package com.example.weather_app_project_server;

import com.example.weather_app_project_server.Domain.VSTForecast;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
@Log4j2
class WeatherAppProjectServerApplicationTests {

    @Test
    void contextLoads() throws Exception {
        VSTForecast vstForecast = VSTForecast.builder()
                .nx("55")
                .ny("127")
                .pageNo("1")
                .numOfRows("1000")
                .build();
        vstForecast.generateDocument();
        Map<String, String> map = vstForecast.findValues();
        log.info("map:");
        log.info(map);
    }

}
