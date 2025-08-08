const Button = ({ children, type = 'button', disabled = false, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button