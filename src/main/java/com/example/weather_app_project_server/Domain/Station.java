package com.example.weather_app_project_server.Domain;

import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

@Log4j2
public class Station {
    public static String findStation(int x, int y) throws Exception {
        Document document = Jsoup.connect(
                "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?ServiceKey=xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg==" +
                        "&tmX=" + x +
                        "&tmY=" + y
        ).get();

        return document.getElementsByTag("stationName").get(0).text();
    }
}