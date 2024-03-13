import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponseAccountGetResponse } from '@/generated';
import UpdateNicknameModal from './UpdateNickname/UpdateNicknameModal';

interface NicknamePageProps {
  data: ApiResponseAccountGetResponse;
}

const NicknamePage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const profileData = queryClient.getQueryData<NicknamePageProps>([
      'getMyProfileInfo',
    ]);

    if (profileData?.data?.data?.nickname) {
      setIsOpen(false);
      navigate('/main');
    }
  }, [queryClient]);

  return (
    <div>
      <UpdateNicknameModal initialIsOpen={isOpen} />
    </div>
  );
};

export default NicknamePage;
