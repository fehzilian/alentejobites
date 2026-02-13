import React, { useState } from 'react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  availability?: Record<string, number>; // Maps 'YYYY-MM-DD' to number of booked spots
  maxCapacity?: number;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate, availability = {}, maxCapacity = 12 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    const today = new Date();
    // Prevent going back past current month
    if (currentMonth.getMonth() > today.getMonth() || currentMonth.getFullYear() > today.getFullYear()) {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateKey = clickedDate.toISOString().split('T')[0];
    const bookedCount = availability[dateKey] || 0;

    if (clickedDate >= today && bookedCount < maxCapacity) {
      onDateSelect(clickedDate);
    }
  };

  const renderDays = () => {
    const days = [];
    // Empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = date < today;
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();

      // Availability Logic
      const dateKey = date.toISOString().split('T')[0];
      const bookedCount = availability[dateKey] || 0;
      const isSoldOut = bookedCount >= maxCapacity;
      const spotsLeft = maxCapacity - bookedCount;
      const isLowStock = spotsLeft <= 4 && !isSoldOut;

      let dotColor = 'bg-green-400';
      if (isSoldOut) dotColor = 'bg-gray-300'; // actually hide it or make it grey
      else if (isLowStock) dotColor = 'bg-orange-400';

      const isDisabled = isPast || isSoldOut;

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDayClick(day)}
          disabled={isDisabled}
          className={`h-10 w-10 relative text-sm rounded-full flex flex-col items-center justify-center transition-all duration-200
            ${isDisabled ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'hover:bg-cream font-medium text-charcoal'}
            ${isSelected ? '!bg-terracotta !text-white font-bold shadow-md hover:!bg-terracotta' : ''}
            ${isSoldOut && !isPast ? 'opacity-40 decoration-slash' : ''}
          `}
        >
          {day}
          {/* Availability Dot */}
          {!isPast && !isSoldOut && !isSelected && (
              <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${dotColor}`}></span>
          )}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm select-none">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:text-terracotta transition-colors text-gray-400">
             ←
        </button>
        <span className="font-serif font-bold text-olive">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="p-1 hover:text-terracotta transition-colors text-gray-400">
             →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="h-8 w-10 flex items-center justify-center text-xs font-bold text-gray-400">
                {d}
            </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-400">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> Available</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Selling Fast</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Sold Out</div>
      </div>
    </div>
  );
};