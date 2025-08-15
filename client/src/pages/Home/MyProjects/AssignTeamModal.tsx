import CancelButton from "@/components/CancelButton";
import ModalContainer from "@/components/ModalContainer";
import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import useTeamStore from "@/stores/team.store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState } from "react";
import { ProjectModalProps, Team } from "type";

function AssignTeamModal({ isOpen, project, onClose }: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Team[]>([]);

  const assignProject = useTeamStore((s) => s.assignProject);

  const timeoutRef = useRef<any>(null);

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setQuery(term);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      if (e.target.value.trim().length) {
        try {
          const { data }: { data: Team[] } = await api.get(
            `/team/search/${e.target.value}`,
          );
          setSearchResults(data);
        } catch (error) {
          apiErrorHandler(error);
        }
      } else setSearchResults([]);
    }, 500);
  }

  async function handleAssignment(teamId: string) {
    setIsLoading(true);
    await assignProject(project._id, teamId);
    setIsLoading(false);
    handleClose();
  }

  function handleClose() {
    setQuery("");
    setSearchResults([]);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Assign ${project.name} to a team`}>
      <div>
        <div className="flex items-center bg-gray-100 ring ring-gray-400 shadow focus-within:ring-blue-500 rounded-lg">
          <MagnifyingGlassIcon className="size-5 m-2" />
          <input
            id="searchBar"
            type="search"
            name="search"
            placeholder="Search a team by name..."
            value={query}
            onChange={handleQueryChange}
            className="outline-none w-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between h-full min-h-20 text-gray-700 border border-gray-300 rounded-lg overflow-y-scroll">
        {searchResults.length ? (
          searchResults.map((team) => (
            <div
              key={team._id}
              className="flex justify-between items-center w-full px-3 py-2 text-left border-b border-gray-100 last:border-b-0"
            >
              <div className="flex flex-col flex-1">
                <div className="text-sm font-medium text-gray-700">
                  {team.name}
                </div>
                <p className="text-xs text-gray-500">
                  Admin: {team.admin.username}
                </p>
                <p className="text-xs text-gray-500">
                  {team.members.length}{" "}
                  {team.members.length === 1 ? "Member" : "Members"}
                </p>
              </div>
              <button
                key={team._id}
                onClick={() => handleAssignment(team._id)}
                className="bg-blue-100 hover:bg-blue-200 hover:text-blue-800 font-bold text-sm rounded-lg p-2 transition-colors duration-300 cursor-pointer"
              >
                Assign
              </button>
            </div>
          ))
        ) : (
          <p className="w-full h-full m-auto text-center">
            Enter a team's name to search
          </p>
        )}
      </div>
      <CancelButton onClick={handleClose} />
    </ModalContainer>
  );
}

export default AssignTeamModal;
