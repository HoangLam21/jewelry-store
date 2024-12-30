"use server";

import Finance from "@/database/finance.model";
import Report from "@/database/report.model";
import mongoose, { Date } from "mongoose";
import { connectToDatabase } from "../mongoose";

// Calculate the sum of all finances between two dates
export const calculateReportFinancesBetweenDates = async (
    startDate: Date,
    endDate: Date,
    reportId: string
) => {
    try {
        await connectToDatabase();
        const report = await Report.findById(reportId);
        if (!report) {
            throw new Error("Report not found");
        }
        const finances = await Finance.find({
            _id: { $in: report.finances },
            date: { $gte: startDate, $lte: endDate },
        });
        const totalFinances = finances.reduce(
            (acc, finance) => acc + finance.value,
            0
        );
        await mongoose.connection.close();
        return totalFinances;
    } catch (error) {
        console.log("Error calculating finances: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to calculate finances");
    }
};
