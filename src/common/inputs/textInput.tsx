const TextInput = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      className="border border-gray-300 rounded-md px-2 py-1"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
