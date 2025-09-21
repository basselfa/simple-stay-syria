import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useLanguage } from "@/contexts/LanguageContext";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Arabic number conversion
const toArabicNumbers = (num: number): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
};

function CalendarArabic({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const { t, isRTL } = useLanguage();

  // Arabic month names
  const monthNames = [
    t('calendar.january'), t('calendar.february'), t('calendar.march'), t('calendar.april'),
    t('calendar.may'), t('calendar.june'), t('calendar.july'), t('calendar.august'),
    t('calendar.september'), t('calendar.october'), t('calendar.november'), t('calendar.december')
  ];

  // Arabic day names
  const dayNames = [
    t('calendar.sunday'), t('calendar.monday'), t('calendar.tuesday'), t('calendar.wednesday'),
    t('calendar.thursday'), t('calendar.friday'), t('calendar.saturday')
  ];

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-center",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: isRTL ? "absolute right-1" : "absolute left-1",
        nav_button_next: isRTL ? "absolute left-1" : "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "text-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />,
        CaptionLabel: ({ displayMonth }) => (
          <div className="text-sm font-medium text-center">
            {monthNames[displayMonth.getMonth()]} {toArabicNumbers(displayMonth.getFullYear())}
          </div>
        ),
        Head: () => (
          <thead>
            <tr className="flex">
              {dayNames.map((day, index) => (
                <th key={index} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        ),
        Day: ({ date, displayMonth }) => {
          const dayNumber = date.getDate();
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          // Simple fix: use any type to avoid TypeScript errors
          const selected = (props as any).selected;
          const isSelected = selected && selected.getTime && date.getTime() === selected.getTime();
          const isToday = date.getTime() === today.getTime();
          const isOutsideMonth = date.getMonth() !== displayMonth.getMonth();
          
          // Check if date is disabled
          let isDisabled = false;
          if (props.disabled) {
            if (typeof props.disabled === 'function') {
              isDisabled = props.disabled(date);
            } else if (Array.isArray(props.disabled)) {
              isDisabled = props.disabled.some(d => d.getTime() === date.getTime());
            } else if (props.disabled instanceof Date) {
              isDisabled = props.disabled.getTime() === date.getTime();
            }
          }
          
          return (
            <button
              className={cn(
                "h-9 w-9 p-0 font-normal text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                isOutsideMonth && "text-muted-foreground opacity-50",
                isToday && "text-foreground",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
              )}
              disabled={isDisabled}
              onClick={() => {
                // Simple fix: use any type to avoid TypeScript error
                const onSelect = (props as any).onSelect;
                if (onSelect) {
                  onSelect(date);
                }
              }}
            >
              {toArabicNumbers(dayNumber)}
            </button>
          );
        },
      }}
      {...props}
    />
  );
}
CalendarArabic.displayName = "CalendarArabic";

export { CalendarArabic }; 