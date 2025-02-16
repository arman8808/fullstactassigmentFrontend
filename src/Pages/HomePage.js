import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  const handleCreatePoll = () => {
    navigate("/create");
  };

  const handlePollClick = (pollId) => {
    navigate(`/poll/${pollId}`);
  };
  const getAllPollsHandle = async () => {
    try {
      const response = await axios.get(
        `${process.env.React_App_Base_Url + "/polls/get-all"}`
      );
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };
  useEffect(() => {
    getAllPollsHandle();

    const intervalId = setInterval(() => {
      getAllPollsHandle();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>All Polls</h1>
      <button
        onClick={handleCreatePoll}
        style={{
          marginBottom: "20px",
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
      >
        Create Poll
      </button>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#333",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "2rem",
          }}
        >
          Active Polls
        </h1>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "0",
            listStyle: "none",
          }}
        >
          {polls.map((poll) => {
            const totalVotes = poll.options.reduce(
              (sum, option) => sum + option.votes,
              0
            );

            return (
              <li
                key={poll._id}
                style={{
                  width: "300px",
                  cursor: "pointer",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  overflow: "hidden",
                }}
                onClick={() => handlePollClick(poll._id)}
              >
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "1.2rem",
                  }}
                >
                  {poll.question}
                </div>
                <div
                  style={{
                    padding: "15px",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#555",
                    fontSize: "1rem",
                  }}
                >
                  {poll.options.map((option) => {
                    const percentage = totalVotes
                      ? ((option.votes / totalVotes) * 100).toFixed(1)
                      : 0;

                    return (
                      <div
                        key={option._id}
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{option.option}</span>
                        <span>{`${percentage}% (${option.votes} votes)`}</span>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
