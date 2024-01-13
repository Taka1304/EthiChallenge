type Message = {
  id: string;
  roomId: string;
  message: string;
};

type CreateRoom = {
  id: string; //uuid
  hostname: string;
};
