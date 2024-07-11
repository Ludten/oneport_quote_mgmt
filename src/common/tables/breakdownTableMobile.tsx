import type { Section } from "../../types/QuoteType";

const BreakdownTableMobile = ({ sectionData }: { sectionData: Section }) => {
  const totalAmount = sectionData.section_data.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl text-[#4B5563] font-medium">
        {sectionData.section_name}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionData.section_data.map((item, index) => (
          <div key={index} className="py-4 border-t grid grid-cols-2 gap-2">
            <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
              Basis:
            </div>
            <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
              {item.basis}
            </div>
            <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
              Unit of Measure:
            </div>
            <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
              {item.unit_of_measurement}
            </div>
            <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
              Unit:
            </div>
            <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
              {item.unit}
            </div>
            <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
              Rate ({sectionData.section_currency.currency}):
            </div>
            <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
              {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
              {item.rate}
            </div>
            <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
              Amount ({sectionData.section_currency.currency}):
            </div>
            <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
              {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
              {item.amount}
            </div>
          </div>
        ))}
      </div>
      <div className="py-4 grid grid-cols-2 gap-2 md:w-1/2">
        <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
          Sub Total:
        </div>
        <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
          {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
          {totalAmount}
        </div>
      </div>
    </div>
  );
};

export default BreakdownTableMobile;
