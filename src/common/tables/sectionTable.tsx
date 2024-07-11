import { useState } from "react";
import GenericInput from "../inputs/genericInput";
import SelectInput from "../inputs/selectInput";

import trash from "../../assets/img/trash.svg";

import type {
  Section,
  SectionCurrency,
  SectionData,
} from "../../types/QuoteType";
import QuoteCurrency from "../quoteCurrency";
import SectionCurr from "../modals/sectionCurrency";

const SectionTable = ({
  sections,
  onUpdateSections,
}: {
  sections: Section[];
  onUpdateSections: (updatedSections: Section[]) => void;
}) => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [sectionCurrency, setSectionCurrency] = useState<boolean>(false);
  const [secIndex, setSecIndex] = useState<number | null>(null);
  const handleAddSection = () => {
    const newSection: Section = {
      section_name: "",
      section_number: sections.length + 1,
      section_data: [],
      section_currency: {
        currency: "USD",
        exchange_rate: 1,
        is_base_currency: false,
        customer_currency: "NGN",
      },
    };
    onUpdateSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    onUpdateSections(updatedSections);
  };

  const handleAddSectionDataField = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].section_data.push({
      basis: "",
      unit_of_measurement: "",
      unit: 0,
      rate: 0,
      amount: 0,
    });
    onUpdateSections(updatedSections);
  };

  const handleRemoveSectionDataField = (
    sectionIndex: number,
    fieldIndex: number,
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].section_data.splice(fieldIndex, 1);
    onUpdateSections(updatedSections);
  };

  const handleInputChange = (
    sectionIndex: number,
    fieldIndex: number | null,
    field:
      | keyof SectionData
      | keyof SectionCurrency
      | "section_name"
      | "section_number",
    value: string | number | boolean,
  ) => {
    const updatedSections = [...sections];
    if (fieldIndex !== null) {
      (updatedSections[sectionIndex].section_data[fieldIndex][
        field as keyof SectionData
      ] as typeof value) = value;

      if (field === "unit" || field === "rate") {
        const unit =
          updatedSections[sectionIndex].section_data[fieldIndex].unit;
        const rate =
          updatedSections[sectionIndex].section_data[fieldIndex].rate;
        updatedSections[sectionIndex].section_data[fieldIndex].amount =
          unit * rate;
      }
    } else {
      if (field in updatedSections[sectionIndex]) {
            (updatedSections[sectionIndex] as any)[field] = value; // eslint-disable-line
      } else {
            (updatedSections[sectionIndex].section_currency as any)[field] = value; // eslint-disable-line
      }
    }
    onUpdateSections(updatedSections);
  };

  const openSectionCurrency = (ssection: Section, idx: number) => {
    setSelectedSection(ssection);
    setSecIndex(idx);
    setSectionCurrency(true);
  };

  const closeSectionCurrency = () => {
    setSelectedSection(null);
    setSecIndex(null);
    setSectionCurrency(false);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {sections.map((section, sectionIndex) => (
        <div
          key={section._id || sectionIndex}
          className=" flex flex-col gap-10"
        >
          <div className="w-full flex justify-between items-start">
            <div className="w-[70%] flex flex-col border border-[#F3F4F6]">
              <div
                className={`flex p-4 ${sectionIndex == 0 ? "justify-start" : "justify-between"}`}
              >
                <label className="text-xl text-[#4B5563] font-medium">
                  <GenericInput
                    type="text"
                    placeholder="Enter Section Label"
                    value={section.section_name}
                    onChange={(value) =>
                      handleInputChange(
                        sectionIndex,
                        null,
                        "section_name",
                        value,
                      )
                    }
                  />
                </label>
                {sectionIndex !== 0 && (
                  <button
                    className="flex justify-center items-center text-xs px-1 text-[#C70024]"
                    onClick={() => handleRemoveSection(sectionIndex)}
                  >
                    Remove Section
                  </button>
                )}
              </div>
              <div className="min-w-full grid border-t">
                <div className="text-sm text-[#6B7280] bg-[#F9FAFB] grid grid-cols-6 py-2 h-12">
                  <div className="px-4 border-r my-auto">Basis</div>
                  <div className="px-4 border-r my-auto">Unit of Measure</div>
                  <div className="px-4 border-r my-auto">Unit</div>
                  <div className="px-4 border-r flex gap-2 items-center">
                    Rate{" "}
                    <span className="w-9 h-5 flex justify-center items-center bg-[#E5E7EB] rounded">
                      {section.section_currency.currency}
                    </span>
                  </div>
                  <div className="px-4 border-r flex gap-2 items-center">
                    Amount{" "}
                    <span className="w-9 h-5 flex justify-center items-center bg-[#E5E7EB] rounded">
                      {section.section_currency.currency}
                    </span>
                  </div>
                  <div className="px-4 border-r my-auto"> </div>
                </div>
                {section.section_data.map((field, fieldIndex) => (
                  <div
                    key={`${section._id || sectionIndex}-${fieldIndex}`}
                    className={`text-[#1F2937] ${fieldIndex == 0 ? "border-t" : ""}  grid grid-cols-6 py-2 h-12 border-b border-[#E6E7ECB2]`}
                  >
                    <div className="px-4 border-r border-[#E6E7ECB2]">
                      <GenericInput
                        type="text"
                        placeholder="Enter Basis"
                        value={field.basis}
                        onChange={(value) =>
                          handleInputChange(
                            sectionIndex,
                            fieldIndex,
                            "basis",
                            value,
                          )
                        }
                      />
                    </div>
                    <div className="px-4 border-r border-[#E6E7ECB2]">
                      <SelectInput
                        placeholder="Unit of Measure"
                        value={field.unit_of_measurement}
                        options={[
                          "Per Kilogram",
                          "Per Consignment",
                          "Per Shipment",
                        ]}
                        onChange={(value) =>
                          handleInputChange(
                            sectionIndex,
                            fieldIndex,
                            "unit_of_measurement",
                            value,
                          )
                        }
                      />
                    </div>
                    <div className="px-4 border-r border-[#E6E7ECB2] text-right">
                      <GenericInput
                        type="number"
                        placeholder="Enter Unit"
                        value={field.unit}
                        onChange={(value) =>
                          handleInputChange(
                            sectionIndex,
                            fieldIndex,
                            "unit",
                            parseInt(String(value)),
                          )
                        }
                      />
                    </div>
                    <div className="px-4 border-r border-[#E6E7ECB2] text-right">
                      <GenericInput
                        type="number"
                        placeholder="Enter Rate"
                        value={field.rate}
                        onChange={(value) =>
                          handleInputChange(
                            sectionIndex,
                            fieldIndex,
                            "rate",
                            parseFloat(String(value)),
                          )
                        }
                      />
                    </div>
                    <div className="px-4 border-r border-[#E6E7ECB2] text-right">
                      <GenericInput
                        type="number"
                        placeholder="Enter Amount"
                        value={field.amount}
                        onChange={(value) =>
                          handleInputChange(
                            sectionIndex,
                            fieldIndex,
                            "amount",
                            parseFloat(String(value)),
                          )
                        }
                      />
                    </div>
                    <div className="px-4 border-r border-[#E6E7ECB2] text-right">
                      {fieldIndex !== 0 && (
                        <>
                          <div className="flex justify-end px-4">
                            <button
                              className="w-4"
                              onClick={() =>
                                handleRemoveSectionDataField(
                                  sectionIndex,
                                  fieldIndex,
                                )
                              }
                            >
                              <img src={trash} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div className="p-4 flex justify-start">
                  <div className="text-[#1F2937] flex justify-end items-end px-1">
                    <button
                      className="px-3 py-1 text-[#00861E] rounded-md text-sm flex gap-2 items-center"
                      onClick={() => handleAddSectionDataField(sectionIndex)}
                    >
                      <div className="w-3.5 h-3.5 rounded flex justify-center items-center text-white bg-[#00861E]">
                        +
                      </div>
                      Add new basis
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <QuoteCurrency
                section={section}
                sectionCurrency={openSectionCurrency}
                sectionIndex={sectionIndex}
              />
            </div>
          </div>
          <div className="w-[70%] border-t h-px bg-[#E6E7EC]" />
        </div>
      ))}
      <div className=" w-[70%] flex justify-center items-center">
        <button
          className="w-full px-3 py-1 bg-[#37B2481A] text-[#00861E] rounded flex justify-center items-center gap-2"
          onClick={handleAddSection}
        >
          <div className="w-3.5 h-3.5 rounded flex justify-center items-center text-white bg-[#00861E]">
            +
          </div>
          Add New Section
        </button>
      </div>
      <SectionCurr
        isOpen={sectionCurrency}
        onClose={closeSectionCurrency}
        section={selectedSection}
        sectionIndex={secIndex}
        onchange={handleInputChange}
      />
    </div>
  );
};

export default SectionTable;
