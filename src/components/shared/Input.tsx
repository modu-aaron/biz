interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: any;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  id,
  type = "text",
  placeholder = "",
  register,
  required = false,
  disabled = false,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      {...register(id, { required })}
      className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
        disabled ? "bg-gray-100" : "bg-white"
      } ${className}`}
    />
  );
};

export default Input;
