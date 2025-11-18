import { useState } from "react";
import { Plus, Flag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DateTimePicker } from "./DateTimePicker";

interface TaskInputProps {
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    dueDate?: Date;
  }) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ 
        title: title.trim(), 
        description: description.trim() || undefined,
        priority, 
        dueDate 
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate(undefined);
      setShowAdvanced(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/50 backdrop-blur-sm border-white/20"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {!showAdvanced && (
        <button
          type="button"
          onClick={() => setShowAdvanced(true)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Add details
        </button>
      )}

      {showAdvanced && (
        <div className="space-y-3">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            className="bg-white/50 backdrop-blur-sm border-white/20 min-h-[80px] resize-none"
          />
          <div className="flex gap-2 flex-wrap">
            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
              <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm border-white/20">
                <Flag className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>

            <DateTimePicker value={dueDate} onChange={setDueDate} />
          </div>
        </div>
      )}
    </form>
  );
}
