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
import {fetchData} from "./fetchData";
import Text from "./Text";
import {getEditorContext} from "@aem-sites/universal-editor-cors";

function App (props) {
    console.log('runtime object:', props.runtime)
    console.log('ims object:', props.ims)
    const [videoIndex, setVideoIndex] = useState(0);
    const [isInEditor,setIsInEditor] = useState(false);
    const [urls, setUrls] = useState(0);
    const ref = useRef(null);
    let urls1 = {}

    useEffect(() => {
        // async function sleepfun() {
        //     console.log('start');
        //
        //     await sleep(1000);
        //
        //     console.log('end');
        // }
        // console.log("in use effect");
        if (videoIndex === 0 && ref.current) {
            ref.current.play();
        }
        // fetchData("content/videourls").then((data1)  => {
        //     urls1 = JSON.parse(data1);
        //     console.log("in use effect3 " + urls1);
        //     console.log("in use effect4 " + JSON.stringify(urls1));
        // });
        // console.log("in use effect2 " + JSON.stringify(urls1));
    }, [ref, videoIndex]);

    useEffect(() => {
        getEditorContext({ isInEditor: setIsInEditor });
        fetchData("content/videourls").then((data1)  => {
            const stringJson = JSON.stringify(data1);
            setUrls(JSON.parse(stringJson));
            console.log("in use effect3 " + JSON.stringify(urls));

        });
        console.log("in use effect2 " + JSON.stringify(urls));
    }, []);


    // use exc runtime event handlers
    // respond to configuration change events (e.g. user switches org)
    // props.runtime.on('configuration', ({ imsOrg, imsToken, locale }) => {
    //     console.log('configuration change', { imsOrg, imsToken, locale })
    // })
    // // respond to history change events
    // props.runtime.on('history', ({ type, path }) => {
    //     console.log('history change', { type, path })
    // })

    if (urls === 0) {
        console.log("url is empty");
        return (<></>);
    } else {
        console.log("urls is not empty " + JSON.stringify(urls));
        if (isInEditor) {
            console.log("I am in editor");
        }
        return (
            <div>
            {
                isInEditor &&
                    <div>
                        < Text itemID = "urn:aemconnection:/content/videourls/url1" itemProp = "url" itemType = "text" / >
                        < Text itemID = "urn:aemconnection:/content/videourls/url2" itemProp = "url" itemType = "text" / >
                    </div>
            }

        <Link to="/menu">
                <div className="main">
                    <video
                        style={{ display: videoIndex === 1 ? "none" : "block" }}
                        src={urls["url1"].url}
                        autoPlay
                        muted
                        onEnded={() => setVideoIndex((idx) => idx + 1)}
                    />
                    <video
                        style={{ display: videoIndex === 0 ? "none" : "block" }}
                        src={urls["url2"].url}
                        muted
                        loop
                        ref={ref}
                    />
                </div>
            </Link>
            </div>
        )
    }


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