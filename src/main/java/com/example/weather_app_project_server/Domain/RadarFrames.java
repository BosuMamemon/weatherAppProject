package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Data
@Log4j2
@RequiredArgsConstructor
public class RadarFrames {

    private List<String> radarFrames;

}
