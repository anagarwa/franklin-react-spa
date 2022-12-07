/*
* <license header>
*/

import React from 'react'
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum'
import ErrorBoundary from 'react-error-boundary'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import SideBar from './SideBar'
import ActionsForm from './ActionsForm'
import { Home } from './Home'
import { About } from './About'
import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState, useRef } from "react";
import data from './metadata.json'

function App (props) {
    console.log('runtime object:', props.runtime)
    console.log('ims object:', props.ims)
    const [videoIndex, setVideoIndex] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        if (videoIndex === 0 && ref.current) {
            ref.current.play();
        }
    }, [ref, videoIndex]);

    // use exc runtime event handlers
    // respond to configuration change events (e.g. user switches org)
    // props.runtime.on('configuration', ({ imsOrg, imsToken, locale }) => {
    //     console.log('configuration change', { imsOrg, imsToken, locale })
    // })
    // // respond to history change events
    // props.runtime.on('history', ({ type, path }) => {
    //     console.log('history change', { type, path })
    // })

    return (
    <Link to="/menu">
        <div className="main">
            <video
                style={{ display: videoIndex === 1 ? "none" : "block" }}
                src={data["url1"].url}
                autoPlay
                muted
                onEnded={() => setVideoIndex((idx) => idx + 1)}
            />
            <video
                style={{ display: videoIndex === 0 ? "none" : "block" }}
                src={data["url2"].url}
                muted
                loop
                ref={ref}
            />
        </div>
    </Link>
    )

    // Methods

    // error handler on UI rendering failure
    function onError (e, componentStack) { }

    // component to show if UI fails rendering
    function fallbackComponent ({ componentStack, error }) {
        return (
            <React.Fragment>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                    Something went wrong :(
                </h1>
                <pre>{componentStack + '\n' + error.message}</pre>
            </React.Fragment>
        )
    }
}

export default App