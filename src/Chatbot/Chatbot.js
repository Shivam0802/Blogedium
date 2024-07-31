import config from './config.js';
import MessageParser from './MessageParser.js';
import ActionProvider from './ActionProvider.js';

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import './MyComponent.css';

const MyComponent = ({closeModal}) => {

  return (
    <>
    <button onClick={closeModal} className='text-white bg-[#A91D3A] px-2 rounded-full mt-1 mb-2 ml-[19.8rem]'>X</button>
    <div className='flex items-center justify-center'>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
    </>
  );
};

export default MyComponent;