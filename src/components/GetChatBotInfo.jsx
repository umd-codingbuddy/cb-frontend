import { useBeakFunction, useBeakInfo } from "@beakjs/react";

export default function GetChatBotInfo({ chatbotContent, getUserText, onCountCallback }) {

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

    useBeakInfo("task", "execute getUserText and give me the count of how much AI is used")



    return <></>;
}