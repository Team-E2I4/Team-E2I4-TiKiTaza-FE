import * as Tooltip from '@radix-ui/react-tooltip';

interface KakaoTooltipProps {
  children: React.ReactNode;
}

const KakaoTooltip = ({ children }: KakaoTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className='rounded-2xl bg-[#FEE500] text-black p-3 w-[12rem] text-s flex items-center justify-center'
            sideOffset={8}>
            카카오 로그인
            <Tooltip.Arrow className='fill-[#FEE500]' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default KakaoTooltip;
