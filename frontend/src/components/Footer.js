import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; proshop
                        {/* copyright sign */}

                    </Col>
                </Row>
            </Container>
          footer  
        </footer>
    )
}

export default footer
