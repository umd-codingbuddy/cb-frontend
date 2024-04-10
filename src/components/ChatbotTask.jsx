import { useBeakFunction, useBeakInfo } from "@beakjs/react";

export default function ChatbotTask() {
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
        description: "This function provides any text typed by user in AI assistant window.",
        parameters: {
            message: {
                description: "provide user typed texts.",
            },
        },
        handler: ({ message }) => {
            // setMessage(message);
            console.log("message : ",message);
            return `Updated the message to: "${message}"`;
        },
    });

    useBeakInfo("current message", "Hello world!");

    return <div></div>;
}