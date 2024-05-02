import { IListingsParams } from '../../actions/getAllUsers';
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import Avatar from '@/app/components/Avatar';

interface UsersListProps {
  users: IListingsParams[]; // Pass the users array as props
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <Container>
      <Heading
        title="Welcome Admin, Here you look at the List of all the users "
        subtitle="List of All the Users"
      />
      <div className="flex flex-wrap justify-center">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow-md flex items-center m-2">
            {/* Assuming user image is available */}
            <div className="mr-4"> {/* Added margin to create space */}
              <Avatar src={user?.image} />
            </div>
            <hr></hr>
            <div className="flex items-center justify-center">
              
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Name: {user.name}</p>
              <p className="text-gray-500">Email: {user.email}</p>
              <p className="text-gray-500">Created At: {user.createdAt}</p>
              <p className="text-gray-500">Role: {user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UsersList;
