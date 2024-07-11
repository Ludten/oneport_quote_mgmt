const GenericInput = ({
  type,
  value,
  placeholder,
  checked,
  onChange,
}: {
  type: string;
  value: string | number | boolean;
  placeholder?: string;
  checked?: boolean;
  onChange: (value: string | number | boolean) => void;
}) => {
  return (
    <input
      type={type}
      className="outline-none rounded-md px-2 py-1 w-full text-[#374151] placeholder:text-[#9CA3AF]"
      placeholder={placeholder}
      value={typeof value === "boolean" ? undefined : value}
      checked={typeof value === "boolean" ? value : checked}
      onChange={(e) =>
        onChange(type === "checkbox" ? e.target.checked : e.target.value)
      }
    />
  );
};

export default GenericInput;
