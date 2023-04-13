import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "react-query";
import {Provider} from "react-redux";
import App from "./pages/App";
import store from "./redux/store";
import {ReactQueryDevtools} from "react-query/devtools";
import './styles/index.scss';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
                <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"}/>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);