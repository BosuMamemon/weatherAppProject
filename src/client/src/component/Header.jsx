import './Header.css'
import Navigation from "./Navigation.jsx";
export default function Header({leftChild, rightChild}) {
    return (
        <div className='header'>
            <div className='header_left'>{leftChild}</div>
            <div className='header_title'><Navigation /></div>
            <div className='header_right'>{rightChild}</div>
        </div>
    )
}