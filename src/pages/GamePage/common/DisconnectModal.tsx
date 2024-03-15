import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useNavigate } from 'react-router-dom';

interface DisconnectModalProps {
  isOpen: boolean;
  handleClickCancel: () => void;
}
const DisconnectModal = ({
  isOpen,
  handleClickCancel,
}: DisconnectModalProps) => {
  const navigate = useNavigate();

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Trigger asChild></AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)] z-[100]' />
        <AlertDialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]'>
          <AlertDialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
            정말로 게임방을 나가시겠어요?
          </AlertDialog.Title>
          <AlertDialog.Description className='text-mauve11 mt-4 mb-5 text-[15px] leading-normal'>
            게임방에서 나가면 다시 접속할 수 없어요.
          </AlertDialog.Description>
          <div className='flex justify-end gap-[25px]'>
            <AlertDialog.Cancel asChild>
              <button
                onClick={handleClickCancel}
                className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
                취소
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  navigate('/main', { replace: true });
                  navigate(0);
                }}
                className='text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
                네, 나갈래요
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DisconnectModal;
