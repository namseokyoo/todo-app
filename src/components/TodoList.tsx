"use client";

import { useRef } from "react";
import { useTodos } from "@/hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { AddTodo } from "./AddTodo";

export function TodoList() {
  const {
    todos,
    isLoaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    exportTodos,
    importTodos,
    completedCount,
    totalCount,
  } = useTodos();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Todo Form */}
      <AddTodo onAdd={addTodo} />

      {/* Stats Bar */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {completedCount} of {totalCount} completed
          </span>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-red-500 hover:text-red-600 hover:underline transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      )}

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Backup / Restore */}
      <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-100">
        <button
          onClick={exportTodos}
          disabled={totalCount === 0}
          className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Export
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors"
        >
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              importTodos(file);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
