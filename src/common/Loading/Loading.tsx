import Lottie from 'lottie-react';
import LoadingAnimation from './Animation - 1709780521563.json';

const Loading = () => {
  return (
    <section className='w-layout-w h-screen flex justify-center items-center'>
      <Lottie
        className='w-50% '
        animationData={LoadingAnimation}
      />
    </section>
  );
};

export default Loading;
