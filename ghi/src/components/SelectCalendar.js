import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SelectCalendar() {
  const days = [...Array(31).keys()];
  const weekdays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const weeks = [1, 2, 3, 4];

  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleWeekClick = (week) => {
    if (selectedWeeks.length === 2 && !selectedWeeks.includes(week)) {
      Swal.fire(
        "Maximum Weeks Reached",
        "Please unselect another week to choose a different one.",
        "warning"
      );
      return;
    }

    const updatedSelectedWeeks = selectedWeeks.includes(week)
      ? selectedWeeks.filter((selectedWeek) => selectedWeek !== week)
      : [...selectedWeeks, week];

    setSelectedWeeks(updatedSelectedWeeks);
  };

  const handleDayClick = (day) => {
    if (selectedDays.length === 5 && !selectedDays.includes(day)) {
      Swal.fire(
        "Maximum Days Reached",
        "Please unselect another day to choose a different one.",
        "warning"
      );
      return;
    }

    const updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedSelectedDays);
  };

  const confirmSchedule = async () => {
    if (selectedDays.length === 0) {
      Swal.fire(
        "No Days Selected",
        "Please select at least one day before confirming the schedule.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "Confirm schedule?",
      text: "Are you sure you want to schedule this event?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Selected Days:", selectedDays);
        setSelectedDays([]);
        setSelectedWeeks([]);
        Swal.fire("Scheduled!", "The event has been scheduled.", "success");
      }
    });
  };

  return (
    <div>
      <h3 className="text-center mt-16 mb-8">Select day(s)</h3>
      <div className="grid grid-cols-8 mx-auto max-w-xl">
        <div className="font-bold mb-2"></div>
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="flex items-center justify-center font-bold mb-2"
          >
            {weekday}
          </div>
        ))}
        {days.map((day) => {
          const isSelected =
            selectedWeeks.includes(Math.floor(day / 7) + 1) &&
            selectedDays.includes(day + 1);
          return (
            <div
              key={day}
              className={`border border-gray-300 rounded h-16 flex items-center justify-center hover:scale-105 duration-300 transition-all font-semibold ${
                isSelected ? "bg-blue-100" : ""
              }`}
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <div>
          <span>Select 2 weeks: </span>
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => handleWeekClick(week)}
              className={`rounded-2xl border-2 border-gray-300 p-2 mx-1 hover:bg-blue-100 font-semibold hover:scale-105 transition-all duration-200 ${
                selectedWeeks.includes(week) ? "bg-blue-100" : ""
              }`}
            >
              Week {week}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <span>Select up to 5 days: </span>
          {selectedWeeks.length > 0 &&
            days
              .filter(
                (day) =>
                  Math.floor(day / 7) + 1 === selectedWeeks[0] ||
                  Math.floor(day / 7) + 1 === selectedWeeks[1]
              )
              .map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayClick(day + 1)}
                  className={`rounded-full border-2 border-gray-300 py-1 px-3 mx-1 hover:bg-blue-100 font-semibold hover:scale-105 transition-all duration-200 ${
                    selectedDays.includes(day + 1) ? "bg-blue-100" : ""
                  }`}
                >
                  {day + 1}
                </button>
              ))}
        </div>
      </div>
      <div className="justify-center flex items-center mt-8">
        <button
          onClick={confirmSchedule}
          className="rounded-2xl border-2 border-gray-300 p-2 hover:bg-blue-100 font-semibold hover:scale-105 transition-all duration-200"
        >
          Confirm Schedule
        </button>
      </div>
    </div>
  );
}
