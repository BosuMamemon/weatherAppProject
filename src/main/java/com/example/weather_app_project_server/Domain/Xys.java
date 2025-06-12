package com.example.weather_app_project_server.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Xys {
    @Id
    private long code;
    private String city;
    private String sido;
    private String gugun;
    private int nx;
    private int ny;
    private double latitude;
    private double longtitude;
}
