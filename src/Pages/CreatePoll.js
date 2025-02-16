import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const nevigate = useNavigate("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value.trim();
    setOptions(updatedOptions);
  };

  const handleAddOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index + 1, 0, "");
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) {
      alert("A poll must have at least two options.");
      return;
    }
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleCreatePoll = async () => {
    if (!question.trim()) {
      alert("Please enter a poll question!");
      return;
    }

    if (options.some((opt) => !opt.trim())) {
      alert("All options must be filled out!");
      return;
    }

    if (new Set(options).size !== options.length) {
      alert("Duplicate options are not allowed!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("options", JSON.stringify(options));
      const response = await axios.post(
        `${process.env.React_App_Base_Url + `/polls/create`}`,
        formData
      );
      alert(response.data.message);
      nevigate("/");
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again later.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a Poll
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Poll Question:
        </label>
        <input
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Options:
        </label>
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <button
              onClick={() => handleAddOption(index)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              onClick={() => handleRemoveOption(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreatePoll}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Create Poll
      </button>
    </div>
  );
};

export default CreatePoll;
