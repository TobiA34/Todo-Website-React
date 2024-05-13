import './App.css';
import TodoList from './components/TodoList';
import Navbar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from './components/pages/Categories';
import Completed from './components/pages/Completed';
import Scheduled from './components/pages/Scheduled';
import Today from './components/pages/Today';
import CustomCategory from './components/pages/CustomCategory';

function App() {
  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/completed" element={<Completed />}></Route>
          <Route path="/scheduled" element={<Scheduled />}></Route>
          <Route path="/today" element={<Today />}></Route>
          <Route path="/category/:id" element={<CustomCategory />}></Route>
          <Route path="/todos" element={<TodoList />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
