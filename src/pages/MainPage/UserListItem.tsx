interface UserListItemProps {
  username: string;
  isMe: boolean;
}

const UserListItem = ({ username, isMe }: UserListItemProps) => {
  return (
    <li
      className={`${isMe && 'font-bold'} truncate cursor-pointer hover:bg-green-100`}>
      {username}
    </li>
  );
};

export default UserListItem;
