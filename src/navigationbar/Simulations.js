import React from "react";
import { Link } from "react-router-dom";
import "./Simulations.css";
import Navbar from "./Navbar";
import simulationsData from "./SimulationsData";

const Simulations = () => {
  return (
    <>
      <Navbar />
      <div className="events-grid">
        {simulationsData.length > 0 ? (
          simulationsData.map((simulation) => (
            <div key={simulation.id} className="event-card">
              <img
                src={simulation.imageSrc}
                alt={simulation.name}
                className="event-image"
              />
              <Link to={simulation.link}>
                <button className="event-button">
                  {simulation.name}
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No simulations available</p>
        )}
      </div>
    </>
  );
};

export default Simulations;
