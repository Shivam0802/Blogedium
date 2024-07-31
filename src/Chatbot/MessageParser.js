import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {

    message = message.toLowerCase();

    if (message.includes("hello")) {
      actions.greet();
    }

    if (message.includes("password")) {
      actions.password();
    }

    if (message.includes("summer")) {
      actions.summer();
    }

    if (message.includes("winter")) {
      actions.winter();
    } 

    if (message.includes("new it technology") || message.includes("new it tech") || message.includes("latest it technology") || message.includes("latest it tech") || message.includes("it technology news") || message.includes("it tech news")) {
      actions.newITTechnology();
    }

    if (message.includes("publish") || message.includes("publishing")){
      actions.publishing();
    }

    if (message.includes("delete profile") || message.includes("delete my profile") || message.includes("delete account") || message.includes("delete my account")) {
      actions.profileDelete();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {
            greet: actions.greet,
            password: actions.password,
            summer: actions.summer,
            winter: actions.winter,
            newITTechnology: actions.newITTechnology,
            publishing: actions.publishing,
            profileDelete: actions.profileDelete,
          },
        });
      })}
    </div>
  );
};

export default MessageParser;