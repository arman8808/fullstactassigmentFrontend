import "./App.css";
import CreatePoll from "./Pages/CreatePoll";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollDetails from "./Pages/PollDetail";
function App() {
  return (
    <div className="App">
      <h1>Quick Polling App</h1>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/poll/:pollId" element={<PollDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
