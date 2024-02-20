import { Path, RegisterOptions } from 'react-hook-form';

export interface I_CreateRoomInputName {
  roomName: string;
  roomPassword: string;
}

export interface I_CreateRoomInput {
  name: Path<I_CreateRoomInputName>;
  value: string;
  type: string;
  required: boolean;
  label: string;
  placeholder: string;
  validate?: RegisterOptions;
}
