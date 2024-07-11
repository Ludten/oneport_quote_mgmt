import { useState } from "react";
import { useDispatch } from "react-redux";

import { addDraftQuote } from "../../store/slice/draftQuotesSlice";

import close from "../../assets/img/close.svg";

import type { NewQuoteType } from "../../types/QuoteType";
import { combineDateAndTime } from "../../helper/utils";

const CreateQuote = ({
  isOpen,
  onClose,
  quotesdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  quotesdate: string;
}) => {
  const dispatch = useDispatch();

  const [quote, setQuote] = useState<NewQuoteType>({
    id: String(Date.now()),
    quote_title: "",
    quote_date: "",
    endTime: "",
    sections: [],
  });

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleAddQuote = () => {
    const startDateTime = combineDateAndTime(quotesdate, startTime);
    const endDateTime = combineDateAndTime(quotesdate, endTime);

    dispatch(
      addDraftQuote({
        ...quote,
        quote_date: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      }),
    );
    window.location.href = `/newquote/${quote.id}`;
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
           w-full sm:w-[28.5rem] h-[27.875rem] mx-auto flex flex-col rounded-[0.625rem]`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="h-20 w-full flex justify-between items-center border-b px-5">
            <div className="flex flex-col justify-start items-start text-xl gap-1">
              <h3 className="text-[#1F2937] font-semibold">Quote Details</h3>
              <span className="text-xs text-[#6B7280]">
                Enter quote name and time
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
            <div className="w-full flex flex-col gap-8 p-6">
              <div className="w-full flex flex-col gap-3">
                <label className="text-[#4B5563] text-xs">
                  Enter Quote Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter quote title here"
                  value={quote.quote_title}
                  onChange={(e) =>
                    setQuote({ ...quote, quote_title: e.target.value })
                  }
                  className="w-full h-11 px-4 py-3 border border-[#E5E7EB] rounded text-[#1F2937] font-medium placeholder:text-[#1F293780] outline-none"
                />
              </div>
              <div className="flex w-full max-w-full gap-4">
                <div className="flex flex-1 flex-col gap-3">
                  <label className="text-[#4B5563] text-xs">Start Time</label>
                  <input
                    required
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-[3.25rem] px-2 py-3 sm:px-4  border border-[#E5E7EB] rounded text-[#1F2937] font-medium placeholder:text-[#1F293780] outline-none"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <label className="text-[#4B5563] text-xs">End Time</label>
                  <input
                    required
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="h-[3.25rem] px-2 py-3 sm:px-4 border border-[#E5E7EB] rounded text-[#1F2937] font-medium placeholder:text-[#1F293780] outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center px-8 py-6 border-t border-[#E5E7EB]">
              <button
                onClick={handleAddQuote}
                className="w-full h-11 flex justify-center items-center bg-[#007003] shadow-lg text-white rounded font-medium"
              >
                <span>Create New Quote</span>
              </button>
              <button
                onClick={onClose}
                className="w-full h-11 flex justify-center items-center text-[#E11435] font-medium"
              >
                <span>cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;
