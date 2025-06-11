package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Builder
@Data
@Log4j2
public class STForecast {
    @Builder.Default
    private Document document = null;
    @Builder.Default
    private String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    @Builder.Default
    private String serviceKey = "xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg==";
    @Builder.Default
    private String base_date = LocalDate.now().toString().replace("-", "");
    @Builder.Default
    private String base_time = "0500";
    @Builder.Default
    private int numOfRows = 1000;
    @Builder.Default
    private int pageNo = 1;
    private int nx;
    private int ny;

    public List<Map<String, String>> findValues() throws Exception {
        this.document = Jsoup.connect(
                this.url
                + "?serviceKey=" + this.serviceKey
                + "&base_date=" + this.base_date
                + "&base_time=" + this.base_time
                + "&numOfRows=" + this.numOfRows
                + "&pageNo=" + this.pageNo
                + "&nx=" + this.nx
                + "&ny=" + this.ny
        ).get();

        List<Map<String, String>> maps = new ArrayList<>();
        Elements items = this.document.getElementsByTag("item");

        for(int i = 0; i < 5; i++) {
            String today = LocalDate.now().plusDays(i).toString().replace("-", "");
            for(int j = 0; j < 24; j++) {
                String nowTime = LocalTime.of(5, 0, 0).plusHours(j).toString();
                String nowTimeProcessed = nowTime.replace(":", "").substring(0, 4);

                Map<String, String> map = new HashMap<>();
                map.put("측정날짜", today);
                map.put("측정시간", nowTimeProcessed);

                for(Element item : items) {
                    if(
                            item.getElementsByTag("fcstDate").text().equals(today) && item.getElementsByTag("fcstTime").text().equals(nowTimeProcessed)
                    ) {
                        map.put(item.getElementsByTag("category").text(), item.getElementsByTag("fcstValue").text());
                    }
                }
                maps.add(map);
            }
        }

        return maps;
    }
}
