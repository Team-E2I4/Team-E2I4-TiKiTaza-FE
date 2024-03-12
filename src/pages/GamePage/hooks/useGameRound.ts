import { useCallback, useEffect, useRef, useState } from 'react';

interface UseGameRoundProps {
  isNextRound: boolean;
  onNextRound?: () => void;
  onRoundFinish: (currentRound: number) => void;
}

const useGameRound = ({
  isNextRound,
  onNextRound,
  onRoundFinish,
}: UseGameRoundProps) => {
  //TODO: publishIngame -> zustand에서 가져오기?!

  const [currentRound, setCurrentRound] = useState(1);
  const didRoundFinishSubmitted = useRef(false);

  const handleRoundFinish = useCallback(() => {
    if (didRoundFinishSubmitted.current) {
      return;
    }
    onRoundFinish(currentRound);
    didRoundFinishSubmitted.current = true;
  }, [currentRound]);

  useEffect(() => {
    if (!isNextRound) {
      return;
    }

    didRoundFinishSubmitted.current = false;
    setCurrentRound((prev) => prev + 1);
    onNextRound?.();
  }, [isNextRound]);

  return { currentRound, handleRoundFinish };
};

export default useGameRound;
