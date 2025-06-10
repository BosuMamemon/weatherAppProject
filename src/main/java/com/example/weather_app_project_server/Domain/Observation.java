package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Builder
@Data
@Log4j2
public class Observation {
    static Document document;

    @Builder.Default
    private String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    @Builder.Default
    private String serviceKey = "xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg==";
    @Builder.Default
    private String base_date = LocalDate.now().toString().replace("-", "");
    @Builder.Default
    private String base_time = "0600";
    private String pageNo;
    private String numOfRows;
    private String nx;
    private String ny;

    public Document generateDocument() throws Exception {
         document = Jsoup.connect(this.url
                + "?ServiceKey=" + this.serviceKey
                + "&pageNo=" + this.pageNo
                + "&numOfRows=" + this.numOfRows
                + "&base_date=" + this.base_date
                + "&base_time=" + this.base_time
                + "&nx=" + this.nx
                + "&ny=" + this.ny).get();
        return document;
    }

    public Map<String, String> findValues() {
        Map<String, String> map = new HashMap<>();
        Elements items = document.getElementsByTag("item");
        for(Element item : items) {
            Elements key = item.getElementsByTag("category");
            Elements value = item.getElementsByTag("obsrValue");
            map.put(key.text(), value.text());
        }

        map.put("강수형태", map.remove("PTY"));
        map.put("습도", map.remove("REH"));
        map.put("1시간강수량", map.remove("RN1"));
        map.put("기온", map.remove("T1H"));
        map.put("동서바람성분", map.remove("UUU"));
        map.put("풍향", map.remove("VEC"));
        map.put("남북바람성분", map.remove("VVV"));
        map.put("풍속", map.remove("WSD"));

        switch (map.get("강수형태")) {
            case "0": map.replace("강수형태", "없음"); break;
            case "1": map.replace("강수형태", "비"); break;
            case "2": map.replace("강수형태", "비/눈"); break;
            case "3": map.replace("강수형태", "눈"); break;
            case "5": map.replace("강수형태", "빗방울"); break;
            case "6": map.replace("강수형태", "빗방울눈날림"); break;
            case "7": map.replace("강수형태", "눈날림"); break;
        }

        return map;
    }
}
