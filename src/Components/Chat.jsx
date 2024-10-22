import React,{useState} from 'react';
import axios from 'axios';
import Message from './Message';
function Chat() {

  // we can take text input 
  // result will be translated in target language and result can add a feature to speak out the translated text
  // create authentication for the user to login logout and also can save his/her chat history 
  
  

    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState({ source: 'en', target: 'es' }); // Default languages
    const [transcription, setTranscription] = useState('');

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        // Set the language for recognition based on the selected source language
        recognition.lang = language.source;

        recognition.onstart = () => {
            setIsListening(true);
            console.log('Voice recognition started. Try speaking into the microphone.');
        };

        recognition.onresult = async (event) => {
            const spokenText = event.results[0][0].transcript;
            setTranscription(spokenText);
            console.log('You said: ', spokenText);
            await translateText(spokenText);
        };

        recognition.onend = () => {
            setIsListening(false);
            console.log('Voice recognition ended.');
        };

        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
    };

    const translateText = async (text) => {
        try {
            const response = await axios.post(`https://api.mymemory.translated.net/get?q=${text}&langpair=${language.source}|${language.target}`);
            // axios.post('https://api.mymemory.translated.net/get', null, {
            //     params: {
            //         q: text,
            //         langpair: `${language.source}|${language.target}`,
            //     },
            // });
            const translatedText = response.data.responseData.translatedText;
            setMessages((prevMessages) => [
                ...prevMessages,
                { sourceText: text, translatedText, sourceLang: language.source, targetLang: language.target },
            ]);
            setTranscription('');
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };
    
  return (
<div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg shadow-lg border border-cyan-400/20 backdrop-blur-sm">
    <div className="mb-6 bg-black/30 p-6 rounded-lg shadow-xl border border-cyan-400/30">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Language Options</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="source-language" className="mr-4 font-medium text-cyan-400">Source Language:</label>
        <select
          className="bg-black/50 text-cyan-100 border border-cyan-400/30 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
          value={language.source}
          onChange={(e) => setLanguage({ ...language, source: e.target.value })}
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="gu">Gujarati</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="target-language" className="mr-4 font-medium text-cyan-400">Target Language:</label>
        <select
          className="bg-black/50 text-cyan-100 border border-cyan-400/30 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
          value={language.target}
          onChange={(e) => setLanguage({ ...language, target: e.target.value })}
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="gu">Gujarati</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={startListening}
          disabled={isListening}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-medium py-2 px-4 rounded-md mr-2 border border-cyan-400/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium py-2 px-4 rounded-md border border-red-400/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
        >
          Stop Listening
        </button>
      </div>
    </div>
    <div className={`bg-black/40 p-6 rounded-lg shadow-xl border border-cyan-400/20 backdrop-blur-sm ${messages.length > 0 ? "block":"hidden"}`}>
      <div className="space-y-4">
        <Message messages={messages} />
      </div>
    </div>
</div>
  )
}

export default Chat
