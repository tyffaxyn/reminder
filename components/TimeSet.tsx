'use client'
import { useEffect, useMemo } from 'react';
import { updateThisReminder } from '@/actions/reminders';

export type ItemProps = {
  id: string;
  createdAt: Date;
  title: string;
  day: string;
  time: string,
  ackedAt: Date;
}

const TimeSet = ({ id, day, time, title, ackedAt }: ItemProps) => {
  const timeDisplay = useMemo(() => {
    const [h, m] = time.split(':');
    return `${h}:${m}`;
  }, [time]);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    const date = new Date();
    const currentDay = date.toLocaleString('en-GB', { weekday: 'long' });

    if (currentDay === day) {
      const reminderTime = new Date();
      const [h, m] = time.split(':');
      reminderTime.setHours(parseInt(h));
      reminderTime.setMinutes(parseInt(m));
      reminderTime.setSeconds(0);
      const diffTime = reminderTime.getTime() - date.getTime();
      const acknowledgeTime = new Date(ackedAt).getTime();

      if (acknowledgeTime < reminderTime.getTime()) {
        timeOut = setTimeout(() => {
          alert(`Reminder for ${title} at ${h}:${m} is due`);
          updateThisReminder(id);
        }, diffTime > 0 ? diffTime : 300);
      }
    }

    return () => {
      clearTimeout(timeOut);
    }
  }, [time, day, title, id])


  return (
    <time>
      {timeDisplay}
    </time>
  )
}

export default TimeSet;
