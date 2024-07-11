import DateTimePicker from "react-datetime-picker";
import "tailwindcss/tailwind.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import close from "../../assets/img/close.svg";

const TimeSetter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClose,
}: {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onClose: () => void;
}) => {
  return (
    <div className="top-5 z-10 absolute text-[#776D7D] p-4 bg-white rounded-lg shadow-md w-72">
      <div className="flex w-full justify-end">
        <button
          onClick={onClose}
          className="flex justify-center items-center z-20"
        >
          <img src={close} className="w-3" />
        </button>
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium text-gray-700">
          Start Time
        </label>
        <DateTimePicker
          onChange={(value: Date | null) => onStartDateChange(value)}
          value={startDate}
          disableClock
          className="w-full mt-1"
        />
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium text-gray-700">
          End Time
        </label>
        <DateTimePicker
          onChange={(value: Date | null) => onEndDateChange(value)}
          value={endDate}
          disableClock
          className="w-full mt-1"
        />
      </div>
    </div>
  );
};

export default TimeSetter;
