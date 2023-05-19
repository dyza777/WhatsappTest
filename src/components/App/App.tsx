import { Routes, Route, Link } from 'react-router-dom';
import ChatScreen from '../../containers/ChatScreen/ChatScreen';
import LoginScreen from '../../containers/LoginScreen/LoginScreen';
import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
        </Routes>
    </div>
  );
}

export default App;
