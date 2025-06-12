package com.example.weather_app_project_server.repository;

import com.example.weather_app_project_server.Domain.Xys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface XysRepository extends JpaRepository<Xys, Long> {
    // 위도/경도 기준으로 가장 가까운 위치 1개만 찾기
    @Query("SELECT x FROM Xys x ORDER BY " +
            "SQRT(POWER(x.latitude - :latitude, 2) + POWER(x.longtitude - :longitude, 2)) ASC " +
            "LIMIT 1")
    Optional<Xys> findClosestOneByLatitudeLongitude(@Param("latitude") double latitude,
                                                    @Param("longitude") double longitude);

}
