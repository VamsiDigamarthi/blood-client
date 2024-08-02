import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";
import { format } from "timeago.js";
import "./conver.css";
import { API } from "../../core/utils";
function Conversation({ setSendMessage }) {
  const location = useLocation();
  const data = location.state;
  const scroll = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data?.data?.insertedId) {
      console.log("ack", data?.insertedId);
    } else {
      console.log(data?.data?._id);
    }
  }, []);

  // Use the data in your component
  console.log(data);
  //   data?.user?._id == curresnt user

  // fetch messages
  useEffect(() => {
    let chatId;
    if (data?.data?.insertedId) {
      chatId = data?.data?.insertedId;
    } else {
      chatId = data?.data?._id;
    }
    const fetchMessages = async () => {
      try {
        API.get(`/message/${chatId}`)
          .then((res) => {
            console.log(res.data);
            setMessages(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (chatId !== null) fetchMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    let chatId;
    if (data?.data?.insertedId) {
      chatId = data?.data?.insertedId;
    } else {
      chatId = data?.data?._id;
    }
    console.log(newMessage);
    const message = {
      senderId: data?.user?._id,
      text: newMessage,
      chatId: chatId,
    };
    const receiverId = data?.data?.members.find((id) => id !== data?.data?._id);
    setSendMessage({ ...message, receiverId });
    if (newMessage.length > 0) {
      API.post("/message", message)
        .then((res) => {
          setNewMessage("");
          console.log(res.data);
          //   setMessages([...messages, res.data]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <section className="conv-main-card">
      <section className="conv-left-side">
        <section className="conv-user-profile">
          <div>
            <span>V</span>
          </div>
          <div>
            <h4>Name</h4>
            <span>Online</span>
          </div>
        </section>
        <section className="conve-chat-body">
          {messages?.map((message, key) => (
            <div
              key={key}
              className={
                message.senderId === data?.user?._id
                  ? "send-card"
                  : "recevired-card"
              }
              ref={scroll}
            >
              <span>{message.text}</span>
              <span className="timer-span">{format(message.createdAt)}</span>
            </div>
          ))}
        </section>
        <section onClick={handleSend} className="conve-form-card">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter Your Message"
            type="text"
          />
          <IoSendSharp color="#ff0000" size={25} />
        </section>
      </section>
      <section className="conv-right-side"></section>
    </section>
  );
}

export default Conversation;
