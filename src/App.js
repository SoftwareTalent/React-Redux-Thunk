import QuestionnaireModal from './components/QuestionnaireModal';
import { setUser } from './utils/user';

setUser('julianantonucci.uw@gmail.com');

function App() {
  return (
    <div className='App'>
      <QuestionnaireModal />
    </div>
  );
}

export default App;
