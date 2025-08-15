import AddMemberModal from "@/pages/Home/MyTeams/AddMemberModal";
import CreateTeamModal from "@/pages/Home/MyTeams/CreateTeamModal";
import DeleteTeamModal from "@/pages/Home/MyTeams/DeleteTeamModal";
import EditTeamModal from "@/pages/Home/MyTeams/EditTeamModal";
import LeaveTeamModal from "@/pages/Home/MyTeams/LeaveTeamModal";
import RemoveMemberModal from "@/pages/Home/MyTeams/RemoveMemberModal";
import { Team } from "type";
import { useModals } from "./useModals";

interface TeamModalData {
  create: null;
  edit: Team | null;
  delete: Team | null;
  addMember: Team | null;
  removeMember: Team | null;
  leave: Team | null;
}

export function useTeamModals() {
  const { modals, openModal, closeModal, closeAllModals, isAnyModalOpen } =
    useModals<TeamModalData>({
      create: null,
      edit: null,
      delete: null,
      addMember: null,
      removeMember: null,
      leave: null,
    });

  const handlers = {
    createTeam: () => openModal("create"),
    editTeam: (team: Team) => openModal("edit", team),
    deleteTeam: (team: Team) => openModal("delete", team),
    addMemberToTeam: (team: Team) => openModal("addMember", team),
    removeMemberFromTeam: (team: Team) => openModal("removeMember", team),
    leaveTeam: (team: Team) => openModal("leave", team),
  };

  const closeHandlers = {
    closeCreate: () => closeModal("create"),
    closeEdit: () => closeModal("edit"),
    closeDelete: () => closeModal("delete"),
    closeAddMember: () => closeModal("addMember"),
    closeRemoveMember: () => closeModal("removeMember"),
    closeLeave: () => closeModal("leave"),
  };

  const ModalComponents = () => (
    <>
      <CreateTeamModal
        isOpen={modals.create.isOpen}
        onClose={closeHandlers.closeCreate}
      />
      {modals.edit.data && (
        <EditTeamModal
          isOpen={modals.edit.isOpen}
          team={modals.edit.data}
          onClose={closeHandlers.closeEdit}
        />
      )}
      {modals.delete.data && (
        <DeleteTeamModal
          isOpen={modals.delete.isOpen}
          team={modals.delete.data}
          onClose={closeHandlers.closeDelete}
        />
      )}
      {modals.addMember.data && (
        <AddMemberModal
          isOpen={modals.addMember.isOpen}
          team={modals.addMember.data}
          onClose={closeHandlers.closeAddMember}
        />
      )}
      {modals.removeMember.data && (
        <RemoveMemberModal
          isOpen={modals.removeMember.isOpen}
          team={modals.removeMember.data}
          onClose={closeHandlers.closeRemoveMember}
        />
      )}
      {modals.leave.data && (
        <LeaveTeamModal
          isOpen={modals.leave.isOpen}
          team={modals.leave.data}
          onClose={closeHandlers.closeLeave}
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
