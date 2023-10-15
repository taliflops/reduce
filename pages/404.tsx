import ReducerForm from './components/ReducerForm';
import Reduce from './assets/Reduce';

export default () => (
  <div className='area'>
    <Reduce />
    <ReducerForm error={`We don't know this address, wanna make one?`} />
  </div>
);