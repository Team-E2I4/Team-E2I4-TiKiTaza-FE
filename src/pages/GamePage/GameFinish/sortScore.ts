interface I_member {
  nickname: string;
  score: number;
}
export const sortedRankTie = ({ members }: { members: I_member[] }) => {
  let rank = 1;
  return members
    .map(({ nickname, score }) => ({
      nickname,
      score,
    }))
    .sort(({ score: prevScore }, { score: nextScore }) => nextScore - prevScore)
    .map((data, idx, arr) => {
      if (idx !== 0 && data.score !== arr[idx - 1].score) {
        rank = idx + 1;
      }
      return { ...data, ranking: rank };
    });
};

export const sortedRank = ({ members }: { members: I_member[] }) => {
  return members
    .map(({ nickname, score }) => ({
      nickname,
      score,
    }))
    .sort(
      ({ score: prevScore }, { score: nextScore }) => nextScore - prevScore
    );
};
