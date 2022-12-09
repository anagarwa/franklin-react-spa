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
import {Heading} from '@adobe/react-spectrum'
import {Menu} from "./Menu";
import {Flex, Image, Header, TextField} from '@adobe/react-spectrum'

function App (props) {
    console.log('runtime object:', props.runtime)
    console.log('ims object:', props.ims)
    const [videoIndex, setVideoIndex] = useState(0);
    const [isInEditor,setIsInEditor] = useState(false);
    const [urls, setUrls] = useState(0);
    const [renderState, setRenderState] = useState(0);
    const ref = useRef(null);
    let urls1 = {}

    useEffect(() => {
        if (videoIndex === 0 && ref.current) {
            ref.current.play();
        }
    }, [ref, videoIndex]);

    useEffect(() => {
        getEditorContext({ isInEditor: setIsInEditor });
        fetchData("content/videourls").then((data1)  => {
            const stringJson = JSON.stringify(data1);
            setUrls(JSON.parse(stringJson));

        });
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
        return (
            <div>
                {renderState === 0 && isInEditor &&
                    <View padding="size-1000">
                        <Flex direction="row" height="size-3000" gap="size-100" alignItems="safe center">
                            <Flex direction="column" backgroundColor="indigo-600" width="50%">
                                <Header>Introduction Video</Header>
                                <Image src="https://i.imgur.com/Z7AzH2c.png" alt="Sky and roof"/>
                                <TextField label="Name" />
                            </Flex>
                            <Flex direction="column" backgroundColor="seafoam-600" flex>
                                <Header>Loop Video</Header>
                                <Image src="https://i.imgur.com/Z7AzH2c.png" alt="Sky and roof"/>
                                <TextField label="Name" />
                            </Flex>
                        </Flex>
                    </View>

                }
                {renderState === 0 &&
                    <div className="main" onClick={() => setRenderState(1)}>
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

                }
                {renderState === 1 &&
                    <div>
                        <Menu/>
                    </div>
                }

            </div>
        );
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