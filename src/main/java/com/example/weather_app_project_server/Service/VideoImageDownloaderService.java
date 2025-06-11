package com.example.weather_app_project_server.Service;

import com.example.weather_app_project_server.Domain.RadarFrames;
import com.example.weather_app_project_server.Domain.SatelliteFrames;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class VideoImageDownloaderService {
    private static final String API_KEY = "xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg%3D%3D";

    public List<String> downloadVSTFFrams() throws Exception {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = "https://apihub.kma.go.kr/api/typ03/cgi/dfs/nph-qpf_ana_img" +
                "?eva=1" +
                "&tm=202212221350" +
                "&qpf=B" +
                "&ef=360" +
                "&map=HR" +
                "&grid=2" +
                "&legend=1" +
                "&size=600" +
                "&zoom_level=0" +
                "&zoom_x=0000000" +
                "&zoom_y=0000000" +
                "&stn=108" +
                "&x1=470" +
                "&y1=575" +
                "&authKey=zL1ONJ5JRrS9TjSeSSa0iQ";




    }




    public List<String> downloadRadarFrames() throws Exception {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = "http://apis.data.go.kr/1360000/RadarImgInfoService/getCmpImg" +
                "?serviceKey=" + API_KEY +
                "&numOfRows=10" +
                "&pageNo=1" +
                "&data=CMP_WRC" +
                "&time=" + date +
                "&dataType=JSON";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new URL(url));

        String rawList = root.path("response").path("body").path("items").path("item").get(0).path("rdr-img-file").asText();

        // 문자열을 진짜 리스트로 파싱
        rawList = rawList.replace("[", "").replace("]", "").replace(" ", "");
        String[] imageUrls = rawList.split(",");

        RadarFrames radarFramesDTO = new RadarFrames();
        List<String> radarFrames = new ArrayList<>();

        for (String imageUrl : imageUrls) {
                radarFrames.add(imageUrl);
                System.out.println("✅ Radar Image 저장됨: " + imageUrl);
        }

        radarFramesDTO.setRadarFrames(radarFrames);
        System.out.println("<UNK> Radar Frames <UNK>: " + radarFramesDTO.getRadarFrames());

        return radarFramesDTO.getRadarFrames();

    }
    public List<String> downloadSatliteFrames() throws Exception {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = "http://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit" +
                "?serviceKey=" + API_KEY +
                "&numOfRows=10" +
                "&pageNo=1" +
                "&sat=G2" +
                "&data=rgbt" +
                "&area=ko" +
                "&time=" + date +
                "&dataType=JSON";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new URL(url));

        String rawList = root.path("response").path("body").path("items").path("item").get(0).path("satImgC-file").asText();

        log.info("<UNK> Satellite Image <UNK>: " + rawList);

        // 문자열을 진짜 리스트로 파싱
        rawList = rawList.replace("[", "").replace("]", "").replace(" ", "");
        String[] imageUrls = rawList.split(",");
        log.info("<UNK> Satellite Image <UNK>: " + imageUrls.length);

        SatelliteFrames satelliteFramesDTO = new SatelliteFrames();
        List<String> satelliteFrames = new ArrayList<>();

        for (String imageUrl : imageUrls) {
                satelliteFrames.add(imageUrl);
                System.out.println("✅ Satellite Image 저장됨: " + imageUrl);
        }
        satelliteFramesDTO.setSatliteFrames(satelliteFrames);
        log.info("satelliteFramesDTO.getSatelliteFrames()");
        return satelliteFramesDTO.getSatliteFrames();

    }

}
