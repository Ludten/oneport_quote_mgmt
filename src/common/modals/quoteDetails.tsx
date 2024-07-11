import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/rootStore";

import ErrorPage from "../error";

import BreakdownTable from "../tables/breakdownTable";
import BreakdownTableMobile from "../tables/breakdownTableMobile";
import { handlePrint } from "../../helper/print";

import { calculateTotalAmount, shortenID } from "../../helper/utils";

import close from "../../assets/img/delete.png";
import download from "../../assets/img/download.png";
import logo from "../../assets/img/oneport365.png";

const QuoteDetails = ({
  isOpen,
  onClose,
  quoteid,
}: {
  isOpen: boolean;
  onClose: () => void;
  quoteid: string;
}) => {
  const quotes = useSelector((state: RootState) => state.AppSlice.quotes);
  const quote = quotes.find((quote) => quote._id === quoteid);

  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  if (quote === undefined) {
    <ErrorPage err={"No qoute found"} />;
  }

  const totalAmount = calculateTotalAmount(quote);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const editQuote = (id: string) => {
    window.location.href = `/editquote/${id}`;
  };

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
           w-full lg:max-w-4xl xl:max-w-6xl min-[1440px]:max-w-7xl h-[80vh] mx-auto flex flex-col rounded-[0.625rem]`}
      >
        <div className="w-full h-auto flex flex-col items-center">
          <div className="py-4 lg:py-0 lg:px-5 lg:h-[4.75rem] w-full flex flex-col lg:flex-row-reverse justify-between items-center gap-5 bg-[#E9E9E933] border-b border-[#E9E9E933]">
            <div className="px-4 lg:px-0 flex justify-between items-center lg:gap-3 h-full w-full lg:w-auto">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => editQuote(quote !== undefined ? quote._id : "")}
                  className="flex px-4 py-2 justify-center items-center w-[6.25] h-9 text-xs font-medium rounded-3xl bg-[#296FD8]"
                >
                  Edit Quote
                </button>
                <button
                  onClick={handlePrint}
                  className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#296FD8]"
                >
                  <img src={download} className="w-5" />
                </button>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#E5E7EB]"
              >
                <img src={close} className="w-5" />
              </button>
            </div>
            <div className="flex justify-center items-center text-xl gap-3">
              <h3 className="text-[#1F2937] font-medium">Quote Details</h3>
              <span className="text-[#6B7280]">
                #{shortenID(quote !== undefined ? quote._id : "")}
              </span>
            </div>
          </div>
        </div>
        <div
          id="preview-content"
          className="relative flex flex-1 w-full h-full rounded-lg p-5 lg:py-10 lg:px-20 bg-white overflow-scroll no-scrollbar"
        >
          <div className="relative flex flex-col justify-start items-stretch w-full h-fit flex-1 px-2 py-4 lg:py-8 lg:px-8 border border-[#E5E7EB] rounded-xl gap-5 lg:gap-12">
            <div className="relative flex w-full justify-between items-start">
              <img src={logo} className="block max-w-28 sm:max-w-xs" />
              <div className="flex flex-col items-end text-[#6B7280] text-sm sm:text-base">
                <span>UAC Building Marina</span>
                <span>Lagos, Nigeria</span>
                <span>100223</span>
              </div>
            </div>
            <div className="relative flex flex-col w-full justify-center items-center bg-[#F9FAFB] rounded-2xl">
              <div className="relative w-full px-3 py-5 lg:px-6 lg:py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-3 lg:gap-y-6 text-center lg:text-start">
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">
                    Attention (Customer Name)
                  </span>
                  <span className="text-[#1F2937]">Daniel Alobode</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">Email Address</span>
                  <span className="text-[#007003]">ample@mail.com</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">Commodity</span>
                  <span className="text-[#1F2937]">Electric goods</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">Service Type</span>
                  <span className="text-[#1F2937]">Export Air Frieght</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">Service Type</span>
                  <span className="text-[#1F2937]">55.34KG</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">
                    POL (Port of Loading)
                  </span>
                  <span className="text-[#1F2937]">Lagos City</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#9CA3AF]">
                    POD (Port of Destination)
                  </span>
                  <span className="text-[#1F2937]">Johannesburg</span>
                </div>
                <div className="flex flex-col items-start gap-2 text-start">
                  <span className="text-xs text-[#E11435]">Due Date</span>
                  <span className="text-[#1F2937]">23rd, March 2024</span>
                </div>
              </div>
              <div className="w-[95%] border-t border-[#E5E7EB]"></div>
              <div className="relative flex w-full flex-col sm:flex-row justify-start sm:justify-between items-start gap-4 lg:gap-0 px-3 py-5 lg:px-6 lg:py-10">
                <div className="flex flex-col items-start gap-2 text-start sm:max-w-[65%]">
                  <span className="text-xs text-[#9CA3AF]">
                    Collection Address
                  </span>
                  <span className="text-[#1F2937]">
                    INNIO Waukesha Gas Engines 8123 116th Street, Suite 300, SW
                    Side of Building, Dock 46-50, Pleasant Prairie, WI 53158
                  </span>
                </div>
                <div className="flex flex-col item-start lg:items-end gap-2">
                  <span className="text-xs text-[#9CA3AF]">
                    Delivery Destination
                  </span>
                  <span className="text-[#1F2937]">TPG PH</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h3 className="text-sm text-[#9CA3AF]">Quote Breakdown</h3>
              <div className="w-full flex flex-col gap-5 lg:gap-12">
                {isDesktop
                  ? quote?.sections.map((item, index) => (
                      <div key={item.section_name + index}>
                        <BreakdownTable sectionData={item} />
                      </div>
                    ))
                  : quote?.sections.map((item, index) => (
                      <div key={item.section_name + index}>
                        <BreakdownTableMobile sectionData={item} />
                      </div>
                    ))}
              </div>
              {isDesktop ? (
                <div className="grid grid-cols-5 py-2">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="flex items-center justify-end text-sm text-[#9CA3AF] col-span-1 border-r border-[9CA3AF] px-4">
                    ALL-IN Door to Door (USD)
                  </div>
                  <div className="flex items-center justify-end text-[#1F2937] col-span-1 border-r border-[9CA3AF] px-4">
                    ${totalAmount !== undefined ? totalAmount.toFixed(2) : ""}
                  </div>
                </div>
              ) : (
                <div className="py-4 grid grid-cols-2 gap-2 md:w-1/2">
                  <div className="text-xs text-[#9CA3AF] col-span-1 border-r border-[9CA3AF]">
                    ALL-IN Door to Door (USD)
                  </div>
                  <div className="text-[#1F2937] col-span-1 border-r border-[9CA3AF]">
                    ${totalAmount !== undefined ? totalAmount.toFixed(2) : ""}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
