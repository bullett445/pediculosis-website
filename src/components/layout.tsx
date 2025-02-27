import React, { FunctionComponent, PropsWithChildren } from 'react'
import { Col, Container, Navbar, Row } from "react-bootstrap";
import SideNavigation from "./SideNavigation";
import Header from "./Header";
import Footer from "./Footer";
import Pagination from "./Pagination";
import "../styles/gatstrap.scss"

interface LayoutProps {
    slug: string;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (props) => {
    const { slug, children } = props

    return (
        <Container className="pt-2 pb-2" id={"swipeme"}>
            <Row id={"header"}>
                <Header />
            </Row>
            <Row className={"d-xl-none"}>
                <Navbar bg={""} expand={"xl"}>
                    <Navbar.Toggle aria-controls={"navbarResponsive"} />
                    <Navbar.Collapse id={"navbarResponsive"}>
                        <SideNavigation slug={slug} keyPrefix={"2"} />
                    </Navbar.Collapse>
                </Navbar>
            </Row>
            <Row>
                <Col className="d-none d-xl-block" lg={"2"}>
                    <div className="d-flex flex-column align-items-start sticky-top pt-2"
                        style={{ 'minHeight': "80vh" }}>
                        <div className={"mb-auto"}>
                            <SideNavigation slug={slug} keyPrefix={"1"} />
                        </div>
                        <div className={"pt-5"}>
                            <small><Footer /></small>
                        </div>

                    </div>
                </Col>
                <Col lg={10}>
                    {children}
                    <Pagination currentSlug={slug} />
                </Col>
            </Row>
            <Row className={"d-xl-none"}>
                <Col className={"text-center"}>
                    <small><Footer /></small>
                </Col>
            </Row>
        </Container>
    )
}

export default Layout
