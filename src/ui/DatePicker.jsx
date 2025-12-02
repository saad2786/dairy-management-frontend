import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export const DatePicker = ({
  control,
  name,
  placeholder,
  disabled,
  dateRef,
  defaultValue,
  rules
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            className="h-full w-full rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 "
            ref={dateRef}
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            dateFormat="yyyy-MM-dd"
            disabled={disabled}
            placeholderText={placeholder}
          />
        )}
      />
    </>
  );
};
