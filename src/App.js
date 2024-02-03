// import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';
import { marked } from 'marked';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API)


let message = "";
function handleTextInput(evt){
  // do nothing
}

function keyPressed(evnt){
  if(evnt.key){
    debugger
  }
}

async function sendMessage(){
  const model = genAI.getGenerativeModel({model: 'gemini-pro'})

  const chatWindow = document.querySelector('.chat-window');
  const chatInput = document.querySelector('.chat-input');
  message = chatInput.value
  chatInput.value = ""

  const outgoingMessageLi = document.createElement('li');
  outgoingMessageLi.classList.add('chat-message', 'li');
  const outgoingMessageElement = document.createElement('div');
  outgoingMessageElement.classList.add('chat-message', 'outgoing');
  outgoingMessageElement.innerText = message;


  // Append the message to the chat window
  outgoingMessageLi.appendChild(outgoingMessageElement);
  chatWindow.appendChild(outgoingMessageLi);

  try{
  const result  = await model.generateContent(message);
  console.log(result)
  
  const response = await result.response
  responseAI(response.text())
  // Scroll to the bottom of the chat window
  chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (e){
    responseAI("Something went wrong. Consulting......")
    console.error(e)
  } finally {
    message = ""
  }
}

function responseAI(message){
  const chatWindow = document.querySelector('.chat-window');

  const incomingMessageLi = document.createElement('li');
  incomingMessageLi.classList.add('chat-message', 'li');
  // Create a message element
  const incomingmessageElement = document.createElement('div');
  incomingmessageElement.classList.add('chat-message', 'incoming');
  const markedUpText = marked.parse(message)
  incomingmessageElement.innerHTML = markedUpText

  incomingMessageLi.appendChild(incomingmessageElement)

  chatWindow.appendChild(incomingMessageLi);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function App() {
  return (
    <div className="App">
      <div class="chat-heading">Chat AI</div>

      <ul className='chat-window'></ul>

      <div id="chat-form">
        <textarea id="chat-input" class="chat-input"  placeholder="Enter your message..." onChange={handleTextInput}> </textarea>
        <button type="submit" onClick={sendMessage} onKeyDown={keyPressed} id="submit-btn">Send</button>
      </div>
    </div>
  );
}


export default App;
