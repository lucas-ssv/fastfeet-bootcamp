import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Order from '~/pages/Order';
import RegisterOrder from '~/pages/Order/RegisterOrder';
import UpdateOrder from '~/pages/Order/UpdateOrder';

import Deliverer from '~/pages/Deliverer';
import RegisterDeliverer from '~/pages/Deliverer/RegisterDeliverer';
import UpdateDeliverer from '~/pages/Deliverer/UpdateDeliverer';

import Recipient from '~/pages/Recipient';
import RegisterRecipient from '~/pages/Recipient/RegisterRecipient';
import UpdateRecipient from '~/pages/Recipient/UpdateRecipient';

import Problem from '~/pages/Problem';

export default function routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/order" exact component={Order} isPrivate />
            <Route path="/order/register" component={RegisterOrder} isPrivate />
            <Route path="/order/update/:id" component={UpdateOrder} isPrivate />

            <Route path="/deliverer" exact component={Deliverer} isPrivate />
            <Route
                path="/deliverer/register"
                component={RegisterDeliverer}
                isPrivate
            />
            <Route
                path="/deliverer/update/:id"
                component={UpdateDeliverer}
                isPrivate
            />

            <Route path="/recipient" exact component={Recipient} isPrivate />
            <Route
                path="/recipient/register"
                component={RegisterRecipient}
                isPrivate
            />
            <Route
                path="/recipient/update/:id"
                component={UpdateRecipient}
                isPrivate
            />

            <Route path="/problem" component={Problem} isPrivate />

            <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
    );
}
