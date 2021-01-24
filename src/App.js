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
import ForumContextProvider from "./context/ForumContext";

function App() {
  return (
    <BrowserRouter className="row">
      <div className="App primary-bgc">
        <UserContexProvider>
          <ForumContextProvider>
            <main>
              <Header className="col-12" />
              {/* Saving space on desktop for potential list potential favourite forums etc */}
              <div className="col-12 col-lg-6 offset-lg-3 mt-5">
                <Switch>
                  <Route exact path="/" component={StartPage} />
                  <Route exact path="/forum/:forumUrl" component={ForumPage} />
                  <Route
                    exact
                    path="/forum/:forumUrl/thread/:threadId"
                    component={ThreadPage}
                  />
                  <Route exact path="*" component={PageNotFound} />
                </Switch>
              </div>
            </main>
          </ForumContextProvider>
        </UserContexProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
