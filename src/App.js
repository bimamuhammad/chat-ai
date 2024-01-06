// import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API)


let message = "";
function handleTextInput(evt){
  message = evt.target.value
}

async function sendMessage(){
  const model = genAI.getGenerativeModel({model: 'gemini-pro'})

  const chatWindow = document.querySelector('.chat-window');
  const chatInput = document.querySelector('.chat-input');

  const outgoingMessageLi = document.createElement('li');
  outgoingMessageLi.classList.add('chat-message', 'li');
  const outgoingMessageElement = document.createElement('div');
  outgoingMessageElement.classList.add('chat-message', 'outgoing');
  outgoingMessageElement.innerText = message;


  // Append the message to the chat window
  outgoingMessageLi.appendChild(outgoingMessageElement);
  chatWindow.appendChild(outgoingMessageLi);

  try{
    debugger
  const result  = await model.generateContent(message);
  console.log(result)
  
  const response = await result.response
  
  responseAI(response.candidates[0].content.parts[0].text)
  } catch (e){
    console.log('An error occured')
  } finally {
    message = ""
    chatInput.value = ""

    // Scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

}

function responseAI(message){
  const chatWindow = document.querySelector('.chat-window');

  const incomingMessageLi = document.createElement('li');
  incomingMessageLi.classList.add('chat-message', 'li');
  // Create a message element
  const incomingmessageElement = document.createElement('div');
  incomingmessageElement.classList.add('chat-message', 'incoming');
  incomingmessageElement.textContent = message;

  incomingMessageLi.appendChild(incomingmessageElement)

  chatWindow.appendChild(incomingMessageLi);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function App() {
  return (
    <div className="App">
      {/* <div class="chat-window">
        </div> */}

      <ul className='chat-window'></ul>

      <div id="chat-form">
        <textarea id="chat-input" class="chat-input"  placeholder="Enter your message..." onChange={handleTextInput}> </textarea>
        <button type="submit" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}


export default App;
