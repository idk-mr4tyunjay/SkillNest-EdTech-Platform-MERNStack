import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)
const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students")
    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // Data for the chart displaying student information
    const chartDataStudents = {
        labels: courses.map((course) => course.course_name),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroud: generateRandomColors(courses.length)
            },
        ],
    }

    // Data for the chart displaying income information
    const chartDataIcome = {
        labels: courses.map((course) => course.course_name),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroud: generateRandomColors(courses.length)
            },
        ],
    }
    // Options for the chart
    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            <div className="space-x-4 font-semibold">
                <button
                    onClick={() => setCurrChart("students")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                        }`}
                >
                    Students</button>
                <button
                    onClick={() => setCurrChart("income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                        }`}
                >
                    Income</button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                {/* Render the Pie chart based on the selected chart */}
                <Pie
                    data={currChart === "students" ? chartDataStudents : chartDataIcome}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart
