import { useState, forwardRef } from "react";
import { motion } from "motion/react";
import { Trash2, Edit2, Calendar, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
}

export const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task, onToggle, onDelete, onEdit }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 border-blue-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const getDueDateDisplay = () => {
    if (!task.dueDate) return null;

    const date = new Date(task.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time to compare dates only
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    let dateLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    let className = "text-gray-600";

    if (dateOnly.getTime() === todayOnly.getTime()) {
      dateLabel = "Today";
      className = "text-blue-600";
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      dateLabel = "Tomorrow";
      className = "text-green-600";
    } else if (dateOnly < todayOnly && !task.completed) {
      className = "text-red-600";
    }

    return (
      <div className={`flex items-center gap-1 text-xs ${className}`}>
        <Calendar className="h-3 w-3" />
        <span>
          {dateLabel} at {timeLabel}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`group bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:shadow-md transition-all ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) handleEdit();
                  if (e.key === "Escape") setIsEditing(false);
                }}
                placeholder="Task title"
                className="flex-1"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsEditing(false);
                }}
                placeholder="Add a description (optional)"
                className="min-h-[80px] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleEdit}>
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`break-words flex-1 ${
                    task.completed ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
                {task.description && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-6 px-2"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>
              
              {task.description && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-sm text-gray-600 bg-gray-50/50 rounded p-2 border border-gray-200/50"
                >
                  {task.description}
                </motion.div>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${priorityColors[task.priority]}`}
                >
                  {task.priority}
                </Badge>
                {getDueDateDisplay()}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
});

TaskItem.displayName = "TaskItem";
