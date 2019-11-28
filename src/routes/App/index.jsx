import React from 'react';
import { Route, Switch } from 'dva/router';

import Dashboard from '@/pages/App/Dashboard';
import Dva from '@/pages/App/Dva';
import Model_1 from '@/pages/App/Model_1';

export default function RoutesIndex() {
    return (
        <Switch>
            <Route exact path="/App" component={Dashboard} />
            <Route exact path="/App/Dva" component={Dva} />
            <Route exact path="/App/Model_1" component={Model_1} />
        </Switch>
    );
}
