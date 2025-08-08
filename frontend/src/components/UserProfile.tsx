import { User } from "@/types/user";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="text-lg">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
    </div>
  );
};

export default UserProfile;