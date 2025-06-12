package com.example.weather_app_project_server.Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class KakaoMapService {

    @Value("${kakao.api.key}")
    private String kakaoApiKey;

    public Map<String, Double> getCoordinatesByAddress(String address) {
        String url = UriComponentsBuilder.fromHttpUrl("https://dapi.kakao.com/v2/local/search/address.json")
                .queryParam("query", address)
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoApiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        try {
            JSONObject obj = new JSONObject(response.getBody());
            JSONArray documents = obj.getJSONArray("documents");

            if (documents.isEmpty()) {
                throw new RuntimeException("주소에 대한 좌표를 찾을 수 없습니다: " + address);
            }

            JSONObject location = documents.getJSONObject(0);
            double lon = location.getDouble("x");
            double lat = location.getDouble("y");

            return Map.of("lat", lat, "lon", lon);
        } catch (Exception e) {
            throw new RuntimeException("Kakao 지도 API 파싱 실패", e);
        }
    }
}