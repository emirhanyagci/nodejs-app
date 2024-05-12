import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { getStatus, updateStatus } from "@/api/userApi";
import { useUserContext } from "@/context/UserContext";

export default function UpdateStatus() {
  const [status, setStatus] = useState("");
  const userContext = useUserContext();
  const statusInput = useRef<HTMLInputElement>(null);
  const token = userContext?.user.token;
  useEffect(() => {
    getStatus(token)
      .then((res) => {
        setStatus(res.status);
        statusInput.current!.value = res.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function updateStatusHandler() {
    updateStatus(statusInput.current!.value as string, token)
      .then((res) => {
        console.log(res);

        statusInput.current!.value = res.status;
        setStatus(res.status);
      })
      .catch((err) => {
        statusInput.current!.value = status;
        console.log(err);
      });
  }
  return (
    <div className="flex gap-3">
      <Input
        ref={statusInput}
        className="bg-transparent w-96"
        type="text"
        placeholder="Your status"
      />
      <Button onClick={updateStatusHandler} variant="secondary">
        Update Status
      </Button>
    </div>
  );
}
