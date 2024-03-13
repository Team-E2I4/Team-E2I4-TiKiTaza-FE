import UserListItem from './UserListItem';

type UsersType = { nickname: string; memberId: number };
interface UserListProps {
  userList?: UsersType[];
  myId: number;
}

const UserList = ({ userList, myId }: UserListProps) => {
  return (
    <article className='flex flex-col gap-[1rem] p-[2rem] bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[50rem] w-full'>
      <h3>현재 접속자</h3>
      <ul className='flex-1 rounded-[0.5rem] bg-green-50 p-[2rem] overflow-y-auto'>
        {userList ? (
          userList.map(({ nickname, memberId }) => (
            <UserListItem
              key={memberId}
              username={
                memberId === myId ? `${nickname} (본인)` : `${nickname}`
              }
            />
          ))
        ) : (
          <span>접속중인 유저가 없습니다.</span>
        )}
      </ul>
    </article>
  );
};

export default UserList;
