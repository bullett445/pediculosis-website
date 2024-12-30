import React, { FunctionComponent } from 'react'
import RichText, { TypeReference } from './Richtext';
import { Col, Image, Row } from 'react-bootstrap';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import assert from 'assert';

interface ImageWithCaptionProps {
    data: TypeReference;
}
const ImageWithCaption: FunctionComponent<ImageWithCaptionProps> = (props) => {
    const { data } = props;

    //assert(data.__typename === 'ContentfulImageWithCaption');

    const caption = <RichText json={data.caption} />
    const image = getImage(data?.image?.gatsbyImageData ?? null)
    return <Row>
        <Col md={7}>
            {!!image && <GatsbyImage className='mb-1' image={image} alt={data?.image?.description} />}
        </Col>
        <Col md={5}>{caption}</Col>
    </Row>
};

export default ImageWithCaption;