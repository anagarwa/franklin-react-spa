const {REACT_APP_HOST_URI} = process.env;

export const fetchData = async (path) => {
    if (path.startsWith("local:")) {
        const url = path.replace("local:", "");
        const data = await fetch(url);
        const json = await data.json();
        return json.paths;
    } else {
        const url = `https://author-p60703-e140888-cmstg.adobeaemcloud.com/${path.split(":/")[1]}.model.json`;
        console.log ("url is " + path.split(":/")[1]);
        const data = await fetch(url);
        const json = await data.json();
        return json;
    }
};