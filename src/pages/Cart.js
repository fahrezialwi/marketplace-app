import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';

function Cart () {
  let localCarts = JSON.parse(localStorage.getItem('carts'));
  const [carts, setCarts] = useState(localCarts ? localCarts : []);

  const convertCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const removeCart = (productId) => {
    let result = carts.filter(el => el.prdNo !== productId);
    setCarts(result);
    localStorage.setItem('carts', JSON.stringify(result))
  }

  const renderProduct = () => {
    if (carts.length > 0) {
      return localCarts.map((el, index) => {
        return (
          <tr key={index}>
            <td>
              {el.prdNm}
            </td>
            <td>
              {convertCurrency(el.selPrc)}
            </td>
            <td>
              {el.qty}
            </td>
            <td>
              {convertCurrency(el.qty * Number(el.selPrc))}
            </td>
            <td>
              <Button color="danger" onClick={() => {removeCart(el.prdNo)}}>Delete</Button>
            </td>
          </tr>
        )
      });
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h2 className="my-4">
              List Carts  
            </h2>
          </Col>
        </Row>
        <Row>
          <Table striped>
            <thead>
              <tr>
                <th>
                  Product Name
                </th>
                <th>
                  Price
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Total Price
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {renderProduct()}
            </tbody>
          </Table>
          { carts.length === 0 && <Col md="12" className="text-center">No Data</Col> }
        </Row>
      </Container>
    </div>
  );
}

export default Cart;