package com.example.weather_app_project_server.Controller;

import com.example.weather_app_project_server.Domain.RadarFrames;
import com.example.weather_app_project_server.Domain.SatliteFrames;
import com.example.weather_app_project_server.Service.VideoImageDownloaderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VideoImagedownloaderController {

    private final VideoImageDownloaderService downloader;

    public VideoImagedownloaderController(VideoImageDownloaderService downloader) {
        this.downloader = downloader;
    }

    // Radar Frames 전달
    @GetMapping("/downloadRadarFramss")
    public String triggerRadarDownload() {
        try {
            downloader.downloadRadarImages();
            return "Radar Image 다운로드 성공";
        } catch (Exception e) {
            return "실패: " + e.getMessage();
        }
    }

    // Satlite Frames 전달
    @GetMapping("/downloadSatliteFrames")
    public String triggerSatliteDownload() {
        try {
            downloader.downloadSatliteImages();
            return "Satlite Image 다운로드 성공";
        } catch (Exception e) {
            return "실패: " + e.getMessage();
        }
    }


}
