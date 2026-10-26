import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
function AddCabin() {
  return (
    <div>
      {/* <Button onClick={(e) => setIsOpenModal(!isOpenModal)}>
        Add new Cabin
      </Button>
      {isOpenModal && (
        <Modal onCloseModal={(e) => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={(e) => setIsOpenModal(false)} />
        </Modal>
      )} */}

      <Modal>
        <Modal.Open opensWindowName="cabin-form">
          <Button>Add Newsss Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
