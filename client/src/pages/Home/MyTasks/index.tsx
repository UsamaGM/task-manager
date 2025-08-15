import Headline from "@/components/Headline";
import { useTaskModals } from "@/hooks";
import Tasks from "./Tasks";

function MyTasks() {
  const { createTask, assignTask, editTask, deleteTask, ModalComponents } =
    useTaskModals();

  return (
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Tasks"
        rightButtonTitle="Create Task"
        rightButtonAction={createTask}
      />

      <Tasks fns={{ assignTask, editTask, deleteTask }} />

      <ModalComponents />
    </div>
  );
}

export default MyTasks;
