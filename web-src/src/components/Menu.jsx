import React from "react";
import Text from "./Text";

export const Menu = () => {
    return(
        <div>
        <div className="menu">
            <h1 className="dialog">Welcome to Toyota!</h1>
            <div className="square">
                Show all models
            </div>
            <div className="square">
                Book 
            </div>
            <div className="square">
                Schedule test drive
            </div>
        </div>
        <div>
            <Text itemID="urn:aemconnection:/content/videourls/url1" itemProp="url" itemType="text"/>
            <Text itemID="urn:aemconnection:/content/videourls/url2" itemProp="url" itemType="text"/>
        </div>
        </div>

    )
}