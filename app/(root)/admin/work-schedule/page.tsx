"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@nextui-org/calendar";
import Headers from "@/components/shared/header/Headers";
import ScheduleList from "@/components/admin/schedule/ScheduleList";
import { Schedule } from "@/dto/ScheduleDTO";
import { fetchSchedule } from "@/lib/service/schedule.service";
const Page = () => {
  const [schedules, setSchedules] = useState<Schedule[] | []>([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      const schedules = await fetchSchedule();
      if (schedules) {
        setSchedules(schedules);
      } else {
        setSchedules([]);
      }
    };
    fetchScheduleData();
  }, []);

  const handleExport = async () => {};

  const handleAddSchedule = async () => {};
  return (
    <div className="w-full h-screen flex flex-col flex-1 p-4">
      <Headers
        title="Voucher"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Voucher"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddSchedule}
        type={2}
      ></Headers>
      <div className="flex flex-row flex-1 w-full h-full">
        <div className="flex items-center justify-center h-full">
          <Calendar color="primary"  calendarWidth={300} weekdayStyle="narrow"/>
        </div>
        <ScheduleList schedules={schedules} setSchedules={setSchedules} />
      </div>
    </div>
  );
};

export default Page;
