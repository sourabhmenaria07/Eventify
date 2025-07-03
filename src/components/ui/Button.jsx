function Button({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`px-4 py 2 rounded-xl font-medium transition-all duration-200 bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed
         ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
