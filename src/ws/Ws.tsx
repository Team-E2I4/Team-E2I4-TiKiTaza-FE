import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client'; // 주석처리필요
import { guestLogin } from '@/apis/api';
const { VITE_API_WS_END_POINT } = import.meta.env;

const Ws = () => {
  const stompClient = Stomp.over(() => new SockJS(`${VITE_API_WS_END_POINT}`));
  const guestLoginFn = async () => {
    const { data } = await guestLogin();
    localStorage.setItem('token', data.data?.accessToken);
    token = data.data.accessToken;
  };
  let token = '';
  const fromls = localStorage.getItem('token');
  if (!fromls) {
    guestLoginFn();
  } else {
    token = fromls;
  }
  useEffect(() => {
    stompClient.connect({ Authorization: `Bearer ${token}` }, () =>
      onConnected()
    );
  }, []);
  const connectHeaders = {
    Authorization: 'Bearer ' + token,
    RoomId: `8`, // 없어도 되는
  };
  const onConnected = () => {
    //TODO: roomId는 방입장 GET요청 응답값으로 사용
    stompClient.subscribe(`/from/game-room/1`, () => {}, connectHeaders);
    stompClient.subscribe(`/from/game-room/1/error`, () => {}, connectHeaders);
    // console.log(`${8}번 방 연결 완료!`);
  };
  // const onMessageReceived = (e: any) => {
  //   // called when the client receives a STOMP message from the server
  //   console.log('???', e);
  // };

  const handleEnterGameRoom = (roomId: number) => {
    stompClient.send(
      `/to/game-room/${roomId}/enter`,
      {
        Authorization: `Bearer ${token}`,
        RoomId: 8,
      },
      '어어어어'
    );
  };
  return <div onClick={() => handleEnterGameRoom(8)}>ws</div>;
};

export default Ws;
