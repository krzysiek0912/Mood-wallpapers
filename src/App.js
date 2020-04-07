import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import 'bulma';
import Home from './views/Home';
import MainTheme from './theme/MainTheme';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

// child matches will...
const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};

const App = () => {
    return (
        <MainTheme>
            <Switch>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                    className="route-wrapper"
                >
                    <Route exact path="/" component={Home} />
                    <Route exact path="/a" component={Home} />
                </AnimatedSwitch>
            </Switch>
        </MainTheme>
    );
};

export default App;
