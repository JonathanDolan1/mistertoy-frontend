// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
// const { useEffect } = React

import { Provider } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'

import '../src/assets/style/main.css'

function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}

export default App




