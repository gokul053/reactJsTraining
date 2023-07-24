import 'bootstrap/dist/css/bootstrap.min.css';
import './components/mystyle.css';
import {Numberbtn} from 'components/Numberbtn';
import React from 'react';
import { Container, Form, Row } from 'react-bootstrap';

const Calculator = () => {
    let all = [["C","/","*","-"],[7,8,9,"sin"],[4,5,6,"cos"],[1,2,3,"tan"],[0,".","+","="]];
    return (
    <div>
        <Container fluid className="p-5">
        </Container>
        <h1 className="text-center heading-style">CALCULATOR</h1>
        <Container className="w-50 p-5 bg-secondary rounded-4 bgImage">
            <Row className="py-2">
                <Form.Control type='text'>
                </Form.Control>
            </Row>
            { all.map((x)=> {
                    return(
                        <Row>
                            { x.map((y) => { return ( <Numberbtn value={y} handleclicking={(value)=>{console.log(value)}}/> ) }) }
                        </Row>
                    )
                })}
        </Container>
    </div>
    )
}
export default Calculator;