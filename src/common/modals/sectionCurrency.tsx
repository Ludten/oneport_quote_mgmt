import CountryFlag from "react-country-flag";

import close from "../../assets/img/close.svg";
import CurrencySelect from "../inputs/currencySelect";
import type {
  Section,
  SectionCurrency,
  SectionData,
} from "../../types/QuoteType";
import ErrorPage from "../error";
import { Currencies } from "../../data/currency";
import { isCurrencyValid } from "../../helper/utils";

const SectionCurr = ({
  isOpen,
  onClose,
  section,
  sectionIndex,
  onchange,
}: {
  isOpen: boolean;
  onClose: () => void;
  section: Section | null;
  sectionIndex: number | null;
  onchange: (
    sectionIndex: number,
    fieldIndex: number | null,
    field:
      | keyof SectionData
      | keyof SectionCurrency
      | "section_name"
      | "section_number",
    value: string | number | boolean,
  ) => void;
}) => {
  if (section === null) return <ErrorPage err="no active section" />;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black-50 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        className={`bg-white border border-[#E9E9E9] shadow-xl transform transition-transform duration-300 
           w-full sm:w-[28.5rem] h-auto mx-auto flex flex-col rounded-[0.625rem]`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="h-20 w-full flex justify-between items-center border-b px-5">
            <div className="flex flex-col justify-start items-start text-xl gap-1">
              <h3 className="text-[#1F2937] font-semibold">
                Set Section Currency
              </h3>
              <span className="text-xs text-[#6B7280]">
                Kindly set a currency and rate
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex justify-center items-center w-9 h-9"
            >
              <img src={close} className="w-4" />
            </button>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-5 p-6">
              <div className="w-full flex flex-col gap-3">
                <label className="text-[#4B5563] text-xs">
                  Select Currency
                </label>
                <CurrencySelect
                  disable={false}
                  value={section.section_currency.currency}
                  onChange={(value) => {
                    if (sectionIndex !== null)
                      onchange(sectionIndex, null, "currency", value);
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <span className="text-[#4B5563] text-sm">
                  Is this the base currency?
                </span>
                <div className="flex gap-6 items-center text-[#1F2937] text-sm">
                  <div
                    onClick={() => {
                      if (sectionIndex !== null)
                        onchange(sectionIndex, null, "is_base_currency", true);
                    }}
                    className="flex gap-2 items-center"
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={section.section_currency.is_base_currency}
                      className="accent-[#139C33]"
                    />
                    <label>Yes, it is.</label>
                  </div>
                  <div
                    onClick={() => {
                      if (sectionIndex !== null)
                        onchange(sectionIndex, null, "is_base_currency", false);
                    }}
                    className="flex gap-2 items-center"
                  >
                    <input
                      type="checkbox"
                      checked={!section.section_currency.is_base_currency}
                      readOnly
                      className="accent-[#139C33]"
                    />
                    <label>No</label>
                  </div>
                </div>
                <div className="w-full flex gap-2.5 items-start text-[#005BC2]">
                  <div className="w-4 min-w-4 h-4 flex justify-center items-center border-2 border-[#005BC2] rounded text-xs font-serif">
                    i
                  </div>
                  <span className="text-xs">
                    <b>Note,</b> Base currency is the currency the customer will
                    make payment in.
                  </span>
                </div>
              </div>
              <div className="h-px bg-[#F3F4F6]"></div>
              <div
                aria-disabled={section.section_currency.is_base_currency}
                className={`w-full flex flex-col gap-6 ${section.section_currency.is_base_currency ? " opacity-50" : ""}`}
              >
                <div className="w-full flex flex-col gap-3">
                  <label className="text-[#4B5563] text-xs">
                    Customers Currency
                  </label>
                  <CurrencySelect
                    disable={section.section_currency.is_base_currency}
                    value={section.section_currency.customer_currency}
                    onChange={(value) => {
                      if (sectionIndex !== null)
                        onchange(
                          sectionIndex,
                          null,
                          "customer_currency",
                          value,
                        );
                    }}
                  />
                </div>
                <div className="relative w-full flex flex-col gap-3">
                  <label className="text-[#4B5563] text-xs">Enter Rate</label>
                  <input
                    required
                    disabled={section.section_currency.is_base_currency}
                    type="number"
                    value={section.section_currency.exchange_rate}
                    onChange={(value) => {
                      if (sectionIndex !== null)
                        onchange(
                          sectionIndex,
                          null,
                          "exchange_rate",
                          parseFloat(value.target.value),
                        );
                    }}
                    className="w-full h-11 px-10 py-3 border border-[#E5E7EB] rounded text-[#1F2937] font-medium placeholder:text-[#1F293780] outline-none"
                  />
                  <div className="absolute top-3.5 left-2 h-full flex items-center pointer-events-none">
                    <CountryFlag
                      countryCode={
                        isCurrencyValid(
                          section.section_currency.customer_currency,
                        )
                          ? Currencies[
                              section.section_currency.customer_currency
                            ]
                          : ""
                      }
                      svg
                      className="w-6 h-6 mr-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20 border-t border-[#F3F4F6] flex justify-center items-center px-8">
              <button
                onClick={onClose}
                className="w-full h-11 flex justify-center items-center bg-[#1F2937] shadow-lg text-white rounded font-medium"
              >
                <span>Set section currency</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCurr;
