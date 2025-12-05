"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { GoalCard } from "./GoalCard";

interface Goal {
  id: number;
  title: string;
  badge: string;
  apy: number;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  date: string;
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Hajj Fund 2026",
    badge: "Hajj Vault",
    apy: 8.5,
    progress: 56,
    currentAmount: 8450,
    targetAmount: 15000,
    date: "Jun 2026",
  },
  {
    id: 2,
    title: "Tesla Model Y",
    badge: "Auto Vault",
    apy: 12.4,
    progress: 27,
    currentAmount: 12300,
    targetAmount: 45000,
    date: "Dec 2025",
  },
];

export const GoalVaults = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleCreateGoal = () => {
    const newGoal: Goal = {
      id: Date.now(),
      title: "New Savings Goal",
      badge: "Custom Vault",
      apy: 5.0,
      progress: 0,
      currentAmount: 0,
      targetAmount: 10000,
      date: "Dec 2026",
    };
    setGoals([...goals, newGoal]);
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#1F854E] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">My Goal Vaults</h2>
        </div>
        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <GoalCard key={goal.id} {...goal} />
          ))}

          <motion.button
            layout
            onClick={handleCreateGoal}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/50 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-green-500 hover:text-green-600 transition-all min-h-[300px] group"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 group-hover:text-green-700">
                Create New Goal
              </h3>
              <p className="text-xs text-gray-400">Start your journey</p>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>
    </section>
  );
};
