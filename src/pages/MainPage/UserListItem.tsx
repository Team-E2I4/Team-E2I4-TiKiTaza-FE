interface UserListItemProps {
  username: string;
}

const UserListItem = ({ username }: UserListItemProps) => {
  return (
    <li className='truncate cursor-pointer hover:bg-green-100'>{username}</li>
  );
};

export default UserListItem;
