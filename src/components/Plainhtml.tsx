import React, { FunctionComponent } from "react"

interface PlainHtmlProps {
    node: string;
    assets: Array<{ file: { url: string } }>;
}

const PlainHtml: FunctionComponent<PlainHtmlProps> = (props) => {
    //return <pre>{JSON.stringify(props, null, 4)}</pre>
    let i = 1;
    let html = props.node;
    if (props.assets) {
        for (const asset of props.assets) {
            const url = asset.file.url
            const placeholder = '%ASSET' + i++;
            const re = new RegExp(placeholder, 'g')
            html = html.replace(re, url);
        }
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default PlainHtml
