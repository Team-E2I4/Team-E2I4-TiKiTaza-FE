interface UserListItemProps {
  username: string;
}

const UserListItem = ({ username }: UserListItemProps) => {
  return <li>{username}</li>;
};

export default UserListItem;
