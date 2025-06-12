package com.example.weather_app_project_server.Domain;

import com.example.weather_app_project_server.util.ServiceKey;
import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Builder
@Data
@Log4j2
public class Observation {
    @Builder.Default
    private Document document = null;
    @Builder.Default
    private String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    @Builder.Default
    private String serviceKey = ServiceKey.serviceKey;
    @Builder.Default
    private String base_date = LocalDate.now().toString().replace("-", "");
    @Builder.Default
    private String base_time = LocalTime.now().getHour() > 10 ? String.valueOf(LocalTime.now().getHour()) + "00" : "0" + String.valueOf(LocalTime.now().getHour()) + "00";
    @Builder.Default
    private int pageNo = 1;
    @Builder.Default
    private int numOfRows = 1000;
    private int nx;
    private int ny;

    public Map<String, String> findValues() throws Exception {
        this.document = Jsoup.connect(this.url
            + "?ServiceKey=" + this.serviceKey
            + "&pageNo=" + this.pageNo
            + "&numOfRows=" + this.numOfRows
            + "&base_date=" + this.base_date
            + "&base_time=" + this.base_time
            + "&nx=" + this.nx
            + "&ny=" + this.ny).get();

        log.info(this.url
                + "?ServiceKey=" + this.serviceKey
                + "&pageNo=" + this.pageNo
                + "&numOfRows=" + this.numOfRows
                + "&base_date=" + this.base_date
                + "&base_time=" + this.base_time
                + "&nx=" + this.nx
                + "&ny=" + this.ny);

        Map<String, String> map = new HashMap<>();
        Elements items = this.document.getElementsByTag("item");
        for(Element item : items) {
            Elements key = item.getElementsByTag("category");
            Elements value = item.getElementsByTag("obsrValue");
            map.put(key.text(), value.text());
        }

        return map;
    }
}
