import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Input, InputGroup } from 'reactstrap';
import axios from 'axios'
import Product from '../components/Product'
import ProductDetail from '../components/ProductDetail'
import InfiniteScroll from "react-infinite-scroller"
import X2JS from 'x2js'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function Home () {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productDetail, setProductDetail] = useState(null)

  useEffect(() => {
    // Read the README.md first
    axios.get('https://cors-anywhere.herokuapp.com/http://api.elevenia.co.id/rest/prodservices/product/listing?page=1', {
      headers: {
        'openapikey': '721407f393e84a28593374cc2b347a98',
      }
    }).then((res) => {
        let x2js = new X2JS();
        let jsonData = x2js.xml2js(res.data);
        setProducts(jsonData.Products.product);
        setResultSearch(jsonData.Products.product);      
        setPage((page) => (page + 1));
    });
  }, []);

  const addCart = (product) => {
    MySwal.fire({
      icon: 'success',
      title: 'Cart Updated',
    }).then(() => {
      let localCart = JSON.parse(localStorage.getItem('carts')) ? JSON.parse(localStorage.getItem('carts')) : [];
      if (localCart.some((el) => el.prdNm === product.prdNm)) {
        let indexProduct = localCart.findIndex((el) => el.prdNm === product.prdNm)
        localCart[indexProduct].qty += 1
        localStorage.setItem('carts', JSON.stringify(localCart))
      } else {
        let productWithQty = {...product, qty: 1}
        let updatedCart = localCart.concat(productWithQty)
        localStorage.setItem('carts', JSON.stringify(updatedCart))
      }
    })
  }

  const openDetail = (productId) => {
    setIsModalOpen(true)
    // Read the README.md first
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.elevenia.co.id/rest/prodservices/product/details/${productId}`, {
      headers: {
        'openapikey': '721407f393e84a28593374cc2b347a98',
      }
    }).then((res) => {
        let x2js = new X2JS();
        let jsonData = x2js.xml2js(res.data);
        setProductDetail(jsonData.Product);
    });
  }

  const closeDetail = () => {
    setProductDetail(null)
    setIsModalOpen(false)
  }

  const searchProduct = () => {
    let resultTitle = [];
    resultTitle = products.filter((el) => {
      return el.prdNm.toLowerCase().includes(searchInput.toLowerCase()) 
    })
    setResultSearch(resultTitle);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    searchProduct(); 
  }

  const loader = (
    <div className="text-center mb-5" key="loader">
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    </div>
  );

  const loadMore = () => {
    axios.get('https://cors-anywhere.herokuapp.com/http://api.elevenia.co.id/rest/prodservices/product/listing', {
      params: {
        page: page
      },
      headers: {
        'openapikey': '721407f393e84a28593374cc2b347a98',
      }
    }).then((res) => {
        let x2js = new X2JS();
        let jsonData = x2js.xml2js(res.data);
        setProducts(products => products.concat(jsonData.Products.product));
        setResultSearch(products => products.concat(jsonData.Products.product));
        setPage((page) => (page + 1));
    });
  }

  const renderProduct = () => {
    if (resultSearch.length > 0) {
      return resultSearch.map((el, index) => {
        return (
          <Product
            key={index}
            product={el}
            addCart={addCart}
            openDetail={openDetail}
          />
        )
      });
    }
  }

  return (
    <InfiniteScroll
      initialLoad={false}
      hasMore={true} 
      loadMore={loadMore}
      loader={loader}
    >
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h2 className="my-4">
                Marketplace App   
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md="2" className="text-start">
              <Button
                color="success"
                className="mb-3"
                onClick={() => navigate('/cart')}
              >
                Carts
              </Button>
            </Col>
            <Col md="10">
              <Form onSubmit={(e) => searchSubmit(e)}>
                <InputGroup>
                  <Input
                    placeholder="Search product by Title"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button
                    onClick={() => searchProduct()}
                  >
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            {renderProduct()}
          </Row>
        </Container>
        <ProductDetail
          productDetail={productDetail}
          isModalOpen={isModalOpen}
          closeDetail={closeDetail}
        />
      </div>
    </InfiniteScroll>
  );
}

export default Home;