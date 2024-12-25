import React from 'react'
import { Link } from 'gatsby'

import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import ImageWithCaption from './Imagewithcaption';
import QualifiedAnchorLink from './QualifiedAnchorLink';
import PlainHtml from './plainhtml';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type TypeContentfulPage = NonNullable<Queries.PageBySlugQuery['contentfulPage']>;
type TypeTextBody = NonNullable<TypeContentfulPage['textbody']>;
type TypeReferences = NonNullable<NonNullable<TypeTextBody['references']>[number]>;
type WithoutEmpty<T> = T extends T ? {} extends T ? never : T : never
type TypeReference = WithoutEmpty<TypeReferences>

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
                    console.log(data)
                    const image = getImage(data?.image?.gatsbyImageData ?? null)
                    return <div>
                        {!!image && <GatsbyImage image={image} alt='' />}
                    </div >
                case 'ContentfulHtml':
                    return <PlainHtml node={node.data.html.html} />
                default:
                    return <pre>NO NO NO, Unknown embedded entry of type {targetType}</pre>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node) => {
            return <pre>{JSON.stringify(node, null, 4)}</pre>
            const targetType = node.data.target.sys.contentType.sys.id;
            switch (targetType) {
                case 'anchor':
                    return <span id={node.data.target.fields.name.de} />
                case 'html':
                    return <PlainHtml node={node} />
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
            console.log(node)
            return <a href={node.data.uri}>{children}</a>
            //return <pre>  {JSON.stringify(node, null, 4)}
            //    {JSON.stringify(children, null, 4)}</pre>
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const data: TypeReference = node.data.target;
            const targetType = data.__typename;
            if (targetType === 'ContentfulAsset') {
                const image = getImage(data?.gatsbyImageData ?? null)

                return <div className='float-right p-2'>
                    {!!image && <GatsbyImage image={image} alt='' />}
                </div>
            }
        }
    },
}

const RichText = (props) => {
    console.log(props.json)
    if (!props.json) return null;
    return <div className={"contentful-rich-text"}>{renderRichText(props.json, options)}</div>
}

export default RichText

