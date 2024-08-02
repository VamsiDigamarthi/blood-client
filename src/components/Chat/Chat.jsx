import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { API } from "../../core/utils";
import Conversation from "../Conversation/Conversation";
import ChatBox from "../Chatbox/ChatBox";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const UUUU = useSelector((state) => state.authReducer.authData);
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [uniqueChat, setUniqueChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const [mobileViewChat, setMobileViewChat] = useState(true);
  const [chatsFilterByName, setChatsFilterByName] = useState("");
  const [notifications, setNotifications] = useState([]);
  //
  const [notifIO, setNotifIO] = useState({});

  const navigate = useNavigate();
  const [UUU, setUUU] = useState(null);

  
  useEffect(() => {
    API.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${UUUU.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data?._id);
        setUUU(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //
  const getAllNotificationsFun = () => {
    API.get(`/message/all/notifications/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(UUU?._id);

  // console.log(notifications);

  useEffect(() => {
    const getChats = async () => {
      try {
        API.get(`/chat/${UUU?._id}`)
          .then((res) => {
            // console.log(res.data);
            let fil = res?.data?.filter(
              (each) => !each?.members.includes(null)
            );
            // console.log(fil);
            const uniqueMemberCombinations = {};
            const filteredData = fil.filter((obj) => {
              const key = obj.members.sort().join("|");
              if (!uniqueMemberCombinations[key]) {
                uniqueMemberCombinations[key] = true;
                return true;
              }
              return false;
            });
            setChats(filteredData);
            setUniqueChat(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    getAllNotificationsFun();
  }, [UUU?._id]);

  // useEffect(() => {
  //   const uniqueMembers = uniqueChat.reduce((acc, curr) => {
  //     const key = JSON.stringify(curr.members.sort());
  //     if (!acc[key]) {
  //       acc[key] = curr;
  //     }
  //     return acc;
  //   }, {});

  //   const result = Object.values(uniqueMembers);
  //   setChats(result);
  // }, [uniqueChat]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.emit("new-user-add", UUU?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [UUU]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("send message");
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    console.log(notifIO);
    if (notifIO !== null) {
      socket.current.emit("send-Notification", notifIO);
    }
  }, [notifIO]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });

    // Handle notification for offline user
    socket.current.on("recieve-notification", (res) => {
      console.log(res);
      setNotifications([...notifications, res]);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== UUU?._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const onHandleMobileViewChange = (each) => {
    setCurrentChat(each);
    setMobileViewChat(false);
    console.log(each);
    const chatMember = each.members.find((member) => member !== UUU?._id);
    API.put(
      `/message/notification/martas/read/${each?._id}/receviredId/${chatMember}`
    )
      .then((res) => {
        console.log(res.data);
        getAllNotificationsFun();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onHandleChatsFilterByName = (e) => {
    setChatsFilterByName(e.taget.value);
  };

  // notifications

  const countNotifications = (chart) => {
    const filterNotification = notifications.filter(
      (each) => each.chartId === chart._id
    );
    return filterNotification.length > 0 ? true : false;
  };

  // desk view
  const onClickConversationCli = (each) => {
    setCurrentChat(each);
    const chatMember = each.members.find((member) => member !== UUU?._id);
    console.log(chatMember);
    API.put(
      `/message/notification/martas/read/${each?._id}/receviredId/${chatMember}`
    )
      .then((res) => {
        console.log(res.data);
        getAllNotificationsFun();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {chats.length > 0 ? (
        <>
          <div className="chat-main">
            {/* <div className="chat-tabs"></div> */}
            <div className="chat-contact-list">
              <div>
                <input type="text" placeholder="Search by name" />
              </div>
              {chats?.map((each, key) => (
                <div
                  key={key}
                  onClick={() => onClickConversationCli(each)}
                  style={{
                    background:
                      currentChat?._id === each?._id && "rgba(0, 0, 0, 0.301)",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Conversation
                    UUU={UUU}
                    data={each}
                    currentUser={UUU?._id}
                    online={checkOnlineStatus(each)}
                    notifications={countNotifications(each)}
                  />
                </div>
              ))}
            </div>
            {/* right side */}
            <div className="chat-message-body">
              <ChatBox
                UUU={UUU}
                chat={currentChat}
                currentUser={UUU?._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
                setNotifIO={setNotifIO}
              />
            </div>
          </div>
          {/* Mobile view */}
          <div className="chat-view-mobile-main-card">
            {mobileViewChat ? (
              <div className="mobile-chat-contact-list">
                <div>
                  <input
                    onChange={onHandleChatsFilterByName}
                    type="text"
                    placeholder="Search by name"
                  />
                </div>
                {chats?.map((each, key) => (
                  <div
                    key={key}
                    onClick={() => onHandleMobileViewChange(each)}
                    style={{
                      background:
                        currentChat?._id === each?._id &&
                        "rgba(0, 0, 0, 0.301)",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <Conversation
                      UUU={UUU}
                      data={each}
                      currentUser={UUU?._id}
                      online={checkOnlineStatus(each)}
                      notifications={countNotifications(each)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mobile-chat-message-body">
                <ChatBox
                  UUU={UUU}
                  chat={currentChat}
                  currentUser={UUU?._id}
                  setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage}
                  setMobileViewChat={setMobileViewChat}
                  setNotifIO={setNotifIO}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="not-chat-card">
          <h3>No Chart Available Plase Waiting For Conversation</h3>
        </div>
      )}
    </div>
  );
};

export default Chat;
