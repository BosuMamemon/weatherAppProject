import React, { useEffect, useState } from "react";
import useWeatherStore from "../store/useWeatherStore.jsx";

export default function KoreaWeatherMap() {
    const { location, observation, forecast } = useWeatherStore(state => state.states);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (!location.x || !location.y) {
            console.warn("❗ 위치 정보가 없습니다", location);
        }

        const loadKakaoMapScript = async () => {
            try {
                console.log("🔄 Kakao 지도 API 키 요청 중...");
                const res = await fetch("/api/config/kakao-js-key");
                const { key } = await res.json();
                console.log("✅ 받아온 Kakao JS Key:", key);

                const script = document.createElement("script");
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
                script.async = true;

                script.onload = () => {
                    console.log("✅ Kakao 지도 SDK 로드 완료");
                    window.kakao.maps.load(() => {
                        setScriptLoaded(true);
                    });
                };

                script.onerror = () => {
                    console.error("❌ Kakao Map 스크립트 로드 실패");
                };

                document.head.appendChild(script);
            } catch (error) {
                console.error("❌ 지도 API 키 요청 실패:", error);
            }
        };

        loadKakaoMapScript();
    }, []);

    useEffect(() => {
        if (!scriptLoaded) {
            console.log("⏳ 지도 스크립트가 아직 로딩되지 않음");
            return;
        }

        console.log("🚀 지도 로딩 시작 with 위치:", location);

        const container = document.getElementById("map");
        if (!container) {
            console.error("❌ map div가 존재하지 않습니다");
            return;
        }

        const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(location.x, location.y),
            level: 3,
        });

        const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(location.x, location.y),
        });
        marker.setMap(map);

        console.log("실황 관측값 : " + observation)
        const temp = observation.T1H ? `${observation.T1H}°` : '--°'
        const desc = observation?.weather ?? "정보 없음";
        const shortForecast = forecast?.[0];
        const fcstTime = shortForecast?.fcstTime || "";
        const fcstText = shortForecast ? `${shortForecast.category}: ${shortForecast.fcstValue}` : "";

        const content = `
            <div style="padding:8px;font-size:14px;">
                📍 관측 실황<br/>
                - 날씨: ${desc}<br/>
                - 기온: ${temp}℃<br/>
                📅 예보 (${fcstTime})<br/>
                - ${fcstText}
            </div>
        `;

        const infowindow = new window.kakao.maps.InfoWindow({ content });
        infowindow.open(map, marker);
    }, [scriptLoaded, location.lat, location.lon, observation, forecast]);

    return <div id="map" style={{ width: "100%", height: "400px" }} />;
}
