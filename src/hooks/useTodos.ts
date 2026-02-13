"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";

const STORAGE_KEY = "sidequestlab-todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const exportTodos = () => {
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `todos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTodos = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported: Todo[] = JSON.parse(e.target?.result as string);
        if (!Array.isArray(imported)) throw new Error("Invalid format");
        // Validate each item has required fields
        const valid = imported.every(
          (t) =>
            typeof t.id === "string" &&
            typeof t.text === "string" &&
            typeof t.completed === "boolean" &&
            typeof t.createdAt === "number"
        );
        if (!valid) throw new Error("Invalid todo format");
        setTodos(imported);
      } catch {
        alert("Invalid backup file. Please select a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return {
    todos,
    isLoaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    exportTodos,
    importTodos,
    completedCount: todos.filter((t) => t.completed).length,
    totalCount: todos.length,
  };
}
