const {REACT_APP_HOST_URI} = process.env;

export const fetchData = async (path) => {
    if (path.startsWith("local:")) {
        const url = path.replace("local:", "");
        const data = await fetch(url);
        const json = await data.json();
        return json.paths;
    } else {
       // const url = `https://author-p60703-e140792-cmstg.adobeaemcloud.com/${path.split(":/")[1]}.1.json`;
        let url = "";
        if (path.includes(":/")) {
            url = `https://author-p60703-e140792-cmstg.adobeaemcloud.com/${path.split(":/")[1]}.1.json`;
        } else {
            url = `https://author-p60703-e140792-cmstg.adobeaemcloud.com/${path}.2.json`;
        }
        console.log ("url1 is " + url);
        const data = await fetch(url, {
                headers: new Headers({
                    'Authorization': 'Basic '+btoa('anagarwa:1')
                })
            }
        );

        const json = await data.json();
        console.log("returned data is" + json);
        console.log("returned data is " + JSON.stringify(json));
        return json;
    }
};