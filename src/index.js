import React from 'react';
import {QueryClientProvider, QueryClient} from "react-query";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from "./pages/App";
import './styles/index.scss';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </BrowserRouter>
);