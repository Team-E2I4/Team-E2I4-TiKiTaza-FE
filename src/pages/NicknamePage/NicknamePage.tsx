import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponseAccountGetResponse } from '@/generated';
import UpdateNicknameModal from './UpdateNickname/UpdateNicknameModal';

const NicknamePage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const profileData = queryClient.getQueryData<ApiResponseAccountGetResponse>(
      ['getMyProfileInfo']
    );

    if (profileData?.data?.data?.nickname) {
      navigate('/main');
    } else {
      setIsOpen(true);
    }
  }, [queryClient, navigate]);

  return (
    <div>
      <UpdateNicknameModal initialIsOpen={isOpen} />
    </div>
  );
};

export default NicknamePage;
