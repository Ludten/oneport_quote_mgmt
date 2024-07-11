import type { Section } from "../../types/QuoteType";

const BreakdownTable = ({ sectionData }: { sectionData: Section }) => {
  const totalAmount = sectionData.section_data.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl text-[#4B5563] font-medium">
        {sectionData.section_name}
      </h4>
      <div className="min-w-full grid border-t">
        <div className="text-sm text-[#9CA3AF]  grid grid-cols-5 py-2">
          <div className=" border-r ">Basis</div>
          <div className="px-4 border-r ">Unit of Measure</div>
          <div className="px-4 border-r ">Unit</div>
          <div className="px-4 border-r ">
            Rate ({sectionData.section_currency.currency})
          </div>
          <div className="px-4 border-r ">
            Amount ({sectionData.section_currency.currency})
          </div>
        </div>
        {sectionData.section_data.map((item, index) => (
          <div
            key={index}
            className={`text-[#1F2937] ${index == 0 ? "border-t" : ""}  grid grid-cols-5 py-2`}
          >
            <div className="border-r">{item.basis}</div>
            <div className="px-4 border-r">{item.unit_of_measurement}</div>
            <div className="px-4 border-r text-right">{item.unit}</div>
            <div className="px-4 border-r text-right">
              {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
              {item.rate}
            </div>
            <div className="px-4 border-r text-right">
              {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
              {item.amount}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-5 py-2">
          <div></div>
          <div></div>
          <div></div>
          <div className="flex items-center justify-end text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF] px-4">
            Sub Total:
          </div>
          <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF] px-4 text-right">
            {sectionData.section_currency.currency === "NGN" ? "₦" : "$"}
            {totalAmount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakdownTable;
