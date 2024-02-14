import UserListItem from './UserListItem';

const DUMMY_DATA = [
  { username: '킴킴킴' },
  { username: '아이린dddddddddddddddddddddddddddd' },
  { username: '아이린dddddddddddddddddddddddddddd' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
  { username: '킴킴킴' },
  { username: '아이린' },
];

const UserList = () => {
  return (
    <div className='flex flex-col gap-[1rem] p-[2rem] bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[50rem] w-full'>
      <h3>현재 접속자</h3>
      <ul className='flex-1 rounded-[0.5rem] bg-green-50 p-[2rem] overflow-y-auto'>
        {DUMMY_DATA.map(({ username }, i) => (
          <UserListItem
            username={username}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
