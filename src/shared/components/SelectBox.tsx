import { Controller } from "react-hook-form";

const SelectBox = ({ name, label, options, control }) => {
  return (
    <div className="max-w-sm">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            className="border w-full border-neutral-100 text-sm min-w-40 rounded-sm block py-2 pl-2"
          >
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectBox;
