package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.jsoup.nodes.Document;

@Builder
@Data
@Log4j2
public class VSTForecast {
    static Document document;

    @Builder.Default
    private String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
}
