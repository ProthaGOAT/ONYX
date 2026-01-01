interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

const Button = ({ children, variant = 'primary', isLoading, ...props }: ButtonProps) => {
  const baseStyles = "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex justify-center items-center";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-white hover:bg-pink-700 shadow-md",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
  };

  return (
    <button 
      {...props} 
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
};

export default Button;