import React, { useState, useEffect } from "react";
import { Slider, Button } from "@mui/material";
import './FallingBallSimulation.css';
import Navbar from "../navigationbar/Navbar";

const FallingBallSimulation = () => {
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [resistance, setResistance] = useState(0.05); // resistance factor
  const [mass, setMass] = useState(1); // kg
  const [energyLossFactor, setEnergyLossFactor] = useState(0.7); // Energy loss on bounce
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(100); // Spawn at top
  const [isFalling, setIsFalling] = useState(false);
  const containerHeight = 300; // px (simulation height)

  useEffect(() => {
    let interval;
    if (isFalling) {
      interval = setInterval(() => {
        let newVelocity = velocity + (gravity - resistance * velocity) * 0.1;
        let newPosition = position - newVelocity * 0.1;

        if (newPosition <= 0) {
          newPosition = 0;
          newVelocity = -newVelocity * energyLossFactor; // Bounce with adjustable energy loss
          if (Math.abs(newVelocity) < 0.5) {
            newVelocity = 0;
            setIsFalling(false);
          }
        }

        setVelocity(newVelocity);
        setPosition(newPosition);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFalling, position, velocity, gravity, resistance, energyLossFactor]);

  const startFall = () => {
    setPosition(100); // Reset ball to top
    setVelocity(0);
    setIsFalling(true);
  };

  const potentialEnergy = mass * gravity * position;
  const kineticEnergy = 0.5 * mass * velocity ** 2;

  return (
    <>
    <Navbar />
    <div className="simulation-container">
      <h2>Falling Ball Simulation</h2>
      <div className="simulation-content">
        <div className="ball-container">
          <div
            className="ball"
            style={{
              bottom: `${(position / 100) * containerHeight}px`,
            }}
          ></div>
        </div>
        <div className="energy-info">
          <h3>Kinetic Energy: {kineticEnergy.toFixed(2)} J</h3>
          <h3>Potential Energy: {potentialEnergy.toFixed(2)} J</h3>
        </div>
      </div>
      <div className="controls">
        <label>Gravity: {gravity.toFixed(2)} m/s²</label>
        <Slider min={1} max={20} step={0.1} value={gravity} onChange={(_, v) => setGravity(v)} />
        <label>Resistance: {resistance.toFixed(2)}</label>
        <Slider min={0} max={0.5} step={0.01} value={resistance} onChange={(_, v) => setResistance(v)} />
        <label>Mass: {mass.toFixed(2)} kg</label>
        <Slider min={0.1} max={10} step={0.1} value={mass} onChange={(_, v) => setMass(v)} />
        <label>Energy Loss on Bounce: {energyLossFactor.toFixed(2)}</label>
        <Slider min={0.1} max={1} step={0.01} value={energyLossFactor} onChange={(_, v) => setEnergyLossFactor(v)} />
      </div>
      <Button variant="contained" color="primary" onClick={startFall} className="fall-button">
        Fall
      </Button>
    </div>
    </>
  );
};

export default FallingBallSimulation;
