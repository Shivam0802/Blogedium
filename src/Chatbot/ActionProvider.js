import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleGreet = () => {
    const greetingMessage = createChatBotMessage("Hello! How can I help you today?");
    setState((state) => ({ ...state, messages: [...state.messages, greetingMessage] }));
  };

  const handlePassword = () => {
    const passwordMessage = createChatBotMessage("Sure! Here is the way to reset your password", {
      widget: "password",
    });
    setState((state) => ({ ...state, messages: [...state.messages, passwordMessage] }));
  };

  const handleSummer = () => {
    const summerMessage = createChatBotMessage("Sure! Here is the best places around the world for ", {
      widget: "summer",
    });

    setState((state) => ({ ...state, messages: [...state.messages, summerMessage] }));
  };

  const handleWinter = () => {
    const winterMessage = createChatBotMessage("Sure! Here is the best places around the world for ", {
      widget: "winter",
    });

    setState((state) => ({ ...state, messages: [...state.messages, winterMessage] }));
  }

  const handleNewITTechnology = () => {
    const newITTechnologyMessage = createChatBotMessage("Sure! Here is the latest technology news", {
      widget: "newITTechnology",
    });

    setState((state) => ({ ...state, messages: [...state.messages, newITTechnologyMessage] }));
  }

  const handlePublishing = () => {
    const publishingMessage = createChatBotMessage("Sure! Here is the best places around the world for ", {
      widget: "publishing",
    });

    setState((state) => ({ ...state, messages: [...state.messages, publishingMessage] }));
  }

  const handleProfileDelete = () => {
    const deleteMessage = createChatBotMessage("Sure! Here is the way to delete your profile", {
      widget: "delete",
    });

    setState((state) => ({ ...state, messages: [...state.messages, deleteMessage] }));
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            greet: handleGreet,
            password: handlePassword,
            summer: handleSummer,
            winter: handleWinter,
            newITTechnology: handleNewITTechnology,
            publishing: handlePublishing,
            profileDelete: handleProfileDelete,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

