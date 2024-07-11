import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootStore";
import {
  removeDraftQuote,
  selectQuoteById,
  updateDraftQuote,
} from "../store/slice/draftQuotesSlice";
import { createQuoteStart } from "../store/slice/QuoteSlice";

import ErrorPage from "../common/error";
import TimeSetter from "../common/modals/timeSetter";

import SectionTable from "../common/tables/sectionTable";
import SectionTableMobile from "../common/tables/sectionTableMobile";
import DraftQuoteDetails from "../common/modals/draftQuoteDetails";

import {
  deepCopy,
  formatDate,
  formatTSDate,
  formatTSTime,
} from "../helper/utils";

import type { NewQuoteType, Section } from "../types/QuoteType";

const EditDraftQuote = () => {
  const dispatch = useDispatch();
  const params = useParams();
  if (!params.id || params.id === undefined) {
    <>
      <ErrorPage err="no quote id" />
    </>;
  }

  const goBack = () => {
    // dispatch(removeDraftQuote(params.id ?? ''));
    window.location.href = "/";
  };

  const quote = useSelector((state: RootState) =>
    selectQuoteById(state, params.id !== undefined ? params.id : ""),
  );

  if (quote == undefined) {
    <>
      <ErrorPage err="no quote id" />
    </>;
  }

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(quote !== undefined ? quote.quote_date : ""),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(quote?.endTime !== undefined ? quote.endTime  : ""),
  );
  const [timeSet, setTimeSet] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);

  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [quoteDetails, setQuoteDetails] = useState(false);

  const openQuoteDetails = async () => {
    if (quote) {
      let newquote: NewQuoteType = {
        ...quote,
        sections,
      };
      if (startDate)
        newquote = { ...newquote, quote_date: startDate.toISOString() };
      if (endDate) newquote = { ...newquote, endTime: endDate.toISOString() };
      dispatch(updateDraftQuote(newquote));
      setQuoteDetails(true);
    }
  };

  const closeQuoteDetails = () => {
    setQuoteDetails(false);
  };

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

  useEffect(() => {
    setSections(deepCopy(quote?.sections));
  }, [quote?.sections]);

  const handleUpdateSections = (updatedSections: Section[]) => {
    setSections(updatedSections);
  };

  const openTimeSet = () => {
    setTimeSet(true);
  };

  const closeTimeSet = () => {
    setTimeSet(false);
  };

  const handleUpdateDraft = () => {
    if (quote) {
      let newquote: NewQuoteType = {
        ...quote,
        sections,
      };
      if (startDate)
        newquote = { ...newquote, quote_date: startDate.toISOString() };
      if (endDate) newquote = { ...newquote, endTime: endDate.toISOString() };
      dispatch(updateDraftQuote(newquote));
      alert("Saved to Draft.");
    }
  };

  const saveQuote = () => {
    if (quote) {
      let newquote: NewQuoteType = {
        ...quote,
      };
      if (startDate)
        newquote = { ...newquote, quote_date: startDate.toISOString() };
      if (endDate)
        newquote = { ...newquote, quote_date: endDate.toISOString() };
      newquote = { ...newquote, sections: sections };
      dispatch(updateDraftQuote(newquote));
      dispatch(
        createQuoteStart({
          newQuote: newquote,
          date: new Date(newquote.quote_date),
        }),
      );
      alert("Saved");
      handleRemoveDraft(quote.id);
    }
  };

  const handleRemoveDraft = async (id: string) => {
    window.location.href = "/";
    setTimeout(() => {
      dispatch(removeDraftQuote(id));
    }, 20);
  };

  return (
    <div className="min-h-screen bg-white px-1 lg:px-10 pb-10">
      <div className="flex flex-col gap-4 lg:gap-8">
        <header className="flex flex-col lg:flex-row justify-center text-center lg:justify-between lg:items-center gap-4 text-white bg-[#FAFAFA] border border-[#FAFAFA] py-6">
          <div className="flex flex-col lg:items-start">
            <button
              onClick={goBack}
              className="hidden lg:flex items-center gap-4"
            >
              <div className="gg-chevron-left !w-1" />
              <span className="text-xs text-[#6B7280]">Back to quotes</span>
            </button>
            <div className="flex flex-col lg:flex-row lg:items-start text-2xl">
              <h1 className="text-[#1F2937] font-medium">
                {quote?.quote_title}
              </h1>
              <span className="text-[#9CA3AF]">[{formatDate(new Date())}]</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={goBack}
              className="flex lg:hidden items-center gap-4"
            >
              <div className="gg-chevron-left !w-1" />
              <span className="text-xs text-[#6B7280]">Back to quotes</span>
            </button>
            <div className="flex justify-between items-center gap-2 lg:gap-6">
              <button
                onClick={handleUpdateDraft}
                className="w-28 h-10 flex justify-center items-center text-[#6B7280] text-sm border border-[#F3F4F6] rounded"
              >
                Save as draft
              </button>
              <button
                onClick={openQuoteDetails}
                className="w-28 h-10 flex justify-center items-center bg-[#37B24833] text-[#005C00] text-sm rounded"
              >
                Preview
              </button>
            </div>
          </div>
        </header>
        <div className="w-full">
          <div className="w-full flex flex-col">
            <div className="w-full lg:w-[70%] flex items-center justify-center lg:justify-start gap-2 rounded-tl rounded-tr bg-[#F9FAFB] px-2 lg:px-4 py-1 lg:py-2 h-12">
              <div className="flex py-0.5 lg:gap-2.5 items-center flex-col lg:flex-row">
                <span className="text-[#374151] text-xs font-medium">
                  Change Quote Time
                </span>
                <div className="relative">
                  <button
                    onClick={openTimeSet}
                    className="relative flex items-center text-xs font-[#776D7D] border border-[#DBE3DC] rounded-[2rem] gap-1 h-7 px-1.5 lg:px-3 py-0.5 lg:py-1.5"
                  >
                    <span className="text-[#007003]">
                      {formatTSDate(startDate ? startDate : new Date())}
                    </span>
                    <span className="text-[#776D7D]">
                      {formatTSTime(startDate ? startDate : new Date())} -{" "}
                      {formatTSTime(endDate ? endDate : new Date())}
                    </span>
                    <div className="flex w-5 justify-center items-center relative">
                      <div className="gg-chevron-down !w-0.5 !h-0.5" />
                    </div>
                  </button>
                  {timeSet && (
                    <TimeSetter
                      startDate={startDate}
                      endDate={endDate}
                      onStartDateChange={setStartDate}
                      onEndDateChange={setEndDate}
                      onClose={closeTimeSet}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:gap-10">
              {isDesktop ? (
                <SectionTable
                  sections={sections}
                  onUpdateSections={handleUpdateSections}
                />
              ) : (
                <SectionTableMobile
                  sections={sections}
                  onUpdateSections={handleUpdateSections}
                />
              )}
              <div className="w-full lg:w-[70%] border-t h-px bg-[#E6E7EC]" />
              <div className="w-full lg:w-[70%] flex justify-between items-center px-5">
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => handleRemoveDraft(params.id !== undefined ? params.id : "")}
                    className="w-28 h-10 flex justify-center items-center text-sm text-[#C70024] border border-[#E5E7EB] bg-[#F9FAFB] rounded"
                  >
                    Cancel
                  </button>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -top-[3.125rem]">
                      <div className="absolute z-0 w-6 h-6 bg-[#333333] rotate-45 top-5 left-1/2 transform -translate-x-1/2"></div>
                      <div className="relative bg-[#333333] text-white text-xs text-center rounded px-2 py-1 w-48 z-10">
                        You will lose all the data inputted if you cancel
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={saveQuote}
                  className="w-32 h-10 flex justify-center items-center bg-[#109B32] text-sm rounded"
                >
                  Save Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DraftQuoteDetails
        isOpen={quoteDetails}
        onClose={closeQuoteDetails}
        quoteid={params.id !== undefined ? params.id : ""}
      />
    </div>
  );
};

export default EditDraftQuote;
