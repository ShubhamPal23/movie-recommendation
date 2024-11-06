import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import './GenreChart.css'

const GenreChart = () => {
  const [data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action"); // Default genre

  // List of available genres
  const genres = [
    "Music",
    "Action",
    "Drama",
    "Comedy",
    "Adventure",
    "Animation",
    "Crime",
    "Documentary",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Romance",
    "Mystery",
    "Thriller",
    "War",
    "Western",
  ]; // Adjust these based on your available files

  useEffect(() => {
    // Fetch data based on the selected genre
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${selectedGenre}.csv`);
        const parsedData = parseCSV(response.data);
        setData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [selectedGenre]); // Re-run effect when selectedGenre changes

  const parseCSV = (csvData) => {
    const lines = csvData.split("\n");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const [movieYear, genres, Movie_Count, Average_Critic_Score] =
        lines[i].split(",");

      const year = parseInt(movieYear, 10);
      const count = parseInt(Movie_Count, 10);
      const critic_score = parseInt(Average_Critic_Score);

      if (!isNaN(year) && !isNaN(count) && !isNaN(critic_score)) {
        result.push({
          movieYear: year,
          Movie_Count: count,
          Critic_score: critic_score,
        });
      }
    }

    return result;
  };
console.log(data)
  return (
    <div>
      
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
        className="genre-chart__dropdown"
      >
        {genres.map((genre) => (
          <option 
            key={genre} 
            value={genre}     
            className="genre-chart__option"
          >
            {genre}
          </option>
        ))}
      </select>

      <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
        <ResponsiveContainer width="100%" height="100%">
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
            <XAxis dataKey="movieYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Movie_Count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="movieYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Critic_score"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenreChart;
