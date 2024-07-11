import CountryFlag from "react-country-flag";
import type { Section } from "../types/QuoteType";
import { Currencies } from "../data/currency";
import { isCurrencyValid } from "../helper/utils";

const QuoteCurrency = ({
  section,
  sectionCurrency,
  sectionIndex,
}: {
  section: Section;
  sectionCurrency: (ssection: Section, idx: number) => void;
  sectionIndex: number;
}) => {
  return (
    <div className="w-[19rem] flex flex-col border border-[#E5E7EB] rounded-xl p-5 gap-4">
      <div className="h-10 border-b border-[#F3F4F6] flex items-start justify-between text-[#1F2937]">
        <h4 className="font-medium">Section Currency</h4>
        <div className="flex items-center gap-1">
          <span>{section.section_currency.currency}</span>
          <CountryFlag
            countryCode={
              isCurrencyValid(section.section_currency.currency)
                ? Currencies[section.section_currency.currency]
                : ""
            }
            svg
            className="h-16"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-sm text-[#6B7280]">Currency & Rate</label>
        <div className="flex justify-between">
          <div className="w-[4.125rem] h-10 rounded flex justify-center items-center border border-[#F3F4F6]">
            <CountryFlag
              countryCode={
                isCurrencyValid(section.section_currency.currency)
                  ? Currencies[section.section_currency.currency]
                  : ""
              }
              svg
              className="h-16"
            />
          </div>
          <div className="relative">
            <div className="gg-arrow-right" />
            <div className="gg-arrow-left" />
          </div>
          <div className="w-[10.25rem] h-10 rounded flex gap-2 pl-4 items-center border border-[#F3F4F6] text-[#34373F]">
            <CountryFlag
              countryCode={
                isCurrencyValid(section.section_currency.customer_currency)
                  ? Currencies[section.section_currency.customer_currency]
                  : ""
              }
              svg
              className="h-16"
            />
            {section.section_currency.customer_currency === "NGN" ? "₦" : "$"}
            {section.section_currency.exchange_rate}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          sectionCurrency(section, sectionIndex);
        }}
        className="h-10 flex justify-center items-center bg-[#F3F4F6] text-[#1F2937] rounded"
      >
        Edit section currency
      </button>
    </div>
  );
};

export default QuoteCurrency;
