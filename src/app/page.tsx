import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-500">
            Stay organized, get things done.
          </p>
        </header>

        {/* Todo List */}
        <TodoList />

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-400">
          <p>
            Built with Next.js by{" "}
            <a
              href="https://github.com/sidequestlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              SidequestLab
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
