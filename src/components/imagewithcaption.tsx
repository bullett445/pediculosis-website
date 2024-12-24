import React from 'react'
import RichText from './richtext';
import { Col, Image, Row} from 'react-bootstrap';

const ImageWithCaption = (props) => {
    const {fields} = props;
    const imageUrl: string = fields.image['de'].fields.file['de'].url;
    const caption = <RichText json={fields.caption['de']} />
    return <Row>
            <Col md={7}><Image className={"w-100 mb-1"} src={imageUrl} fluid /></Col>
            <Col md={5}>{caption}</Col>
    </Row>
};

export default ImageWithCaption;