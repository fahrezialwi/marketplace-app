import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function ProductDetail ({productDetail, isModalOpen, closeDetail}) {
  const convertCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <Modal
      centered
      scrollable={false}
      isOpen={isModalOpen}
      toggle={() => closeDetail()}
    >
      {productDetail ?
        (
          <>
            <ModalHeader toggle={() => closeDetail()}>
              {productDetail.prdNm}
            </ModalHeader>
            <ModalBody>
              <div className="image-product">
                <img src={productDetail.prdImage01} alt={productDetail.prdNm}/>
              </div>
              <h5 className="mb-3">
                {convertCurrency(productDetail.selPrc)}
              </h5>
              <div dangerouslySetInnerHTML={{__html: productDetail.htmlDetail}} />
            </ModalBody>
          </>
        )
        :
        (
          <>
            <ModalHeader toggle={() => closeDetail()}>
              Loading...
            </ModalHeader>
            <ModalBody>
              <div className="text-center mb-5" key="loader">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            </ModalBody>
          </>
        )
      }
    </Modal>
  );
}

export default ProductDetail;