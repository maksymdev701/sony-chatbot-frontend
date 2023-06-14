import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";

interface MessageType {
  type: string;
  text: string;
}

const ChatItem = ({ type, text }: MessageType, index: number) => {
  switch (type) {
    case "human":
      return (
        <div className="flex max-w-[70%] gap-2" key={index}>
          <img
            alt="user"
            width={30}
            className="h-7"
            src="/assets/images/user.png"
          />
          <p className="bg-blue-400 rounded p-2">{text}</p>
        </div>
      );
    case "bot":
      return (
        <div className="flex justify-end" key={index}>
          <div className="flex flex-row-reverse max-w-[70%] gap-2">
            <img
              alt="bot"
              width={30}
              className="h-9"
              src="/assets/images/bot.png"
            />
            <p className="bg-gray-400 rounded p-2">{text}</p>
          </div>
        </div>
      );
  }
};

const ChatRoom = () => {
  const [history, setHistory] = useState([
    {
      type: "human",
      text: "Hello!",
    },
    {
      type: "bot",
      text: "Ask me any thing.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const msgRef = useRef<HTMLInputElement>(null);
  const historyBoxRef = useRef<HTMLDivElement>(null);
  const { sendMessage, lastMessage } = useWebSocket(
    `${process.env.REACT_APP_SOCKET_URL}/api/chat`
  );

  useEffect(() => {
    if (lastMessage !== null) {
      setHistory([...history, { type: "bot", text: lastMessage.data }]);
      setLoading(false);
      setTimeout(() => {
        if (historyBoxRef.current)
          historyBoxRef.current.scrollTop = historyBoxRef.current.scrollHeight;
      }, 100);
    }
  }, [lastMessage]);

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      alert("AI bot is thinking!");
      return;
    }

    if (msgRef.current !== null) {
      let msg = msgRef.current.value;
      setHistory([...history, { type: "human", text: msg }]);
      setLoading(true);
      sendMessage(msg);
      setTimeout(() => {
        if (historyBoxRef.current)
          historyBoxRef.current.scrollTop = historyBoxRef.current.scrollHeight;
      }, 100);
      msg = "";
    }
  };

  return (
    <div className="p-4 max-w-7xl flex flex-col h-screen gap-3">
      <div
        ref={historyBoxRef}
        className="flex-1 border p-4 overflow-auto chat-history flex flex-col gap-2 shadow-lg shadow-cyan-950"
      >
        {history.map((item, index) => {
          return ChatItem(item, index);
        })}
      </div>
      <form className="flex gap-4" onSubmit={handleSumbit}>
        <input
          ref={msgRef}
          type="text"
          className="flex-1 border border-gray-700 rounded px-2"
        />
        <button className="border rounded px-4 py-1 bg-blue-400 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
