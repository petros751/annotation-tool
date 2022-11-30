import {Route, Routes} from 'react-router-dom';
import MainComponent from './features/MainComponent';
import EditImageComponent from './features/editImages/EditImageComponent'
import Navbar from './features/core/Navbar';

const App =() => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/edit" element={<EditImageComponent />} />
      </Routes>
    </div>
  );
}

export default App;
