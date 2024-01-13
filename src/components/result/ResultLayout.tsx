import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { socketAtom, playerAtom, roomAtom } from '~/globalState/atoms';

const ResultLayout = () => {
  const [modelAnswer, setModelAnswer] = useState<string>("");

  const [socket, setSocket] = useAtom(socketAtom);
  const [player, setPlayer] = useAtom(playerAtom);
  const [roomState, setRoomState] = useAtom(roomAtom);
  
  useEffect(() => {
    
    socket.on("modelAnswer", (modelAnswer: string) => {
      console.log("modelAnswer", modelAnswer);
      setModelAnswer(modelAnswer);
      setRoomState({
        ...roomState,
        // modelAnswers: [...roomState.modelAnswers, modelAnswer],
      });
    });
  },[])

  return (
    <div>
      {modelAnswer}
    </div>
  )
}

export default ResultLayout
