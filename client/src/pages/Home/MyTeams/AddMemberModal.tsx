import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TeamType, UserType } from "@/helpers/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState } from "react";

interface PropTypes {
  isOpen: boolean;
  team: TeamType | null;
  onClose: () => void;
}

function AddMemberModal({ isOpen, team, onClose }: PropTypes) {
  const [users, setUsers] = useState<UserType[]>([]);

  const timeoutRef = useRef<any>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (e.target.value.trim().length) {
        try {
          const { data }: { data: UserType[] } = await api.get(
            `/user/${e.target.value}`
          );
          setUsers(data);
        } catch (error) {
          apiErrorHandler(error);
        }
      } else {
        setUsers([]);
      }
    }, 500);
  }

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
      <div className="base-container flex flex-col space-y-5 max-w-lg  grow rounded-xl bg-white text-gray-800 border border-gray-500 shadow p-5">
        <h3 className="text-center text-xl font-bold">
          Add member(s) to {team?.name}
        </h3>
        <div>
          <label htmlFor="searchBar" className="text-sm font-bold">
            Search by Name or Email
          </label>
          <div className="flex items-center bg-gray-100 ring ring-gray-400 shadow focus-within:ring-blue-500 rounded-lg">
            <MagnifyingGlassIcon className="size-5 m-2" />
            <input
              id="searchBar"
              type="search"
              name="search"
              placeholder="Search..."
              className="outline-none w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        {users.map((user) => (
          <p>{user.username}</p>
        ))}
      </div>
    </div>
  );
}

export default AddMemberModal;
