import { forwardRef, useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="mx-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-2 text-body"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3 py-2 rounded-lg bg-input text-body outline-none border
          focus:outline-none
          focus:ring-1 focus:ring-[var(--color-primary)] 
          focus:border-transparent
          transition-all duration-200 
          ${className}`}
        ref={ref}
        defaultValue=""
        {...props}
      >
        {" "}
        <option value="" disabled hidden>
          --Choose here--
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
