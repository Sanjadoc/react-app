import './App.scss';

import Container from './containers/Container';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Container />
      </Router>  
    </ErrorBoundary>
  );
}

export default App;

