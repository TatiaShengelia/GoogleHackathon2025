import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './navigationbar/Homepage';
import Profile from './navigationbar/Profile';
import HistoryPage from './navigationbar/Historypage';
import EventDetailPage from './Data/EventDetailPage';
import TopicDetailPage from './Data/TopicDetailPage';
import QuizApp from "./Data/QuizApp"
import Simulations from './navigationbar/Simulations';
import SignIn from './navigationbar/SignIn';
import SignUp from './navigationbar/SignUp';
import Community from './navigationbar/Community';
import FallingBallSimulation from "./simulations/FallingBallSimulaton"
import PrismComponent from './simulations/Prism';
import SolarSystem from './simulations/SolarSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />}/>
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/topic/:topicId" element={<TopicDetailPage />} />
        <Route path="/event/:id/quiz" element={<QuizApp />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/falling-fall-simulation" element={<FallingBallSimulation />} />
        <Route path="/prism-simulation" element={<PrismComponent />} />
        <Route path="/solar-system-simulation" element={<SolarSystem />} />
      </Routes>
    </Router>
  );
}

export default App;