import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';

function App() {
  return (
    <div className="App">

      <CssBaseline />

      <ToastContainer
        theme='colored'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes />

      

      
     
    </div>
  );
}

export default App;
