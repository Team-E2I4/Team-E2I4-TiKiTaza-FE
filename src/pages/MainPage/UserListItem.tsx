interface UserListItemProps {
  username: string;
}

const UserListItem = ({ username }: UserListItemProps) => {
  return <li className='truncate'>{username}</li>;
};

export default UserListItem;
