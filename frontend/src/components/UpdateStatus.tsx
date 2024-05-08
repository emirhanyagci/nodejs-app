import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateStatus() {
  return (
    <div className="flex gap-3">
      <Input
        className="bg-transparent w-96"
        type="text"
        placeholder="Your status"
      />
      <Button variant="secondary">Update Status</Button>
    </div>
  );
}
