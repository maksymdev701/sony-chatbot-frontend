import { useEffect, useRef, useState } from "react";
import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import useWebSocket from "react-use-websocket";

interface MessageType {
  type: string;
  text: string;
}

const Thinking = () => {
  return (
    <div className="flex p-3 w-fit gap-1">
      <div className="w-1 h-1 rounded-[50%] bg-[#b7b7b7] dot_1"></div>
      <div className="w-1 h-1 rounded-[50%] bg-[#b7b7b7] dot_2"></div>
      <div className="w-1 h-1 rounded-[50%] bg-[#b7b7b7] dot_3"></div>
    </div>
  );
};

const ChatItem = ({ type, text }: MessageType, index: number) => {
  switch (type) {
    case "human":
      return (
        <div className="flex mb-1" key={index}>
          <p className="bg-[#b2b2b2] py-2 px-4 rounded-2xl w-fit text-[#f9fbff]">
            {text}
          </p>
        </div>
      );
    case "bot":
      return (
        <div className="flex justify-end mb-1" key={index}>
          <p className="w-fit bg-[#79c7c5] py-2 px-4 rounded-2xl text-[#f9fbff]">
            {text}
          </p>
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
      setHistory((h) => h.concat({ type: "bot", text: lastMessage.data }));
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
      if (!msg) return;
      setHistory([...history, { type: "human", text: msg }]);
      setLoading(true);
      sendMessage(msg);
      setTimeout(() => {
        if (historyBoxRef.current)
          historyBoxRef.current.scrollTop = historyBoxRef.current.scrollHeight;
      }, 100);
      msgRef.current.value = "";
    }
  };

  return (
    <div
      className="flex flex-col flex-1 max-w-md h-[450px] shadow-2xl bg-[#f9fbff] rounded-lg"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <div className="p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <div>
            <img alt="" src="https://picsum.photos/g/40/40" />
          </div>
          <div>Kai Cheng</div>
        </div>
        <ul className="flex items-center gap-2">
          <li>
            <PhoneIcon className="h-6 w-6 p-1" />
          </li>
          <li>
            <VideoCameraIcon className="h-6 w-6 p-1" />
          </li>
          <li>
            <EllipsisVerticalIcon className="h-6 w-6 p-1" />
          </li>
        </ul>
      </div>
      <div ref={historyBoxRef} className="p-4 bg-[#eee] flex-1">
        {history.map((item, index) => {
          return ChatItem(item, index);
        })}
        {loading ? <Thinking /> : null}
      </div>
      <form className="flex p-4" onSubmit={handleSumbit}>
        <input
          ref={msgRef}
          type="text"
          className="flex-1 px-2 border-none"
          placeholder="Type a message"
        />
        <button className="rounded px-2 py-1 hover:text-[#79c7c5] focus:border-none">
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
