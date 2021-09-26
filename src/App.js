import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';

function App() {

  return (

    <div className="App">

      <ToastContainer        
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <CssBaseline />

      <Routes />      
     
    </div>

  );
}

export default App;