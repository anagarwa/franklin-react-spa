import React from "react";
import Text from "./Text";
import "./styles.css"
import "./content/2022-toyota-glanza-facelift-21.jpeg"
import ToyotaLogo from "./content/toyota_logo.jpeg"
import Facelift from "./content/2022-toyota-glanza-facelift-21.jpeg"
import SEQUIA from "./content/2022-toyota-sequoia-26.jpeg"
import COROLA from "./content/toyota-gr-corolla-4.jpeg"
import {Flex, Header, Image, TextField} from "@adobe/react-spectrum";
import {getEditorContext} from "@aem-sites/universal-editor-cors";
import {fetchData} from "./fetchData";
import { useEffect, useState, useRef } from "react";

export const Menu = () => {
    const [urls, setUrls] = useState(0);
    const [isInEditor,setIsInEditor] = useState(false);

    useEffect(() => {
        getEditorContext({ isInEditor: setIsInEditor });
        fetchData("content/imagesurls").then((data1)  => {
            const stringJson = JSON.stringify(data1);
            setUrls(JSON.parse(stringJson));
        });
    }, []);

    if (urls === 0) {
        return (<></>);
    } else {
        return (
            <div className="maindiv">
                <div className="container">
                    <div className="" style={{textAlign: 'center'}}>
                        <img src={ToyotaLogo} className="w3-round" alt="person image" width="250px" height="200px">
                        </img>
                    </div>
                    <div className="links-container">
                        <Flex direction="column" backgroundColor="indigo-600" width="50%">
                            {isInEditor &&
                                <Flex direction="row">
                                    <Header>ImageUrl:</Header>
                                    <Text itemID="urn:aemconnection:/content/imagesurls/url1" itemProp="url" itemType="text"/>
                                </Flex>

                            }
                            <img src={urls["url1"].url} width="375px" height="300px"
                                 className="car-container"></img>
                        </Flex>
                        <Flex direction="column" backgroundColor="indigo-600" width="50%">
                            {isInEditor &&
                                <Flex direction="row">
                                    <Header>ImageUrl:</Header>
                                    <Text itemID="urn:aemconnection:/content/imagesurls/url2" itemProp="url"
                                          itemType="text"/>
                                </Flex>
                            }
                            <img src={urls["url2"].url} width="375px" height="300px"
                                 className="car-container"></img>
                        </Flex>
                        <Flex direction="column" backgroundColor="indigo-600" width="50%">
                            {isInEditor &&
                                <Flex direction="row">
                                    <Header>ImageUrl:</Header>
                                    <Text itemID="urn:aemconnection:/content/imagesurls/url3" itemProp="url" itemType="text"/>
                                </Flex>
                            }
                            <img src={urls["url3"].url} width="375px" height="300px"
                                 className="car-container"></img>
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}