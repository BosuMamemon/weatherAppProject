package com.example.weather_app_project_server.Controller;

import com.example.weather_app_project_server.Service.VideoImageDownloaderService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/video")
public class VideoImagedownloaderController {

    private final VideoImageDownloaderService downloaderService;

    public VideoImagedownloaderController(VideoImageDownloaderService downloaderService) {
        this.downloaderService = downloaderService;
    }

    //veryShortTermForcast Frames 전달
    @GetMapping("/downloadVSTFFrames")
    public ResponseEntity<?> triggerVSTFDownload() {
        try {
            List<String> radarFramesURLList = downloaderService.downloadRadarFrames();
            log.info("radar Frames downloaded");
            return ResponseEntity.ok(radarFramesURLList);
        } catch (Exception e) {
            log.error("레이더 프레임 다운로드 실패", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("실패: " + e.getMessage());
        }
    }




    // Radar Frames 전달
    @GetMapping("/downloadRadarFrames")
    public ResponseEntity<?> triggerRadarDownload() {
        try {
            List<String> radarFramesURLList = downloaderService.downloadRadarFrames();
            log.info("radar Frames downloaded");
            return ResponseEntity.ok(radarFramesURLList);
        } catch (Exception e) {
            log.error("레이더 프레임 다운로드 실패", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("실패: " + e.getMessage());
        }
    }

    // Satlite Frames 전달
    @GetMapping("/downloadSatelliteFrames")
    public ResponseEntity<?> triggerSatliteDownload() {
        try {
            List<String> satliteFramesURLList = downloaderService.downloadSatliteFrames();
            log.info("satellite Frames downloaded");
            return ResponseEntity.ok(satliteFramesURLList);
        } catch (Exception e) {
            log.error("위성 프레임 다운로드 실패", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("실패: " + e.getMessage()); // HTTP 500 + 에러 메시지
        }
    }



}
