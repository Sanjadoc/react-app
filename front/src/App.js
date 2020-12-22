import './App.scss';

import Container from './components/container/Container';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Container />
    </ErrorBoundary>
  );
}

export default App;

