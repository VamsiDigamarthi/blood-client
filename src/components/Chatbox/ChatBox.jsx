import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { format } from "timeago.js";
import { IoSendSharp } from "react-icons/io5";
import { API } from "../../core/utils";
import { useSelector } from "react-redux";
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  setMobileViewChat,
  setNotifIO,
  UUU,
}) => {
  // const UUU = useSelector((state) => state.authReducer.authData);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        API.get(`/auth/getuser/${userId}`)
          .then((res) => {
            setUserData(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
        // const { data } = await getUser(userId);
        // setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        API.get(`/message/${chat?._id}`)
          .then((res) => {
            // console.log(res.data);
            setMessages(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    const senderId = chat.members.find((id) => id === currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database

    // const { data } = await addMessage(message);
    API.post("/message", message)
      .then((res) => {
        setNewMessage("");
        //   console.log(res.data);
        setMessages([...messages, res.data]);
      })
      .catch((e) => {
        console.log(e);
      });

    API.post("/message/notifications", {
      senderId,
      chartId: chat?._id,
      receiverId,
    })
      .then((res) => {
        setNotifIO({
          senderId,
          chartId: chat?._id,
          receiverId,
          isReady: false,
          message,
        });
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // console.log(UUU);

  return (
    <>
      {chat ? (
        <>
          <div className="chat-message-header">
            <div className="chat-back-icons">
              <IoMdArrowRoundBack
                onClick={() => setMobileViewChat(true)}
                size={30}
              />
            </div>
            <div className="convertion-first-card">
              {UUU?.employeeType === "Donor" &&
                userData?.firstName[0]?.toUpperCase()}
            </div>
            <div className="chat-message-name-card">
              <span>
                {UUU?.employeeType === "Donor" &&
                  userData?.firstName?.slice(0, 40)}
              </span>
              <span>{userData?.nameOfLocation?.slice(0, 20)}</span>
            </div>
          </div>

          <div className="chat-meesage-body-inner">
            {messages?.map((message, key) => (
              <div
                key={key}
                ref={scroll}
                className={
                  message.senderId === currentUser
                    ? "send-card"
                    : "recevired-card"
                }
              >
                <span>{message.text}</span>
                <span className="timer-span">{format(message.createdAt)}</span>
              </div>
            ))}

            {/*             
            <div className="send-card">
              <span>Pay Attentions</span>
              <span className="timer-span">12:30</span>
            </div> */}
          </div>
          {/* input card */}
          <form className="chat-send-message-card" onSubmit={handleSend}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              placeholder="send message"
            />
            <button
              type="submit"
              style={{
                cursor: newMessage.length <= 0 ? "not-allowed" : "pointer",
              }}
              disabled={newMessage.length <= 0 && true}
            >
              <IoSendSharp size={30} />
            </button>
          </form>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Tap on a chat to start conversation...</h2>
        </div>
      )}
    </>
  );
};

export default ChatBox;
