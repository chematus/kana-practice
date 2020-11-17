import React from 'react';
import {
  Fade,
  Modal,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';

export default ({ active, toggleModal, img }) => {
  return (
    <Modal
      open={active}
      onBackdropClick={toggleModal}
      onEscapeKeyDown={toggleModal}
    >
      <Fade in={active}>
        <div className="modal">
          <Card>
            <CardActionArea onClick={toggleModal}>
              <CardContent>
                <CardMedia image={img} className="modal-media" />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};
