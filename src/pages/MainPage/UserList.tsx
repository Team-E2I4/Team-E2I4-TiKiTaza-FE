import UserListItem from './UserListItem';

type UsersType = { nickname: string; memberId: number };
interface UserListProps {
  userList?: UsersType[];
  myId: number;
}

const UserList = ({ userList, myId }: UserListProps) => {
  return (
    <>
      <h3>현재 접속자</h3>
      <ul className='flex-1 rounded-[0.5rem] bg-green-70 p-[2rem] overflow-y-auto'>
        {userList ? (
          userList.map(({ nickname, memberId }) => (
            <UserListItem
              key={memberId}
              isMe={memberId === myId}
              username={nickname}
            />
          ))
        ) : (
          <span>접속중인 유저가 없습니다.</span>
        )}
      </ul>
    </>
  );
};

export default UserList;
