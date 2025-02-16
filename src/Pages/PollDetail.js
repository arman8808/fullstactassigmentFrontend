import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PollDetails = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const fetchPoll = async () => {
    const response = await axios.get(
      `${process.env.React_App_Base_Url + `/polls/get-one-poll/${pollId}`}`
    );
    setPoll(response.data);

    const votes = response.data.options.reduce(
      (sum, option) => sum + option.votes,
      0
    );
    setTotalVotes(votes);
  };

  useEffect(() => {
    fetchPoll();

    const intervalId = setInterval(() => {
      fetchPoll();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleVote = async (option) => {


    await axios.put(
      `${process.env.React_App_Base_Url + `/polls/get-one/${pollId}/vote`}`,
      {
        option,
      }
    );

    await fetchPoll();
  };

  if (!poll) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{poll.question}</h1>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {poll.options.map((option, index) => {
          const percentage =
            totalVotes === 0
              ? 0
              : ((option.votes / totalVotes) * 100).toFixed(2);

          const progressBarColor =
            percentage >= 75
              ? "#4caf50"
              : percentage >= 50
              ? "#007bff"
              : percentage >= 25
              ? "#ffc107"
              : "#f44336";

          return (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px 15px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                <span>{option.option}</span>
                <span>
                  {option.votes} votes ({percentage}%)
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor: "#e0e0e0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${percentage}%`,
                    backgroundColor: progressBarColor,
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <button
                onClick={() => handleVote(option.option)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  color: "#fff",
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
              >
                Vote
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PollDetails;
