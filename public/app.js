import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'

import {About, App, Group, Home, Stream, Student} from './components'
import {
    axbyShow,
    axbyTest,
    axbyTrainer,
    ConvergentsShow,
    ConvergentsTest,
    ConvergentsTrainer,
    ConversionShow,
    ConversionTest,
    ConversionTrainer,
    DiophantineShow,
    DiophantineTest,
    DiophantineTrainer,
    FastDegreeShow,
    FastDegreeTest,
    FastDegreeTrainer,
    FractionShow,
    FractionTest,
    FractionTrainer,
    GCDShow,
    GCDTest,
    GCDTrainer,
    HornerShow,
    HornerTest,
    HornerTrainer,
    InverseShow,
    InverseTest,
    InverseTrainer
} from './components/algorithms'
import * as ReactDOM from "react/lib/ReactDOM";
import React from "react";

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>
);

ReactDOM.render(
    < Router
        history={browserHistory}>
        < Route
            path="/"
            component={App}>
            < IndexRoute
                component={Home}
            />
            < Route
                path="about"
                component={About}
            />
            < Route
                path="gcd/show"
                component={GCDShow}
            />
            < Route
                path="gcd/trainer"
                component={GCDTrainer}
            />
            < Route
                path="gcd/test"
                component={GCDTest}
            />
            < Route
                path="axby1/show"
                component={axbyShow}
            />
            < Route
                path="axby1/trainer"
                component={axbyTrainer}
            />
            < Route
                path="axby1/test"
                component={axbyTest}
            />
            < Route
                path="fraction/show"
                component={FractionShow}
            />
            < Route
                path="fraction/trainer"
                component={FractionTrainer}
            />
            < Route
                path="fraction/test"
                component={FractionTest}
            />
            < Route
                path="convergents/show"
                component={ConvergentsShow}
            />
            < Route
                path="convergents/trainer"
                component={ConvergentsTrainer}
            />
            < Route
                path="convergents/test"
                component={ConvergentsTest}
            />
            < Route
                path="inverse/show"
                component={InverseShow}
            />
            < Route
                path="inverse/trainer"
                component={InverseTrainer}
            />
            < Route
                path="inverse/test"
                component={InverseTest}
            />
            < Route
                path="diophantine/show"
                component={DiophantineShow}
            />
            < Route
                path="diophantine/trainer"
                component={DiophantineTrainer}
            />
            < Route
                path="diophantine/test"
                component={DiophantineTest}
            />
            < Route
                path="fastDegree/show"
                component={FastDegreeShow}
            />
            < Route
                path="fastDegree/trainer"
                component={FastDegreeTrainer}
            />
            < Route
                path="fastDegree/test"
                component={FastDegreeTest}
            />
            < Route
                path="conversion/show"
                component={ConversionShow}
            />
            < Route
                path="conversion/trainer"
                component={ConversionTrainer}
            />
            < Route
                path="conversion/test"
                component={ConversionTest}
            />
            < Route
                path="horner/show"
                component={HornerShow}
            />
            < Route
                path="horner/trainer"
                component={HornerTrainer}
            />
            < Route
                path="horner/test"
                component={HornerTest}
            />
            < Route
                path="group/:groupID"
                component={Group}
            />
            < Route
                path="student/:studentID"
                component={Student}
            />
            < Route
                path="group"
                component={Stream}
            />
        </Route>
    </Router>,
    document.getElementById('mount')
);
