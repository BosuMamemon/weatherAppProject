// 풍향(도)을 화살표로 변환하는 함수
export const getWindDirectionArrow = (direction) => {
    if (!direction || direction === '' || direction === '0') return '🔘';

    const degree = parseInt(direction);

    // 8방위로 구분
    if (degree >= 337.5 || degree < 22.5) return '⬆️'; // 북
    else if (degree >= 22.5 && degree < 67.5) return '↗️'; // 북동
    else if (degree >= 67.5 && degree < 112.5) return '➡️'; // 동
    else if (degree >= 112.5 && degree < 157.5) return '↘️'; // 남동
    else if (degree >= 157.5 && degree < 202.5) return '⬇️'; // 남
    else if (degree >= 202.5 && degree < 247.5) return '↙️'; // 남서
    else if (degree >= 247.5 && degree < 292.5) return '⬅️'; // 서
    else if (degree >= 292.5 && degree < 337.5) return '↖️'; // 북서

    return '⬆️'; // 기본값
};

export const getSkyCondition = (skyCode) => {
    switch(skyCode) {
        case '1': return '맑음';
        case '3': return '구름많음';
        case '4': return '흐림';
        default: return '알 수 없음';
    }
};

export const getPrecipitationType = (ptyCode) => {
    switch(ptyCode) {
        case '0': return '없음';
        case '1': return '비';
        case '2': return '비/눈';
        case '3': return '눈';
        case '5': return '빗방울';
        case '6': return '빗방울눈날림';
        case '7': return '눈날림';
        default: return '알 수 없음';
    }
};

export const formatTime = (time) => {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
};
