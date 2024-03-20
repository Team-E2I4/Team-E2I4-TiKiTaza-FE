import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponseAccountGetResponse } from '@/generated';
import useVolumeStore from '@/store/useVolumeStore';
import UpdateNicknameModal from './UpdateNickname/UpdateNicknameModal';

export interface NicknamePageProps {
  data: ApiResponseAccountGetResponse;
}

const NicknamePage = () => {
  const navigate = useNavigate();

  const { setVolume } = useVolumeStore();

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const profileData = queryClient.getQueryData<NicknamePageProps>([
      'getMyProfileInfo',
    ]);

    if (profileData?.data?.data?.nickname !== '백준원') {
      setVolume({ bgm: 'play', volumeSize: 30 });
      navigate('/main');
    } else {
      setIsOpen(true);
    }
  }, [queryClient]);

  return (
    <div>
      <UpdateNicknameModal initialIsOpen={isOpen} />
    </div>
  );
};

export default NicknamePage;
