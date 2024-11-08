/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HorizontalBarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file
    fetch('/genre_counts.csv')
      .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data manually
        const lines = csvData.split('\n').slice(1); // Skip the header line
        const parsedData = lines.map(line => {
          const columns = line.split(','); // Split by comma
          if (columns.length === 2) { // Ensure there are exactly two columns
            const genre = columns[0].trim(); // Trim genre
            const movieCount = parseInt(columns[1].trim(), 10); // Trim and parse movie count

            if (genre && !isNaN(movieCount)) { // Check if genre is not empty and movieCount is valid
              return { Genre: genre, MovieCount: movieCount }; // Create an object
            }
          }
          return null; // Return null for invalid lines
        }).filter(item => item !== null); // Filter out any null items

        setData(parsedData); // Set parsed data to state
      })
      .catch(error => console.error('Error fetching the CSV file:', error));
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