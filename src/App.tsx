import './App.css'
import {Provider} from "react-redux";
import store from './store/store.js';
import MainPage from "./pages/MainPage.tsx";


function App() {
  return (
      <Provider store={store}>
          <MainPage/>
      </Provider>
  )
}

export default App
