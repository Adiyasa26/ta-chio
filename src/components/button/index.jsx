import './style.scss'

const BUTTON_TYPE_CLASSES = {
  inverted: 'inverted',
  kembali: 'kembali'
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ``}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
