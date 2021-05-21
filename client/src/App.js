import './App.css';
import { useEffect, useState } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Game } from './pages/tictactoe.js';
import { Stories } from './pages/stories.js';

// NEXT STEPS

// MOVING ALL THE STUFF TO THEIR INDIVIDUAL FUNCTIONS SO WE CAN USE HOOKS
// IF IT DOESN'T WORK LIKE THAT THEN GG

function Home() {
    return (
        <div>
            <p>hello!</p>
            <p>There's not a lot here. I was simply learning the basics of React.</p>
            <p>You can reach me at damienho02@outlook.com</p>
            <p>The source code for this project may be found at https://github.com/mapi456/reactwebexperiment </p>
        </div>
    );
}

function App() {
    let [APIResponse, setAPIResponse] = useState("Awaiting server response...");

    function checkAPI() {
        fetch('/api/testAPI')
            .then(res => res.text())
            .then(res => setAPIResponse(res))
            .catch(err => {
                console.error('Error: ', err);
                setAPIResponse('Server is inactive or unresponsive. Some services may not function. Refreshing may resolve.')
            });
    }

    //Load dependencies (has to be done at top level, annoying)
    useEffect(() => {
        checkAPI();
    }, []);

    return (
            <Router>
                <div className="top-bar">
                    <ul class="navigation">
                        <Link class="navigation-item" to='/'>Home</Link>
                        <Link class="navigation-item" to='/tictactoe'>Tic Tac Toe</Link>
                        <Link class="navigation-item" to='/stories/Index'>My Writing</Link>
                    </ul>
                </div>

                    <body>
                        <div class='content'>
                            <Switch>
                                <Route path="/tictactoe">
                                    <Game />
                                </Route>
                                <Route path="/stories/:title?">
                                    <Stories />
                                </Route>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="*">
                                    <p>This page doesn't exactly exist.</p>
                                </Route>
                            </Switch>
                        </div>
                        <footer class='footer'>{APIResponse}</footer>
                </body>

            </Router>
    );
}

export default App;

/*<div class="explain-box"
                        onMouseEnter={() => setWelcomeText('noooooooooooooooooooooooooooooooooooooo\nooooooooooooooooooooooooooooo\nooooooooooooooooooooooo')}
                        onMouseLeave={() => setWelcomeText(initWelcomeText)}>
                            <div class="explain">
                                <Switch>
                                    <Route path="/tictactoe">
                                            This is from the preliminary stages of learning React and CSS. I followed the tic-tac-toe tutorial up until completing the base features.
                                            Unfortunately, centering the game does not end well, and I did not want to rewrite the styling to make it work.<br></br><br></br>
                                            The a's are here to test the stickiness of the navigation menu and the summary (this).
                                    </Route>
                                    <Route path='/stories/:title'>
                                        I like to write as a hobby. Here you can see all my excerpts and enjoy/laugh.
                                    </Route>
                                    <Route exact path='/'>
                                        <p>
                                            {welcomeText}
                                        </p>
                                    </Route>
                                    <Route path='*'>
                                        What are you doing here?
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>*/