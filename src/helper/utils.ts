import type { NewQuoteType, QuoteType } from "../types/QuoteType";

export const startEndDates = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayDate = new Date(year, month, 1);
  const lastDayDate = new Date(year, month + 1, 0);

  return {
    startDate: firstDayDate.toISOString(),
    endDate: lastDayDate.toISOString(),
  };
};

export const aggregateQuotesByDay = (
  quotes: QuoteType[],
  draftquotes: NewQuoteType[],
  startDate: Date,
  endDate: Date,
) => {
  const aggregatedData: {
    [date: string]: { count: number /*totalCost: number*/ };
  } = {};

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split("T")[0];
    aggregatedData[dateKey] = { count: 0 /*totalCost: 0*/ };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  quotes.forEach((quote) => {
    const dateKey = quote.quote_date.split("T")[0];
    if (aggregatedData[dateKey]) {
      aggregatedData[dateKey].count++;
    }
    //   aggregatedData[dateKey].totalCost += quote.cost;
  });

  draftquotes.forEach((quote) => {
    const dateKey = quote.quote_date.split("T")[0];
    if (aggregatedData[dateKey]) {
      aggregatedData[dateKey].count++;
    }
  });

  return aggregatedData;
};

export const selectQuotesByDate = (quotes: QuoteType[], targetDate: string) => {
  return quotes.filter((quote) => {
    const quoteDate = new Date(quote.quote_date).toISOString().split("T")[0];
    return quoteDate === targetDate;
  });
};

export const selectDraftQuotesByDate = (
  quotes: NewQuoteType[],
  targetDate: string,
) => {
  return quotes.filter((quote) => {
    const quoteDate = new Date(quote.quote_date).toISOString().split("T")[0];
    return quoteDate === targetDate;
  });
};

export const getDayLabel = (date: Date) => {
  const today = new Date();

  const isToday = today.toDateString() === date.toDateString();
  if (isToday) {
    return "TODAY";
  }

  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return dayOfWeek;
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr: string = minutes < 10 ? "0" + minutes : minutes.toString();

  const formattedTime = hours + ":" + minutesStr + ampm;
  return formattedTime;
}

export function shortenID(id: string) {
  const firstPart = id.slice(0, 5);

  const lastPart = id.slice(-3);

  return `${firstPart}_${lastPart}`;
}

export function calculateTotalAmount(
  quote: QuoteType | NewQuoteType | undefined,
) {
  let totalAmount = 0;

  if (quote === undefined) return;

  quote.sections.forEach((section) => {
    section.section_data.forEach((data) => {
      if (section.section_currency.currency === "NGN") {
        totalAmount += data.amount / section.section_currency.exchange_rate;
      } else {
        totalAmount += data.amount;
      }
    });
  });

  return totalAmount;
}

export function calculateSumTotal(quotes: QuoteType[]): number {
  let sumTotal = 0;

  quotes.forEach((quote) => {
    const totalAmount = calculateTotalAmount(quote);
    if (totalAmount) sumTotal += totalAmount;
  });

  return sumTotal;
}

export function getQuotesForDate(
  quotes: QuoteType[],
  targetDate: Date,
): QuoteType[] {
  return quotes.filter((quote) => {
    const quoteDate = new Date(quote.quote_date);
    return (
      quoteDate.getUTCFullYear() === targetDate.getUTCFullYear() &&
      quoteDate.getUTCMonth() === targetDate.getUTCMonth() &&
      quoteDate.getUTCDate() === targetDate.getUTCDate()
    );
  });
}

export const combineDateAndTime = (date: string, time: string) => {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  );
};

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export const formatTSDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate.replace(day.toString(), `${day}${ordinalSuffix}`);
};

export const formatTSTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${hours % 12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

export function isCurrencyValid(currency: string) {
  return currency === "USD" || currency === "NGN";
}

export const deepCopy = (obj: any) => { // eslint-disable-line
  return JSON.parse(JSON.stringify(obj));
};
