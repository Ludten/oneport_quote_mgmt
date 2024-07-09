import { useSelector } from "react-redux";

import { RootState } from "../store/rootStore";

import { formatDate, getDayLabel, selectQuotesByDate } from "../helper/utils";

import sun from '../assets/img/sun-color-icon.svg';
import add from '../assets/img/add-symbol.svg';

const CalendarQuotes = ({ isOpen, onClose, quotesdate }: { isOpen: boolean; onClose: () => void; quotesdate: string }) => {
  const quotes = useSelector((state: RootState) => state.AppSlice.quotes);

  const dateQuotes = selectQuotesByDate(quotes, quotesdate);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed inset-0 bg-inherit bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`bg-[#1F2937] shadow-lg transform transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        } w-full sm:w-[18.75rem] max-w-md md:max-w-lg h-full mx-auto sm:mr-0 mt-[17rem] flex flex-col`}
      >
        <div className="w-full flex flex-col items-center gap-5 flex-grow p-4">
          <div className="w-full flex justify-between">
            <h3 className="text-[#3B82F6] text-[0.8125rem] font-bold">{getDayLabel(new Date(quotesdate))} <span className="font-normal">{formatDate(new Date(quotesdate))}</span></h3>
            <div className="flex items-center gap-1">
                <h4 className="text-[0.8125rem] font-bold">55º/40º</h4>
                <img src={sun} alt="weather" className="w-4" />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="group w-full h-[3.375rem] p-1 flex border border-[#1F2937] bg-inherit rounded hover:bg-[#D0F5FF]">
                <div className="w-[0.3125rem] h-full bg-[#374151] rounded-sm"/>
                <div className="px-1.5 h-full flex flex-col flex-grow justify-between items-start text-xs">
                    <div className="flex w-full justify-between text-[#D0F5FF]">
                        <span className="group-hover:text-[#005BC2]">$2,450.00</span>
                        <div className="px-0.5 rounded bg-[#374151]">9:30AM</div>
                    </div>
                    <span className="text-[#3B82F6] group-hover:text-[#005BC2]">Ocean Freight/Haulage/CBT</span>
                </div>
            </div>
          </div>
          <button
            className="w-full h-9 gap-1 flex justify-center items-center bg-white shadow-lg text-[#1F2937] rounded-lg font-medium"
          >
            <img src={add} className="w-3" />
            <span>Add new quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarQuotes;
