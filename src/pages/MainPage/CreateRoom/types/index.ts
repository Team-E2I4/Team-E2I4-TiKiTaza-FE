import { Path, RegisterOptions } from 'react-hook-form';

export interface I_CreateRoomInputName {
  title: string;
  password: string;
}

export interface I_CreateRoomSelectName {
  round: number;
  maxPlayer: number;
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

export interface I_CreateRoomSelectOptionValues {
  value: number;
  text: string;
}
export interface I_CreateRoomSelect {
  name: Path<I_CreateRoomSelectName>;
  label: string;
  optionValues: I_CreateRoomSelectOptionValues[];
}
