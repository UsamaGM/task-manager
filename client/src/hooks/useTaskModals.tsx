import { Task } from "type";
import { useModals } from "./useModals";
import CreateTaskModal from "@/pages/Home/MyTasks/CreateTaskModal";
import EditTaskModal from "@/pages/Home/MyTasks/EditTaskModal";
import DeleteTaskModal from "@/pages/Home/MyTasks/DeleteTaskModal";
import AssignTaskModal from "@/pages/Home/MyTasks/AssignTaskModal";

interface TaskModalData {
  create: null;
  edit: Task | null;
  delete: Task | null;
  assign: Task | null;
}

export function useTaskModals() {
  const { modals, openModal, closeModal, closeAllModals, isAnyModalOpen } =
    useModals<TaskModalData>({
      create: null,
      edit: null,
      delete: null,
      assign: null,
    });

  const handlers = {
    createTask: () => openModal("create"),
    editTask: (task: Task) => openModal("edit", task),
    deleteTask: (task: Task) => openModal("delete", task),
    assignTask: (task: Task) => openModal("assign", task),
  };

  const closeHandlers = {
    closeCreate: () => closeModal("create"),
    closeEdit: () => closeModal("edit"),
    closeDelete: () => closeModal("delete"),
    closeAssign: () => closeModal("assign"),
  };

  const ModalComponents = () => (
    <>
      <CreateTaskModal
        isOpen={modals.create.isOpen}
        onClose={closeHandlers.closeCreate}
      />
      {modals.edit.data && (
        <EditTaskModal
          isOpen={modals.edit.isOpen}
          task={modals.edit.data}
          onClose={closeHandlers.closeEdit}
        />
      )}
      {modals.delete.data && (
        <DeleteTaskModal
          isOpen={modals.delete.isOpen}
          task={modals.delete.data}
          onClose={closeHandlers.closeDelete}
        />
      )}
      {modals.assign.data && (
        <AssignTaskModal
          isOpen={modals.assign.isOpen}
          task={modals.assign.data}
          onClose={closeHandlers.closeAssign}
        />
      )}
    </>
  );

  return {
    modals,
    isAnyModalOpen,

    ...handlers,

    ...closeHandlers,
    closeAllModals,

    ModalComponents,
  };
}
