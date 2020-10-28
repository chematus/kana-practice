import React from 'react';
import {
  Fade,
  Modal,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';

export default (props) => {
  return (
    <Modal
      open={props.active}
      onBackdropClick={props.toggleModal}
      onEscapeKeyDown={props.toggleModal}
    >
      <Fade in={props.active}>
        <div className="modal">
          <Card>
            <CardActionArea onClick={props.toggleModal}>
              <CardContent>
                <CardMedia image={props.img} className="modal-media" />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};
