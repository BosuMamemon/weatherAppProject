import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../Button.jsx";

export default function VideoFrames({videoUrl, videoTitle, startTime, FrameTerm}) {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        axios.get(videoUrl)
            .then((resp) => setImageUrls(resp.data))
            .catch((err) => console.error("위성 이미지 가져오기 실패", err));
    }, []);

    useEffect(() => {
        if (isPlaying && imageUrls.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % imageUrls.length);
            }, 300);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, imageUrls]);

    const togglePlayback = () => {
        setIsPlaying(prev => !prev);
    };

    const handleSliderChange = (e) => {
        setCurrentIndex(Number(e.target.value));
    };

    // 시간 텍스트
    const getTimeText = (idx) => {
        const base = startTime;
        const time = base + idx * FrameTerm;
        const h = String(Math.floor(time / 60)).padStart(2, '0');
        const m = String(time % 60).padStart(2, '0');
        return `${h}:${m}`;
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '360px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                fontWeight: 'bold',
                fontSize: '16px'
            }}>
                <span> {videoTitle} </span>
            </div>

            {imageUrls.length > 0 && (
                <div style={{ position: 'relative' }}>
                    <img
                        src={imageUrls[currentIndex]}
                        alt={`Frame ${currentIndex}`}
                        style={{ width: '100%', display: 'block' }}
                    />

                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '6px',
                        padding: '8px',
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '12px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Button
                                text={isPlaying ? "⏸" : "▶"}
                                type={isPlaying ? "negative" : "positive"}
                                onClick={togglePlayback}
                                style={{ padding: "4px 10px", fontSize: "14px" }}
                            />
                            <input
                                type="range"
                                min="0"
                                max={imageUrls.length - 1}
                                value={currentIndex}
                                onChange={handleSliderChange}
                                style={{ flex: 1, marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: '4px'
                        }}>
                            <span>{getTimeText(0)}</span>
                            <span>{getTimeText(Math.floor(imageUrls.length / 2))}</span>
                            <span>{getTimeText(imageUrls.length - 1)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
