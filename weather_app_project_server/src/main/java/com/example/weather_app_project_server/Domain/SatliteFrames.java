package com.example.weather_app_project_server.Domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Data
@Builder
@Log4j2
public class SatliteFrames {

    private List<String> satliteFrames;

}
