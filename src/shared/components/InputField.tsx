import { UseFormRegister } from "react-hook-form";

interface InputFieldProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const InputField = ({
  label,
  id,
  type = "text",
  placeholder = "",
  register,
  required = false,
  error,
  disabled = false,
  className = "",
}: InputFieldProps) => {
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...register(id, { required })}
        className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
          disabled ? "bg-gray-100" : "bg-white"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
