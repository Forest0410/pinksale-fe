import React, {useState} from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

const WhiteListModal = (props) => {
  const [list, setList] = useState('');
  return (
    <Modal isOpen={props.isOpen} toggle={props.onCloseModal}>
      <ModalHeader toggle={props.onCloseModal}>{props.isAddList? "Add": "Remove"}Whitelist</ModalHeader>
      <ModalBody>
        <textarea style={{width: '100%'}} value={list} onChange={(e) => setList(e.target.value)} rows={10}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() =>props.onChangeList(list, props.isAddList)}>
          {props.isAddList? "Add WhiteList": "Remove WhiteList"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(WhiteListModal);
