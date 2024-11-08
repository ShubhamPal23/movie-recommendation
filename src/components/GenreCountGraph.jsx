/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HorizontalBarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/genre_counts.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const lines = csvData.split("\n").slice(1);
        const parsedData = lines
          .map((line) => {
            const columns = line.split(",");
            if (columns.length === 2) {
              const genre = columns[0].trim();
              const movieCount = parseInt(columns[1].trim(), 10);

              if (genre && !isNaN(movieCount)) {
                return { Genre: genre, MovieCount: movieCount };
              }
            }
            return null;
          })
          .filter((item) => item !== null);

        setData(parsedData);
      })
      .catch((error) => console.error("Error fetching the CSV file:", error));
  }, []);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Genre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="MovieCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarGraph;
