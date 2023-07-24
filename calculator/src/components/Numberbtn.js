import React from 'react';
import { Button, Col } from 'react-bootstrap';

export const Numberbtn = ({ value, handleclicking }) => {
    let buttonColor;
    switch(value) {
        case ("C") :
        case "=":
        case "+":
        case "-":
        case "/":
        case "*":
        case ("sin") :
        case ("cos") :
        case ("tan") :
            buttonColor = "btn-spcl-color";
            break;
        default:
            buttonColor = "btn-color";
            break;
    }
    return (<>
        <Col xs={3} className="text-center p-1">
            <Button className={`Numberbtn ${buttonColor} w-100 rounded-3`} value={value} onClick={(e) => { handleclicking(e.target.addEventListener) }}>{value}</Button>
        </Col>
    </>)
}
