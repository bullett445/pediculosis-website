import React from 'react'
import { Link } from 'gatsby'

import {BLOCKS,  INLINES, MARKS} from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {renderRichText} from "gatsby-source-contentful/rich-text"

import ImageWithCaption from './imagewithcaption';
//import QualifiedAnchorLink from './qualifiedAnchorLink';
import PlainHtml from './plainhtml';


const options = {
    renderMark: {
        [MARKS.CODE]: text => <small>{text}</small>,
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            //return <pre>{JSON.stringify(node, null, 4)}</pre>
            console.log(node)
            const fields = node.data.target.fields;
            const targetType = node.data.__typename;
            switch (targetType) {
                case 'imageWithCaption':
                    return <div>
                        <ImageWithCaption fields={fields}/>
                    </div>
                case 'ContentfulHtml':
                    return <PlainHtml node={node.data.html.html}/>
                default:
                    return <pre>NO NO NO, Unknown embedded entry of type {targetType}</pre>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node) => {
            return <pre>{JSON.stringify(node, null, 4)}</pre>
            const targetType = node.data.target.sys.contentType.sys.id;
            switch (targetType) {
                case 'anchor':
                    return <span id={node.data.target.fields.name.de}/>
                case 'html':
                    return <PlainHtml node={node}/>
                default:
                    return <pre>NO NO NO, Unknown inline entry of type {targetType}</pre>
            }

        },
        [INLINES.ENTRY_HYPERLINK]: (node, children) => {
            const targetType = node.data.__typename;
            switch (targetType) {
                case 'ContentfulPage':
                    const targetSlug = node.data.slug;
                    return <Link to={"/" + targetSlug}>{children}</Link>
             /*   case 'anchor':
                    const targetName = node.data.target.fields.name['de'];
                    return <QualifiedAnchorLink to={targetName}>{children}</QualifiedAnchorLink> */
                default:
                    return <pre>NO NO NO, Unknown hyperlink target type {targetType}</pre>
            }
            //return <pre>  {JSON.stringify(node, null, 4)}
            //    {JSON.stringify(children, null, 4)}</pre>
        },
        [INLINES.ASSET_HYPERLINK]: (node, children) => {
            console.log(node)
            return <a href={node.data.uri}>{children}</a>
            //return <pre>  {JSON.stringify(node, null, 4)}
            //    {JSON.stringify(children, null, 4)}</pre>
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return <pre>  {JSON.stringify(node, null, 4)}</pre>
            console.log(node)
            return <img className="float-right p-2" id={node.data.target.fields.title['de']} src={node.data.target.fields.file['de'].url}/>
            
        }

    },
}

const RichText = (props) => {
    console.log(props.json)
    if(!props.json) return null;
    return <div className={"contentful-rich-text"}>{renderRichText(props.json, options)}</div>
}

export default RichText

