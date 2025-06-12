package com.example.weather_app_project_server.Service;

import com.example.weather_app_project_server.Domain.RadarFrames;
import com.example.weather_app_project_server.Domain.SatelliteFrames;
import com.example.weather_app_project_server.Domain.VSTFFrames;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Log4j2
@Service
public class VideoImageDownloaderService {
    @Value("${serviceKey}")
    private static String API_KEY;
    private static final String authKey = "zL1ONJ5JRrS9TjSeSSa0iQ";

    public List<String> downloadVSTFFrames() throws Exception {

        // 아직 이미지가 업로드 안됐을 수도 있으니 10분 전 시간 기준으로 요청
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        String timeStr = tenMinutesAgo.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));

        VSTFFrames vSTFFramesDTO = new VSTFFrames();
        List<String> vSTFFrames = new ArrayList<>();

        // 저장 디렉토리
        String baseDir = System.getProperty("user.dir") + "/src/client/public/videoFrames";
        System.out.println("📂 저장 디렉토리: " + baseDir);
        Path saveDir = Paths.get(baseDir);

        // 디버깅 로그
        System.out.println("▶ 저장 디렉토리 경로: " + saveDir.toAbsolutePath());

        if (!Files.exists(saveDir)) {
            try {
                Files.createDirectories(saveDir);
                System.out.println("✅ 디렉토리 생성됨");
            } catch (IOException e) {
                System.err.println("❌ 디렉토리 생성 실패: " + e.getMessage());
                e.printStackTrace();
                return Collections.emptyList(); // 저장 실패 시 안전하게 종료
            }
        }

        for (int ef = 0; ef <= 360; ef += 10) {
            String urlStr = "https://apihub.kma.go.kr/api/typ03/cgi/dfs/nph-qpf_ana_img" +
                    "?eva=2" +
                    "&tm=" + timeStr +
                    "&qpf=B" +
                    "&ef=" + ef +
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
                    "&authKey=" + authKey;

            try (InputStream in = new URL(urlStr).openStream()) {
                String fileName = String.format("vstfFrames_%s_%03d.png", timeStr, ef);
                Path filePath = saveDir.resolve(fileName);
                Files.copy(in, filePath, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("✅ 초단기예측영상 저장 완료: " + filePath.toAbsolutePath());

                // 상대 경로 저장 (필요에 따라 절대 경로로 변경 가능)
                vSTFFrames.add("/videoFrames/" + fileName);

            } catch (Exception e) {
                System.err.println("❌ 초단기예측영상 저장 실패: ef=" + ef + ", 메시지: " + e.getMessage());
                e.printStackTrace();
            }
        }

        vSTFFramesDTO.setVSTFFrames(vSTFFrames);
        System.out.println("📦 VSTF Frames 저장 경로 목록: " + vSTFFramesDTO.getVSTFFrames());

        return vSTFFramesDTO.getVSTFFrames();
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
