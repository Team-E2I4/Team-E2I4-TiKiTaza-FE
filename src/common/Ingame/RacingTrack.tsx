import useCanvas from '@/hooks/useCanvas';

const RacingTrack = () => {
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = 200;
      canvas.height = 200;
    },
  });
  return (
    <>
      <canvas
        ref={canvasRef}
        className='absolute w-full h-full z-[-1] bg-[pink] border-2 border-black '
      />
    </>
  );
};

export default RacingTrack;
