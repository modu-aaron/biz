import { useForm, Controller } from "react-hook-form";

const SelectBox = ({ name, label, options, control, className }) => {
  return (
    <div className="max-w-sm">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select
            {...field}
            id={name}
            className={`${
              className
                ? className
                : 'border border-neutral-100 text-sm min-w-8 rounded-sm block py-2 pl-2"'
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
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

// const Form = () => {
//   const { handleSubmit, control } = useForm();

//   const onSubmit = (data) => {
//     console.log(data); // 제출된 데이터 확인
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <SelectComponent
//         name="country"
//         label="Select an option"
//         control={control}
//         options={[
//           { value: "US", label: "United States" },
//           { value: "CA", label: "Canada" },
//           { value: "FR", label: "France" },
//           { value: "DE", label: "Germany" },
//         ]}
//       />
//       <button
//         type="submit"
//         className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Form;
