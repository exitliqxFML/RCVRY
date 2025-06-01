import React, { useEffect, useRef, useState } from "react";

export default function RunnerGame({ onGameOver }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [playerY, setPlayerY] = useState(150);
  const velocity = useRef(0);
  const gravity = 0.6;
  const isJumping = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let obstacleX = 400;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Player
      ctx.fillStyle = "green";
      ctx.fillRect(50, playerY, 30, 30);

      // Obstacle
      ctx.fillStyle = "red";
      ctx.fillRect(obstacleX, 170, 20, 30);
      obstacleX -= 5;
      if (obstacleX < -20) {
        obstacleX = 400;
        setScore((s) => s + 1);
      }

      // Gravity
      velocity.current += gravity;
      let newY = playerY + velocity.current;
      if (newY >= 150) {
        newY = 150;
        velocity.current = 0;
        isJumping.current = false;
      }
      setPlayerY(newY);

      // Collision
      if (
        50 + 30 > obstacleX &&
        50 < obstacleX + 20 &&
        playerY + 30 > 170
      ) {
        setIsRunning(false);
        cancelAnimationFrame(animationFrameId);
        onGameOver(score);
        return;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    if (isRunning) gameLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, playerY, onGameOver, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping.current) {
        velocity.current = -10;
        isJumping.current = true;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">RCVRY Runner 🏃</h2>
      <p className="mb-2">Score: {score} | Each = +1 $RCVRY</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border border-black rounded bg-white"
      />
    </div>
  );
}
