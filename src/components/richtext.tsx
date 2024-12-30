import React from 'react'
import { Link } from 'gatsby'

import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import ImageWithCaption from './Imagewithcaption';
import QualifiedAnchorLink from './QualifiedAnchorLink';
import PlainHtml from './Plainhtml';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type TypeContentfulPage = NonNullable<Queries.PageBySlugQuery['contentfulPage']>;
type TypeTextBody = NonNullable<TypeContentfulPage['textbody']>;
type TypeReferences = NonNullable<NonNullable<TypeTextBody['references']>[number]>;
type WithoutEmpty<T> = T extends T ? {} extends T ? never : T : never
export type TypeReference = WithoutEmpty<TypeReferences>

const options: Options = {
    renderMark: {
        [MARKS.CODE]: text => <small>{text}</small>,
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            //return <pre>{JSON.stringify(node, null, 4)}</pre>
            const data: TypeReference = node.data.target;
            const targetType = data?.__typename;
            switch (targetType) {
                case 'ContentfulImageWithCaption':
                    return <ImageWithCaption data={data} />
                case 'ContentfulHtml':
                    return <PlainHtml node={data.html.html} assets={data.assets} />
                default:
                    return <pre>NO NO NO, Unknown embedded entry of type {targetType}</pre>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node) => {
            //return <pre>{JSON.stringify(node, null, 4)}</pre>
            const data: TypeReference = node.data.target;
            const targetType = data?.__typename;
            switch (targetType) {
                case 'ContentfulAnchor':
                    return <span id={data.name} />
                case 'ContentfulHtml':
                    return <PlainHtml node={data.html.html} assets={data.assets} />
                default:
                    return <pre>NO NO NO, Unknown inline entry of type {targetType}</pre>
            }

        },
        [INLINES.ENTRY_HYPERLINK]: (node, children) => {
            const data: TypeReference = node.data.target;
            const targetType = data.__typename;
            switch (targetType) {
                case 'ContentfulPage':
                    const targetSlug = data.slug;
                    return <Link to={"/" + targetSlug}>{children}</Link>
                case 'ContentfulAnchor':
                    const targetName = data.name;
                    return <QualifiedAnchorLink to={targetName}>{children}</QualifiedAnchorLink>
                default:
                    return <pre>NO NO NO, Unknown hyperlink target type {targetType}</pre>
            }
            //return <pre>  {JSON.stringify(node, null, 4)}
            //    {JSON.stringify(children, null, 4)}</pre>
        },
        [INLINES.ASSET_HYPERLINK]: (node, children) => {
            //console.log(node)
            return <a href={node.data.target.url} target='_blank'>{children}</a>
            //return <pre>  {JSON.stringify(node, null, 4)}
            //    {JSON.stringify(children, null, 4)}</pre>
        },
        [INLINES.HYPERLINK]: (node, children) => {
            return <a href={node.data.uri} target='_blank'>{children}</a>
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const data: TypeReference = node.data.target;
            const targetType = data.__typename;
            if (targetType === 'ContentfulAsset') {
                const image = getImage(data?.gatsbyImageData ?? null);
                return !!image && <GatsbyImage className='float-end' image={image} alt={data.description} />
            }
        }
    }
}


const RichText = (props) => {
    if (!props.json) return null;
    //console.log(props.json)
    return <div className={"contentful-rich-text"}>{renderRichText(props.json, options)}</div>
}

export default RichText

