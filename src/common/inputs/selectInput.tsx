const SelectInput = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <select
      className="outline-none rounded-md px-2 py-1 bg-white w-full text-[#374151] placeholder:text-[#9CA3AF]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
