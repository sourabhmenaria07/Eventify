import React, { forwardRef, useId } from 'react'

function Input({
    label = '',
    placeholder = "",
    type = "text",
    className = "",
    ...props
}, ref)  
{
    const id = useId()
  return (
    <div>
        {label && <label htmlFor={id} className='block text-sm font-medium mb-1 text-body'>{label}</label>}
        <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={
        `w-full px-3 py-2 outline-none bg-input text-body rounded-lg border
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-[var(--color-primary)] 
        focus:border-transparent
        transition-all duration-200 
        dark:placeholder:text-gray-500              
         ${className}`}
        {...props}
        ref={ref}
        />
    </div>
  )
}

export default forwardRef(Input);