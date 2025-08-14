import { Link } from "react-router-dom";
import { User } from "type";

interface UserCardPropTypes {
  user: User;
  isAdmin?: boolean;
}

function UserCard({ user, isAdmin = false }: UserCardPropTypes) {
  return (
    <Link
      to={`/user/${user._id}`}
      className="user-card flex flex-col space-y-2 max-w-md p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl hover:scale-105 transition-transform duration-300"
    >
      <h3 className="font-bold">
        {user.username} {isAdmin && "(Admin)"}
      </h3>
      <h4 className="text-sm">{user.email}</h4>
    </Link>
  );
}

export default UserCard;
