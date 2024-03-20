import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponseAccountGetResponse } from '@/generated';
import useVolumeStore from '@/store/useVolumeStore';
import UpdateNicknameModal from './UpdateNickname/UpdateNicknameModal';

interface NicknamePageProps {
  data: ApiResponseAccountGetResponse;
}

const NicknamePage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const { setVolume } = useVolumeStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    const profileData = queryClient.getQueryData<NicknamePageProps>([
      'getMyProfileInfo',
    ]);

    if (profileData?.data?.data?.nickname) {
      setIsOpen(false);
      navigate('/main');
      setVolume({ bgm: 'play', volumeSize: 30 });
    }
    setIsOpen(true);
  }, [queryClient]);

  return (
    <div>
      <UpdateNicknameModal initialIsOpen={isOpen} />
    </div>
  );
};

export default NicknamePage;
