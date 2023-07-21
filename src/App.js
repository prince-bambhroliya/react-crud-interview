import './App.css';
import DataTable from './dataTable/DataTable';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from './redux/reducers';

function App() {
  const store = createStore(rootReducer);
  return (
     <Provider store={store}>
    <DataTable />
  </Provider>
  );
}

export default App;
