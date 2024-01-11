type Message = {
  id: string;
  roomId: string;
  message: string;
};

type Room = {
  id: string;
  hostName: string;
  phrase: string;
  players: number;
} & Option;

type CreateRoom = {
  id: string; //uuid
  hostname: string;
};
