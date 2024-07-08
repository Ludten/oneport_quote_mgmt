import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Calendar from "./calendar";

import { fetchQuotesStart } from "../store/slice/AppSlice";

import type { RootState } from "../store/rootStore";
import Loader from "../common/loader";
import ErrorPage from "../common/error";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const quotes = useSelector((state: RootState) => state.AppSlice.quotes);
  const loading = useSelector((state: RootState) => state.AppSlice.loading);
  const errmess = useSelector((state: RootState) => state.AppSlice.error);

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();


  useEffect(() => {
    const firstDayDate = new Date(Date.UTC(year, month, 1));
    const lastDayDate = new Date(Date.UTC(year, month + 1, 0));
    dispatch(fetchQuotesStart({ startDate: firstDayDate.toISOString(), endDate: lastDayDate.toISOString() }));
  }, [dispatch, currentDate, month, year]);

  if (loading) {
    <Loader/>
  }

  if (errmess) {
    <ErrorPage err={errmess}/>
  }
  
    const changeMonth = (increment: number) => {
      const newDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + increment, 1));
      setCurrentDate(newDate);
    };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-1 lg:px-10 py-10 lg:py-14">
      <div className="flex flex-col gap-4 lg:gap-8">
        <header className="flex flex-col lg:flex-row justify-center text-center lg:justify-between lg:items-start gap-4 text-white">
          <div className="flex flex-col lg:items-start">
            <h1 className="text-2xl text-[#1F2937] dark:text-white font-semibold">All Existing Quotes</h1>
            <span className="text-xs text-[#6B7280] dark:text-white hidden lg:block">View all created quotes</span>
          </div>
          <div className="calendar-header flex justify-between items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="gg-chevron-left order-1 lg:order-2"></button>
            <h2 className="text-2xl font-semibold text-[#1F2937] dark:text-white order-2 lg:order-1">{currentDate.toLocaleString('default', { month: 'long' })} <span className="text-[#00861E]">{year}</span></h2>
            <button onClick={() => changeMonth(1)} className="gg-chevron-right order-3"></button>
          </div>
        </header>
        <main className="w-full">
          <Calendar currentDate={currentDate} quotes={quotes} />
        </main>
      </div>
    </div>
  );
};

export default Index;
