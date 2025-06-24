import { Loader } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import api from "@/config/api";
import { useTeam } from "@/contexts/TeamContext";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TeamType, UserType } from "@/helpers/types";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState } from "react";

interface PropTypes {
  isOpen: boolean;
  team: TeamType;
  onClose: () => void;
}

function AddMemberModal({ isOpen, team, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const { addMember } = useTeam();

  const timeoutRef = useRef<any>(null);

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setQuery(term);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (e.target.value.trim().length) {
        setIsLoading(true);
        try {
          const { data }: { data: UserType[] } = await api.get(
            `/user/${e.target.value}`
          );
          setSearchResults(data);
        } catch (error) {
          apiErrorHandler(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
  }

  function addUserToSelection(user: UserType) {
    setSelectedUsers((prev) => [...prev, user]);
    setQuery("");
    setSearchResults([]);
  }

  function removeUserFromSelection(userId: string) {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  }

  async function handleAddMembers() {
    if (selectedUsers.length === 0) return;

    await addMember(
      team!._id,
      selectedUsers.map((u) => u._id)
    );
    setSelectedUsers([]);
    setIsLoading(false);
    onClose();
  }

  function handleClose() {
    setQuery("");
    setSearchResults([]);
    setSelectedUsers([]);
    onClose();
  }

  if (!isOpen) return null;

  const filteredSearchResults = searchResults
    .filter((u) => !selectedUsers.some((s) => s._id === u._id))
    .filter((u) => !team?.members.some((s) => s._id === u._id));

  return (
    <ModalContainer title={`Add member(s) to ${team.name}`}>
      <div>
        <div className="flex items-center bg-gray-100 ring ring-gray-400 shadow focus-within:ring-blue-500 rounded-lg">
          <MagnifyingGlassIcon className="size-5 m-2" />
          <input
            id="searchBar"
            type="search"
            name="search"
            placeholder="Search by name or email..."
            value={query}
            onChange={handleQueryChange}
            className="outline-none w-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full min-h-20 border border-gray-300 rounded-lg overflow-y-scroll">
        {isLoading ? (
          <Loader size="small" />
        ) : filteredSearchResults.length > 0 ? (
          filteredSearchResults.map((user) => (
            <button
              key={user._id}
              onClick={() => addUserToSelection(user)}
              className="w-full px-3 py-2 text-left hover:bg-gray-200 border-b border-gray-100 last:border-b-0 flex items-center cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium text-gray-700">
                  {user.username}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </button>
          ))
        ) : (
          <p className="m-3 text-center">
            Enter a user's name or email <br />
            to search and add as member
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center space-x-3">
        <label className="text-sm font-medium text-gray-700">
          Selected Users ({selectedUsers.length})
        </label>
        {selectedUsers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex space-x-2 items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <span className="text-sm text-gray-800">{user.username}</span>
                <button
                  onClick={() => removeUserFromSelection(user._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <XMarkIcon className="size-4 stroke-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleAddMembers}
          disabled={isLoading || selectedUsers.length === 0}
          className="flex flex-1 items-center justify-center px-4 py-2 bg-blue-200 text-blue-900 rounded-md hover:bg-blue-300 font-bold transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <UserPlusIcon className="size-5 strole-3 mr-2" />
          Add Members ({selectedUsers.length})
        </button>
      </div>
    </ModalContainer>
  );
}

export default AddMemberModal;
