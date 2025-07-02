import { Card, NoXMessage } from "@/components";
import { DetailedUserType } from "@/helpers/types";
import {
  CubeTransparentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useLoaderData } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import TeamCard from "./TeamCard";
import { useState } from "react";
import api from "@/config/api";
import { toast } from "react-toastify";

function UserDetails() {
  const user: DetailedUserType = useLoaderData();
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const res = await api.put("/user/profile-picture", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProfilePicture(res.data.profilePicture);
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile picture.");
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <Card>
      <div className="flex flex-col space-y-8 w-screen h-max text-gray-800 p-6 overflow-auto">
        <div className="flex items-center space-x-4">
          <label htmlFor="profilePictureInput" className="cursor-pointer">
            <img
              src={profilePicture ? `/uploads/${profilePicture}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </label>
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div>
            <h1 className="text-4xl font-black my-6">User Details</h1>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <h4>{user.email}</h4>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Projects</p>
          {user.projects.length ? (
            <div className="flex flex-wrap items-center text-start gap-4 w-full">
              {user.projects.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          ) : (
            <NoXMessage
              icon={<CubeTransparentIcon />}
              message="No Projects Yet."
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Teams</p>
          {user.teams.length ? (
            <div className="flex flex-wrap items-center text-start gap-4 w-full">
              {user.teams.map((team) => (
                <TeamCard team={team} isAdmin={user._id === team.admin._id} />
              ))}
            </div>
          ) : (
            <NoXMessage
              icon={<UserGroupIcon />}
              message="Not a part of any team yet."
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default UserDetails;
