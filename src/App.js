import React, { useState, useEffect } from "react";

const dailyTasks = [
  { id: 1, task: "Drink a full glass of water", completed: false },
  { id: 2, task: "Write down one thing you’re grateful for", completed: false },
  { id: 3, task: "Take a 10-minute walk", completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(dailyTasks);
  const [rewardEarned, setRewardEarned] = useState(false);

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  useEffect(() => {
    if (tasks.every((task) => task.completed) && !rewardEarned) {
      console.log("🎉 $RCVRY earned!");
      setRewardEarned(true);
    }
  }, [tasks, rewardEarned]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌱 RCVRY Quest</h1>
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
        {rewardEarned && (
          <p className="mt-4 text-green-600 font-bold">
            🎉 You earned $RCVRY today!
          </p>
        )}
      </div>
    </div>
  );
}
