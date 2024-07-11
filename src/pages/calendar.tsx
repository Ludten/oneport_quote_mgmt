import { useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../store/rootStore";

import CalendarQuotes from "../common/modals/calendarQuotes";
import QuoteDetails from "../common/modals/quoteDetails";

import {
  aggregateQuotesByDay,
  calculateSumTotal,
  getDraftQuotesForDate,
  getQuotesForDate,
} from "../helper/utils";

import type { QuoteType } from "../types/QuoteType";
import CreateQuote from "../common/modals/createQuote";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Calendar = ({
  currentDate,
  quotes,
}: {
  currentDate: Date;
  quotes: QuoteType[];
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedQuote, setSelectedQuote] = useState<string>("");
  const [dateQuotes, setDateQuotes] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState(false);
  const [createQuote, setCreateQuote] = useState(false);

  const draftquotes = useSelector(
    (state: RootState) => state.draftQuotesSlice.quotes,
  );

  const openDateQuotes = (quotesdate: string) => {
    setSelectedDate(quotesdate);
    setDateQuotes(true);
  };

  const closeDateQuotes = () => {
    setSelectedDate("");
    setDateQuotes(false);
  };

  const openQuoteDetails = (quoteid: string) => {
    setSelectedQuote(quoteid);
    setQuoteDetails(true);
  };

  const closeQuoteDetails = () => {
    setQuoteDetails(false);
  };

  const openCreateQuote = () => {
    setCreateQuote(true);
  };

  const closeCreateQuote = () => {
    setCreateQuote(false);
  };

  const openDraftQuote = (id: string) => {
    window.location.href = `/editdraftquote/${id}`;
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const firstDay = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1),
  );
  const lastDay = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0),
  );

  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const aggregatedData = aggregateQuotesByDay(
    quotes,
    draftquotes,
    new Date(firstDay),
    new Date(lastDay),
  );

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-7 text-center lg:text-start">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`py-2 lg:p-2 text-[#969696] ${day == "SUN" ? "rounded-tl-md lg:rounded-tl-lg" : ""} ${day == "SAT" ? " rounded-tr-md lg:rounded-tr-lg" : ""} border border-[#E8E8E8]`}
          >
            {day}
          </div>
        ))}
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="border border-[#E8E8E8]"></div>
        ))}
        {Object.keys(aggregatedData).map((date) => {
          const isCurrentDate =
            new Date().getDate() === new Date(date).getDate() &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year;
            const dayQuotes = getQuotesForDate(quotes, new Date(date));
            const dayDraftQuotes = getDraftQuotesForDate(draftquotes, new Date(date));

          return (
            <div
              key={date}
              onClick={() => openDateQuotes(date)}
              className={`lg:h-[8.375rem] flex flex-col py-2 lg:p-2 gap-2 lg:gap-10 items-center lg:items-start 
                    border border-[#E8E8E8] ${selectedDate == date ? "bg-[#1F2937] " : ""}`}
            >
              <div
                className={`${selectedDate == date ? "text-white text-xl" : "text-[#969696] "} font-medium px-2 ${isCurrentDate ? "bg-[#005BC2] rounded-lg" : ""}`}
              >
                {new Date(date).getDate()}
              </div>
              {aggregatedData[date].count > 0 ? (
                <div
                  className={`hidden lg:flex flex-col gap-1 ${selectedDate == date ? "text-white" : "text-[#374151]"} font-medium text-xs`}
                >
                  <span className="p-0.5">
                    {aggregatedData[date].count} Quotes
                  </span>
                  <span
                    className={`border ${selectedDate == date ? "border-white bg-white text-[#374151]" : "border-[#98FF9B40] bg-[#98FF9B40] "} rounded p-0.5`}
                  >
                    Total: ${(calculateSumTotal(dayQuotes) + calculateSumTotal(dayDraftQuotes)).toFixed(2)}
                  </span>
                </div>
              ) : null}
              {aggregatedData[date].count > 0 ? (
                <div className="block lg:hidden w-3 aspect-square border border-[#98FF9B40] bg-[#98FF9B40] rounded-full" />
              ) : (
                <div className="block lg:hidden w-3 aspect-square" />
              )}
            </div>
          );
        })}
      </div>
      <CalendarQuotes
        isOpen={dateQuotes}
        onClose={closeDateQuotes}
        openQuote={openQuoteDetails}
        createQuote={openCreateQuote}
        quotesdate={selectedDate}
        openDraft={openDraftQuote}
      />
      <QuoteDetails
        isOpen={quoteDetails}
        onClose={closeQuoteDetails}
        quoteid={selectedQuote}
      />
      <CreateQuote
        isOpen={createQuote}
        onClose={closeCreateQuote}
        quotesdate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
