import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Task } from '@/lib/services/tasks';
import { tasksService } from '@/lib/services/tasks';

interface EditTaskButtonProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
}

export function EditTaskButton({ task, onTaskUpdated }: EditTaskButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTask = await tasksService.updateTask(task.id, {
        title,
        description: description || undefined,
      });
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <div className="flex gap-2">
          <Button type="submit" size="sm">Save</Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsEditing(true)}
    >
      Edit
    </Button>
  );
}
