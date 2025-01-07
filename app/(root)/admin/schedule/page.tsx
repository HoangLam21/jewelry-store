"use client";
import Headers from "@/components/shared/header/Headers";
import React, { useEffect, useState } from "react";
import { Schedule } from "@/dto/ScheduleDTO";
import { fetchSchedule } from "@/lib/service/schedule.service";

const Page = () => {
  const [schedules, setSchedules] = useState<Schedule[] | []>([]);

  useEffect(() => {
    const fetchSchedulesData = async () => {
      const schedules = await fetchSchedule();
      if (schedules) {
        setSchedules(schedules);
      } else {
        setSchedules([]);
      }
    };
    fetchSchedulesData();
  }, []);

  const handleExport = async () => {};
  const handleAddSchedule = async () => {};
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Work schedule"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Category"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddSchedule}
        type={2}
      ></Headers>
      <div className=""></div>
    </div>
  );
};

export default Page;
