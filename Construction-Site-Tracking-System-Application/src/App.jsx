import Site from './components/site'
import Task from './components/task'
import Image from './components/image'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Site />} />
      <Route path="/site/:id/tasks" element={<Task />} />
      <Route path="/task/:taskId" element={<Image />} />
    </Routes>
  </BrowserRouter>
);

export default App
