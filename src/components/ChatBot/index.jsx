import React, { useState } from 'react';
import styles from './ChatBot.module.css';

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput("");
            sendInputToOpenAI(input); // Assuming you have a function to handle OpenAI API
        }
    };

    function sendInputToOpenAI(input) {
        // Assuming you have setup API keys and endpoints
        const apiURL = 'https://api.openai.com/v1/engines/davinci/completions';
        const apiKey = 'YOUR_API_KEY';

        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: input,
                max_tokens: 50
            })
        })
            .then(response => response.json())
            .then(data => {
                setMessages(messages => [...messages, { text: data.choices[0].text, sender: 'ai' }]);
            })
            .catch(error => console.error('Error:', error));
    }


    return (
        <>
            {
                !isChatOpen && (
                    <button className={styles.chatIcon} onClick={toggleChat}>
                        Chat
                    </button>
                )
            }
            {isChatOpen && (
                <div className={styles.chatWindow}>
                    <button className={styles.closeBtn} onClick={toggleChat}>×</button>
                    <div className={styles.messages}>
                        {messages.map((msg, index) => (
                            <p key={index} className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                                {msg.text}
                            </p>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            className={styles.userInput}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}

        </>
    );
}

export default ChatBot;
