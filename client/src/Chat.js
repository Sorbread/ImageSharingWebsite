import React from 'react'
import {useState,useEffect} from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import {AiFillPlusCircle} from 'react-icons/ai';
import Avatar from 'react-avatar';

export default function Chat({socket,name, room}) {
    const [messageList, setMessageList] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const onImageChange = async (ev) => {
      
      if (ev.target.files && ev.target.files[0]) {
        //const imageFile = URL.createObjectURL(ev.target.files[0])
        
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0])
        reader.onload = async () => {
            const reader_res = reader.result
            const message_data = 
            {
                type: "image",
                author: name,
                room: room,
                params: {
                  file: reader_res,
                },
            };
            console.log(message_data)
            await socket.emit("message_send",message_data);
            setMessageList([...messageList,message_data]);
            setImage("");
        }
        
        
      }
      
    }

    const submitText = async() => {
        const message_data = 
        {
            type: "text",
            author: name,
            room: room,
            params: {
              content: text,
            },
        }
        await socket.emit("message_send",message_data)
        setMessageList((list) => [...list,message_data]);
        setText("");
    }
  
    useEffect(() => {
      socket.on("message_recieve",(message_data) => {
        console.log("recieve")
        setMessageList((list) => [...list,message_data]);
        
      });
    }, [socket])

    const addAvatar = (message,index) => {
        
        if (messageList[index-1] && message.author !== messageList[index-1].author || !messageList[index-1]) {
            return (
                <div className="message_author">
                    
                    <Avatar name={message.author} size={40} />
                </div>
            )
        }
        return(
        <div className="message_author">
                <div className="fillInAvatar"></div>
        <div/>
        </div>);
    }

    return (
        <div className="chat_box">
            <div>
                <ScrollToBottom className="message_container">
                    
                    {messageList.map((message,index) => {
                        const lastMessageSameAuthor = (messageList[index-1] && message.author !== messageList[index-1].author || !messageList[index-1]);

                        if (message.type === "image") {
                            return <div className={`message ${lastMessageSameAuthor ? "far" : "close"}`}>
                               <div className="avatar">{addAvatar(message,index)} </div>
                                
                                <div className="message_content">
                                    {lastMessageSameAuthor ? <h1>{message.author}</h1> : <p></p>}
                                    <img src={message.params.file} alt={`${message.author}_image`} id="message_image"></img>
                                </div>
                                
                            </div>
                        } else if (message.type === "text") {
                            return <div className={`message ${lastMessageSameAuthor ? "far" : "close"}`}>
                                <div className="avatar">{addAvatar(message,index)} </div>
                                <div className="message_content">
                                    {lastMessageSameAuthor ? <h1>{message.author}</h1> : <p></p>}
                                    <p className="message_text">{message.params.content}</p>
                                </div>
                                </div>
                        }
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat_footer">
                <div className="file_upload">
                    <label for="file_upload"><AiFillPlusCircle /></label>
                    <input type="file" onChange={onImageChange} value={image} id="file_upload"/>
                </div>
                
                <div className="text_upload">
                    <input type="text" placeholder="Hey..." value={text} 
                    onChange={(event) => setText(event.target.value)}
                    onKeyPress={(event) => {event.key === "Enter" && submitText()}} />
                </div>
            </div>
            
        </div>
    )
}
