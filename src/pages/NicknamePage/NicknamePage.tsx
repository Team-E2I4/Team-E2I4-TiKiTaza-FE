import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
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

  useEffect(() => {
    const profileData = queryClient.getQueryData<NicknamePageProps>([
      'getMyProfileInfo',
    ]);

    if (profileData?.data?.data?.nickname !== '') {
      setVolume({ bgm: 'play', volumeSize: 30 });
      navigate('/main');
    }
  }, [queryClient]);

  return (
    <div>
      <UpdateNicknameModal initialIsOpen={true} />
    </div>
  );
};

export default NicknamePage;
