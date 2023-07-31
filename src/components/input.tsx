import { useId } from "react";

interface InputProps {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  label: string;
}

function Input({ type, name, label, placeholder }: InputProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-900">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full mt-1 border-gray-400 rounded placeholder:text-gray-400 focus-within:border-pink-500 focus-within:ring-pink-500"
      />
    </div>
  );
}

export default Input;
