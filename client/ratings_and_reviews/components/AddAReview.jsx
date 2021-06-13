import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import token from '../../env/config.js';
import customStyles from '../customStyles/customStyles.jsx';

function AddAReview(props){
  const [modalIsOpen,setIsOpen] = React.useState(false);

  useEffect(() => {
    Modal.setAppElement('#modal');
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function postReview(productId, rating, summary, body, recommend, name, email, photos, characteristics) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: config.token
    };

    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
      product_id: productId,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: photos,
      characteristics: characteristics
    });
  }

    return (
      <div id="modal">
        <button className="button" onClick={openModal}>ADD A REVIEW</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>close</button>
          <form className="modalForm" style={customStyles.modalForm}>
            <div className="block">
              <label className="label">rating:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">summary:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">body:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">recommend:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">name:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">email:</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="label">photos:</label>
              <input type="text" />
            </div>
            <input className="button" type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
}

export default AddAReview;