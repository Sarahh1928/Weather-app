// services/date-utils.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {

  // Get the ISO week number (1–52) for a given date
  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  // Find how many weeks the selected date is ahead/behind the current week
  getWeekOffsetFromDate(selected: Date, reference: Date = new Date()): number {
    const dayOfWeek = reference.getDay() || 7;
    const startOfCurrentWeek = new Date(reference);
    startOfCurrentWeek.setDate(reference.getDate() - dayOfWeek + 1);

    const selectedDayOfWeek = selected.getDay() || 7;
    const startOfSelectedWeek = new Date(selected);
    startOfSelectedWeek.setDate(selected.getDate() - selectedDayOfWeek + 1);

    const diffDays = Math.floor((startOfSelectedWeek.getTime() - startOfCurrentWeek.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
  }

  // Generate the 7 date strings (YYYY-MM-DD) for a specific week offset
  generateWeekDates(weekOffset: number): string[] {
    const dates: string[] = [];
    const startDay = new Date();
    startDay.setDate(startDay.getDate() + weekOffset * 7);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      const yyyy = day.getFullYear();
      const mm = String(day.getMonth() + 1).padStart(2, '0');
      const dd = String(day.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
    }

    return dates;
  }
}
