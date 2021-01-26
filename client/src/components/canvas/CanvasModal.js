import React from 'react';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default ({ active, toggleModal, abc, task }) => {
  return (
    <Modal
      open={active}
      onBackdropClick={toggleModal}
      onEscapeKeyDown={toggleModal}
    >
      <Fade in={active}>
        <div className="modal" data-testid="canvas-hint-panel">
          <Card>
            <CardActionArea onClick={toggleModal}>
              <CardContent>
                <CardMedia
                  image={`/img/kana_stroke_order/${abc}/${task}.gif`}
                  className="modal-media"
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};
