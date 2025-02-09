interface InputProps {
  placeholder: string;
  reference?: any;
  inputType: string;
}

export function Input({ placeholder, reference, inputType }: InputProps) {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      type={inputType === "text" ? "text" : "password"}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    />
  );
}
