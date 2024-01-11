"use client";

import { Heading, Input } from "@yamada-ui/react";
import React from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { userNameAtom } from "~/globalState/atoms";
import { useAtom } from "jotai";

const Layout = () => {
  const [userName, setUserName] = useAtom(userNameAtom);

  return (
    <>
      <Heading>アプリ名</Heading>
      <Input
        type="text"
        placeholder="ユーザー名を入力"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <CreateRoom userName={userName} />
      <JoinRoom userName={userName} />
    </>
  );
};

export default Layout;
