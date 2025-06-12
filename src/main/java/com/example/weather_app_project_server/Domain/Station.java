package com.example.weather_app_project_server.Domain;

import com.example.weather_app_project_server.util.ServiceKey;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;

@Log4j2
public class Station {
    private static String serviceKey = ServiceKey.serviceKey;
    public static String findStation(double x, double y) throws Exception {
        Document document = Jsoup.connect(
                "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList" +
                        "?ServiceKey=" + serviceKey +
                        "&tmX=" + x +
                        "&tmY=" + y
        ).get();

        return document.getElementsByTag("stationName").get(0).text();
    }
}