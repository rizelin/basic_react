import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar'
import routers from './routes';



function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            {routers.map((router) => {
              return <Route key={router.path} exact path={router.path} component={router.component} />
            })}
          </Switch>
        </div>
      </Router>
    </>
    
  );
}

export default App;