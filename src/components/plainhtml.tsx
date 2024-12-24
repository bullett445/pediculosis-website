import React from "react"

const PlainHtml = (props) => {
    return <pre>{JSON.stringify(props.node, null, 4)}</pre>
    let html: string = props.node.data.target.fields.html.de
    const assets = props.node.data.target.fields.assets?.de
    let i = 1;
    if(assets) {
        for (const asset of assets) {
            const url = asset.fields.file.de.url
            const placeholder = '%ASSET' + i++;
            const re = new RegExp(placeholder, 'g')
            html = html.replace(re, url);
        }
    }

    return <div dangerouslySetInnerHTML={{ __html: html}}/>
}

export default PlainHtml
