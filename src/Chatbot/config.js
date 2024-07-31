import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './CustomComponentChatbot/BotAvatar';
import UserAvatar from './CustomComponentChatbot/UserAvatar';
import Password from './Widgets/Password';
import Summer from './Widgets/Summer';
import Winter from './Widgets/Winter';
import Publishing from './Widgets/Publishing';
import Delete from './Widgets/Delete';
import NewITTechnology from './Widgets/NewITTechnology';

const botName = "BlogSphere Bot";

const config = {
  initialMessages: [createChatBotMessage(`Hi! I am ${botName}, How can I help you today?`)],
  botName: botName,

  customComponents: {
      // Replaces the default header
      header: () => <div style={{backgroundColor:'#181717ec', color:' rgba(158, 160, 161, 0.892)', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', padding:'10px'}}>Conversation with BlogSphere Bot</div>,
  
      // Replaces the default bot avatar
      botAvatar: (props) => <BotAvatar {...props} />,
  
      // Replaces the default user avatar
      userAvatar: (props) => <UserAvatar {...props} />
  },

  widgets: [
    {
      widgetName: "password",
      widgetFunc: (props) => <Password {...props} />,
      mapStateToProps: ["password"]
    },
    {
      widgetName: "summer",
      widgetFunc: (props) => <Summer {...props} />,
      mapStateToProps: ["summer"]
    },
    {
      widgetName: "winter",
      widgetFunc: (props) => <Winter {...props} />,
      mapStateToProps: ["winter"]
    },
    {
      widgetName: "newITTechnology",
      widgetFunc: (props) => <NewITTechnology {...props} />,
      mapStateToProps: ["newITTechnology"]
    },
    {
      widgetName: "publishing",
      widgetFunc: (props) => <Publishing {...props} />,
      mapStateToProps: ["publishing"]
    },
    {
      widgetName: "delete",
      widgetFunc: (props) => <Delete {...props} />,
      mapStateToProps: ["delete"]
    }
  ]
};

export default config;