import Highlight from 'react-highlight';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import Input from '@/common/Input/Input';

const GameContainer = () => {
  const dummyCode = `function dfs(graph, start, visited) {
    const stack = [];
    stack.push(start);
    while (stack.length) {
      let v = stack.pop();
      if (!visited[v]) {
        console.log(v);
        visited[v] = true;
        for (let node of graph[v]) {
          if (!visited[node]) {
            stack.push(node);
          }
        }
      }
    }
  }`;
  return (
    <>
      <div className='w-[60rem]'>
        <Highlight className='javascript'>{dummyCode}</Highlight>
      </div>
    </>
  );
};
const GameCodePage = () => {
  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[50rem] border-2 border-black'>
          <div className='flex items-end gap-4'>
            <Dashboard
              type='wpm'
              value={90}
            />
            <GameContainer />
            <Dashboard
              type='accuracy'
              value={100}
            />
          </div>
          <Input />
        </div>
      </div>
    </>
  );
};

export default GameCodePage;
