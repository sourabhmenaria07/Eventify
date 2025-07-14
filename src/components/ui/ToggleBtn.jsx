import React, { useState } from "react";
import { Controller } from "react-hook-form";

function ToggleBtn({
  name,
  control,
  labels = ["Free", "Paid"],
  // onToggle,
  defaultValue = "Free",
  className = "",
}) {
  //   const handleToggle = (index) => {
  //     setActiveIndex(index);
  //     onToggle?.(labels[index]);
  //   };
  return (
    <Controller
      name={name || "isClick"}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const activeIndex = labels.indexOf(value);

        return (
          <div className={`flex items-center space-x-4 mx-2 ${className}`}>
            {labels.map((label, index) => (
              <span
                key={label}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  index === activeIndex
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  onChange(label);
                }}
              >
                {label}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

export default ToggleBtn;
