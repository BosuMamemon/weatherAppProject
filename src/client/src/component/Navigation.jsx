import { NavLink } from "react-router-dom";
import './Navigation.css';
import AddressLookup from "./AddressSelector.jsx";

export default function Navigation() {
    return (
        <div className="navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <i className="bi bi-cloud-sun"></i> 단기예보
            </NavLink>
            <NavLink to="/index" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <i className="bi bi-droplet-half"></i> 미세먼지&생활지수
            </NavLink>
            <NavLink to="/map" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <i className="bi bi-map"></i> 전국날씨지도
            </NavLink>
            <NavLink to="/info" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <i className="bi bi-info-circle"></i> 소식&지식
            </NavLink>

        </div>
    );
}
