package com.example.weather_app_project_server.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class VideoImageDownloaderService {
    private static final String API_KEY = "xAMz6gggHdVtkbU0OHvjZoJFFNaZPM6kvynoNtOY1b4HJXe1bUN5TpUNNvKf5zm7c2N6sJVreVxLVXnPQlTXeg%3D%3D";

    public void downloadRadarImages() throws Exception {
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

        Path saveDir = Path.of("radar_images", date);
        Files.createDirectories(saveDir);

        int idx = 0;
        for (String imageUrl : imageUrls) {
            try (BufferedInputStream in = new BufferedInputStream(new URL(imageUrl).openStream());
                 FileOutputStream fileOutputStream = new FileOutputStream(saveDir.resolve("radar_" + date + '_' + idx + ".png").toFile())) {
                byte[] dataBuffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
                    fileOutputStream.write(dataBuffer, 0, bytesRead);
                }
                System.out.println("✅ Radar Image 저장됨: " + imageUrl);
                idx++;
            } catch (Exception e) {
                System.err.println("❌ Radar Image 실패: " + imageUrl + " - " + e.getMessage());
            }
        }
    }
    public void downloadSatliteImages() throws Exception {
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

        // 문자열을 진짜 리스트로 파싱
        rawList = rawList.replace("[", "").replace("]", "").replace(" ", "");
        String[] imageUrls = rawList.split(",");

        Path saveDir = Path.of("Satlite_images", date);
        Files.createDirectories(saveDir);

        int idx = 0;
        for (String imageUrl : imageUrls) {
            try (BufferedInputStream in = new BufferedInputStream(new URL(imageUrl).openStream());
                 FileOutputStream fileOutputStream = new FileOutputStream(saveDir.resolve("Satlite_" + date + '_' + idx + ".png").toFile())) {
                byte[] dataBuffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
                    fileOutputStream.write(dataBuffer, 0, bytesRead);
                }
                System.out.println("✅ 저장됨: " + imageUrl);
                idx++;
            } catch (Exception e) {
                System.err.println("❌ 실패: " + imageUrl + " - " + e.getMessage());
            }
        }
    }



}
