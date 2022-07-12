import React from 'react';
import { Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

function Product ({product, addCart, openDetail}) {
  const convertCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <Col md="3" sm="6">
      <Card className="my-2 product-card">
        <CardBody className="d-flex flex-column">
          <CardTitle tag="h4" className="mt-3 product-cursor" onClick={() => openDetail(product.prdNo)}>
            {product.prdNm}
          </CardTitle>
          <CardText onClick={() => openDetail(product.prdNo)}>
            {convertCurrency(product.selPrc)}
          </CardText>
          <Button
            color="success"
            className="mt-auto product-cursor"
            onClick={() => addCart(product)}
          >
            Add to Cart
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Product;