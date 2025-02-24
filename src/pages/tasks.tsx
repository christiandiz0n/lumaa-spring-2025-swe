import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Task, tasksService } from '@/lib/services/tasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditTaskButton } from '@/components/ui/edit-task-button';
import { withAuth } from '@/contexts/AuthContext';

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await tasksService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await tasksService.createTask({
        title: newTaskTitle,
        description: newTaskDescription || undefined,
      });
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await tasksService.updateTask(task.id, {
        isComplete: !task.isComplete
      });
      handleTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
        
        <form onSubmit={handleCreateTask} className="space-y-4 bg-zinc-800 p-6 rounded-lg">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title"
            className="border-zinc-700 text-white"
            required
          />
          <Input
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Description (optional)"
            className="border-zinc-700 text-white"
          />
          <Button type="submit" className="w-full bg-zinc-700 hover:bg-zinc-600 text-white">
            Add Task
          </Button>
        </form>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`bg-zinc-800 rounded-lg p-6 space-y-2 border-2 ${
                task.isComplete ? 'border-green-500/50' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`w-5 h-5 rounded border ${
                        task.isComplete 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-zinc-600 hover:border-zinc-400'
                      } flex items-center justify-center transition-colors`}
                    >
                      {task.isComplete && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          className="w-4 h-4 text-white"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                    <h3 className={`text-lg font-semibold text-white ${
                      task.isComplete ? 'line-through text-zinc-400' : ''
                    }`}>
                      {task.title}
                    </h3>
                  </div>
                  {task.description && (
                    <p className={`text-zinc-400 ${
                      task.isComplete ? 'line-through' : ''
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <EditTaskButton task={task} onTaskUpdated={handleTaskUpdated} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuth(TasksPage);