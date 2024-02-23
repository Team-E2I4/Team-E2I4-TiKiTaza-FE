import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
// import SockJS from 'sockjs-client';
import { guestLogin } from '@/apis/api';
const { VITE_API_WS_END_POINT } = import.meta.env;
import storageFactory from '@/utils/storageFactory';

const Ws = () => {
  const stompClient = Stomp.over(() => new SockJS(`${VITE_API_WS_END_POINT}`));

  // 테스트용 로그인 로직
  const { getItem, setItem } = storageFactory(localStorage);
  const guestLoginFn = async () => {
    const { data } = await guestLogin();
    setItem('token', data.data.accessToken);
    token = data.data.accessToken;
  };
  let token = getItem('token', '');
  if (!token) {
    guestLoginFn();
  }
  const connectHeaders = {
    Authorization: 'Bearer ' + token,
  };

  const ROOMID_TEST = 3; // 테스트용 RoomId
  useEffect(() => {
    stompClient.connect({ Authorization: `Bearer ${token}` }, () =>
      onConnected()
    );
  }, []);
  const onConnected = () => {
    //TODO: roomId는 방입장 GET요청 응답값으로 사용
    stompClient.subscribe(
      `/from/game-room/${ROOMID_TEST}`,
      (e) => onMessageReceived(e),
      connectHeaders
    );
    stompClient.subscribe(
      `/from/game-room/${ROOMID_TEST}/error`,
      // eslint-disable-next-line no-console
      (e) => console.log('----subscribe error----', e),
      connectHeaders
    );
  };
  const onMessageReceived = ({ body }: { body: string }) => {
    const responsePublish = JSON.parse(body);
    // called when the client receives a STOMP message from the server
    // eslint-disable-next-line no-console
    console.log('onMessageReceived---', responsePublish);
  };

  const handleEnterGameRoom = (roomId: number) => {
    stompClient.send(
      `/to/game-room/${roomId}/enter`,
      connectHeaders,
      '어어어어'
    );
  };
  return <div onClick={() => handleEnterGameRoom(ROOMID_TEST)}>ws</div>;
};

export default Ws;
