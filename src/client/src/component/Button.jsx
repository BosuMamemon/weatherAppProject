import "./Button.css";

const Button = ({ text, type, onClick, style }) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    return (
        <button
            className={["Button", `Button_${btnType}`].join(" ")}
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    );
};
Button.defaultProps = {
    type: "default",
};
export default Button;
