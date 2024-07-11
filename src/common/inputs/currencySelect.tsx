import CountryFlag from "react-country-flag";
import { Currencies } from "../../data/currency";
import { isCurrencyValid } from "../../helper/utils";
import type { CurrencyOption } from "../../types/AppType";

const options: CurrencyOption[] = [
  { value: "NGN", flagCode: "NG", prefix: "₦" },
  { value: "USD", flagCode: "US", prefix: "$" },
];

const CurrencySelect = ({
  disable,
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
  disable: boolean;
}) => {
  return (
    <div className="w-full relative">
      <select
        className="block w-full p-2 pl-8 border text-[#1F2937] border-[#E5E7EB] rounded bg-white outline-none"
        onChange={(e) => onChange(e.target.value)}
        disabled={disable}
        value={value || ""}
      >
        <option value="" disabled>
          Select a currency
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <div className="absolute -top-3.5 left-2 h-full flex items-center pointer-events-none">
        <CountryFlag
          countryCode={isCurrencyValid(value) ? Currencies[value] : ""}
          svg
          className="w-6 h-6 mr-2"
        />
      </div>
    </div>
  );
};

export default CurrencySelect;
