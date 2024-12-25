import React from 'react'
import RichText from './Richtext';
import { Col, Image, Row } from 'react-bootstrap';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

const ImageWithCaption = (props) => {
    const { data } = props;

    const caption = <RichText json={data.caption} />
    const image = getImage(data?.image?.gatsbyImageData ?? null)
    return <Row>
        <Col md={7}>
            {!!image && <GatsbyImage className='mb-1' image={image} alt='' />}
        </Col>
        <Col md={5}>{caption}</Col>
    </Row>
};

export default ImageWithCaption;