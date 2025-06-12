import React, {useEffect, useState} from "react";

export default function AddressSelector() {
    const [addressData, setAddressData] = useState(null); // 초기값 null

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/coords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address: "서울특별시 강남구 논현동" }),
            });
            const data = await res.json();
            console.log("응답 받은 위경도:", data);
            setAddressData(data); // 위경도 저장
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-4">
            <p>주소 : 서울특별시 강남구 논현동</p>
            {addressData ? (
                <div>
                    <p>📍 위도: {addressData.lat}</p>
                    <p>📍 경도: {addressData.lon}</p>
                </div>
            ) : (
                <p>좌표 불러오는 중...</p>
            )}
        </div>
    );
}