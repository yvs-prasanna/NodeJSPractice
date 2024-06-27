import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/BlogsHome'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blogs/:id" component={BlogItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
