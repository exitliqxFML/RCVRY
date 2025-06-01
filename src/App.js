import React, { useState, useEffect } from "react";
import RunnerGame from "./RunnerGame";

const dailyTasks = [
  { id: 1, task: "Drink a full glass of water", completed: false },
  { id: 2, task: "Write down one thing you’re grateful for", completed: false },
  { id: 3, task: "Take a 10-minute walk", completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(dailyTasks);
  const [allDone, setAllDone] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  useEffect(() => {
    if (tasks.every((task) => task.completed) && !allDone) {
      setAllDone(true);
      setTotalEarned((prev) => prev + 3); // 1 coin per task
    }
  }, [tasks, allDone]);

  const handleGameOver = (score) => {
    setGameOver(true);
    setGameScore(score);
    setTotalEarned((prev) => prev + score);
  };

  if (allDone && !gameOver) {
    return <RunnerGame onGameOver={handleGameOver} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌱 RCVRY Quest</h1>

      {!allDone && (
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center mb-3"
            >
              <span>{task.task}</span>
              <button
                onClick={() => completeTask(task.id)}
                disabled={task.completed}
                className={`px-4 py-1 rounded ${
                  task.completed
                    ? "bg-green-300 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {task.completed ? "✅ Done" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>
      )}

      {gameOver && (
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">🎉 All Done!</h2>
          <p className="mb-2">You earned {gameScore} $RCVRY from the game</p>
          <p className="font-bold text-green-600">
            Total earned today: {totalEarned} $RCVRY
          </p>
        </div>
      )}
    </div>
  );
}
