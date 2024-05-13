import { useBeakFunction, useBeakInfo } from "@beakjs/react";
import { useEffect } from "react";

export default function ChatbotTask({ chatbotContent, chatbotContentKey, onCountCallback }) {
    //   const [message, setMessage] = useState("Hello World!");

    //   useBeakFunction({

    //     name: "sendUserMessage",
    //     description: "This function sends the user message typed in AI assisstant window.",
    //     parameters: {

    //       message: {
    //         description: "Send user messages whenever they type in chat window",
    //       },
    //     },
    //     handler: ({ message }) => {
    //         console.log("message : ",message);
    //     //   setMessage(message);

    //     //   return `Updated the message to: "${message}"`;
    //     },
    //   });

    useBeakFunction({
        name: "getUserText",
        description: "This function notifies if a user asked for a prompt in the chat window ",
        parameters: {
            count: {
                description: "provide count on how much time user asked for help",
            },
        },
        handler: ({ count }) => {
            // setMessage(message);
            console.log("message : ", count);
            onCountCallback(count);
            return `Updated the message to: "${count}"`;
        },
    });

    useBeakInfo(chatbotContentKey, chatbotContent);

    // useEffect(() => {
    //     if (getUserText) {
    //         useBeakInfo("task", "execute getUserText and give me the count of how much AI is used");
    //     }
    // }, [getUserText])



    return <div></div>;
}