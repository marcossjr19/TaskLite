import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'tasklite-tasks';

function App() {
  // Lemos o localStorage apenas uma vez, quando o componente nasce.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  // Sempre que a lista mudar, salvamos a nova versao no navegador.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  function handleAddTask(event) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title) return;

    const task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            estudo e foco
          </p>
          <div>
            <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">
              TaskLite
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Um app simples para organizar tarefas e praticar React.
            </p>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total de tarefas</p>
            <strong className="mt-1 block text-3xl text-slate-950">
              {tasks.length}
            </strong>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Concluidas</p>
            <strong className="mt-1 block text-3xl text-emerald-600">
              {completedCount}
            </strong>
          </div>
        </div>

        <form
          onSubmit={handleAddTask}
          className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
        >
          <label htmlFor="task" className="sr-only">
            Nova tarefa
          </label>
          <input
            id="task"
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="min-h-12 flex-1 rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
          <button
            type="submit"
            className="min-h-12 rounded-md bg-emerald-600 px-5 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Adicionar
          </button>
        </form>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {tasks.length === 0 ? (
            <p className="p-8 text-center text-slate-500">
              Nenhuma tarefa ainda. Adicione a primeira para comecar.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 rounded border-slate-300 accent-emerald-600"
                    />
                    <span
                      className={`text-base ${
                        task.completed
                          ? 'text-slate-400 line-through'
                          : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="self-start rounded-md border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:self-auto"
                  >
                    Apagar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
