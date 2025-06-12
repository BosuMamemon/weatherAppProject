package com.example.weather_app_project_server.Controller;

import com.example.weather_app_project_server.Service.KakaoMapService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CoordinateController {

    private final KakaoMapService kakaoMapService;

    public CoordinateController(KakaoMapService kakaoMapService) {
        this.kakaoMapService = kakaoMapService;
    }

    @PostMapping("/coords")
    public ResponseEntity<Map<String, Double>> getCoords(@RequestBody Map<String, String> body) {
        String address = body.get("address");
        Map<String, Double> coords = kakaoMapService.getCoordinatesByAddress(address);
        return ResponseEntity.ok(coords);
    }

    @Value("${kakao.api.js-key}")
    private String kakaoJsKey;

    @GetMapping("/config/kakao-js-key")
    public Map<String, String> getKakaoJsKey() {
        return Map.of("key", kakaoJsKey);
    }

}