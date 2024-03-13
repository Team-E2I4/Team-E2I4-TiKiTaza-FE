import { useSuspenseQuery } from '@tanstack/react-query';
import { getOnlineMembers } from '@/apis/api';

const useOnlineUsers = () => {
  return useSuspenseQuery({
    queryKey: ['onlineUsers'],
    queryFn: getOnlineMembers,
    refetchInterval: 15000,
  });
};

export default useOnlineUsers;
