import Input from "@/components/shared/Input";

interface InputFieldProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: any;
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
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        register={register}
        required={required}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
