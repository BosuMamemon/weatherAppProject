package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.HashMap;
import java.util.Map;


@Builder
@Data
@Log4j2
public class ParticulateMatter {
    @Builder.Default
    private Document document = null;
    @Builder.Default
    private String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";
    @Builder.Default
    private String serviceKey = "xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg==";
    @Builder.Default
    private String dataTerm = "DAILY";
    private String stationName;

    public Map<String, String> findValues() throws Exception {
        Map<String, String> map = new HashMap<>();
        this.document = Jsoup.connect(
                this.url
                        + "?serviceKey=" + this.serviceKey
                        + "&dataTerm=" + this.dataTerm
                        + "&stationName=" + this.stationName
        ).get();

        Element item = document.getElementsByTag("item").get(0);
        map.put("so2Value", item.getElementsByTag("so2Value").text());
        map.put("coValue", item.getElementsByTag("coValue").text());
        map.put("pm10Value", item.getElementsByTag("pm10Value").text());
        map.put("no2Value", item.getElementsByTag("no2Value").text());
        map.put("o3Value", item.getElementsByTag("o3Value").text());
        map.put("pm25Value", item.getElementsByTag("pm25Value").text());
        map.put("so2Grade", item.getElementsByTag("so2Grade").text());
        map.put("coGrade", item.getElementsByTag("coGrade").text());
        map.put("pm10Grade", item.getElementsByTag("pm10Grade").text());
        map.put("no2Grade", item.getElementsByTag("no2Grade").text());
        map.put("o3Grade", item.getElementsByTag("o3Grade").text());
        map.put("pm25Grade", item.getElementsByTag("pm25Grade").text());
        return map;
    }
}
