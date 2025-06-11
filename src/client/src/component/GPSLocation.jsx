import React, { useState, useEffect } from 'react';

export default function GPSLocation() {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (err) => {
                setError('위치 정보를 가져오는 데 실패했습니다: ' + err.message);
            }
        );
    }, []);

    return (
        <div>
            <h2>현재 위치 정보</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : location.lat !== null && location.lon !== null ? (
                <>
                    <p>위도: {location.lat}</p>
                    <p>경도: {location.lon}</p>
                </>
            ) : (
                <p>위치 정보를 불러오는 중...</p>
            )}
        </div>
    );
}