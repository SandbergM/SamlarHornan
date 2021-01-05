// DEPENDENCIES
import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// PAGES
import StartPage from "./pages/StartPage";
import ForumPage from "./pages/ForumPage";
import ThreadPage from "./pages/ThreadPage";
import PageNotFound from "./pages/PageNotFound";

//COMPONENTS
import Header from "./components/Header/Header";

// CONTEXTS
import UserContexProvider from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App primary-bgc">
        <UserContexProvider>
          <main>
            <Header />
            <Switch>
              <Route exact path="/" component={StartPage} />
              <Route exact path="/forum/:forumUrl" component={ForumPage} />
              <Route exact path="/thread/:threadId" component={ThreadPage} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
          </main>
        </UserContexProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
