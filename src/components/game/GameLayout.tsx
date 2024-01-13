import { Center, Heading } from '@yamada-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketAtom } from '~/globalState/atoms'

const GameLayout = () => {
  const [socket] = useAtom(socketAtom)
  const [questions, setQuestions] = React.useState<string[]>([])

  useEffect(() => {
    socket.on("question", (question: string) => {
      console.log("question", question);
      setQuestions([...questions, question]);
    });
  }, []);

  return (
    <div>
      {questions ? 
      <>
        <Center >第N問</Center>
        <Heading>{questions[0]}</Heading>
      </>
      :
        <Heading>AIが問題を作成しています...</Heading>
      }
      </div>
  )
}

export default GameLayout
