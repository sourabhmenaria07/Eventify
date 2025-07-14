function Textarea({
  label = "Event Description",
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className="mx-2">
      <label className="block text-sm font-medium mb-2 text-body">
        {label}
      </label>
      <textarea
        rows={5}
        className="w-full px-3 py-2 border rounded-lg bg-input text-body shadow-sm placeholder:text-gray-400
        focus:outline-none
        focus:ring-2 
        focus:ring-[var(--color-primary)] 
        focus:border-transparent
        transition-all duration-200 
        dark:placeholder:text-gray-500
        text-sm resize-y"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default Textarea;
