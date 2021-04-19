import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import TodoFeature from "./features/TodoFeature";

function App() {
    return (
        <>
            <Header />

            <Switch>
                <Route path="/" exact component={TodoFeature} />
                {/* <Route path="/todos" component={TodoFeature} /> */}
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

export default App;
