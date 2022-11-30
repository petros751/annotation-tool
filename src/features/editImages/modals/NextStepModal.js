import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveImage, imagesSliceSelector } from '../../../store/imagesSlice';
import { useNavigate } from "react-router-dom";

const NextStepModal = (props) => {
    const { images } = useSelector(imagesSliceSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onReturnBack = () => {
        props.handleClose();
        navigate('/');
    };

    const onNextImage = () => {
        const currentIndex = _.findIndex(images, { url: props.url });
        if (images.length > 1 && currentIndex+1 !== images.length) {
            const newIndex = currentIndex + 1;
            const activeUrl = images[newIndex];
            dispatch(setActiveImage(activeUrl.url));
        } else {
            navigate('/');
        }
        props.handleClose();

    };
    return (
        <div data-testid='next-step-modal'>
            <Modal size="mini" open={props.modalOpen} data-testid="delete-modal">
                <Modal.Header >Final Step</Modal.Header>
                <Modal.Content>
                    <div>
                        Continue to edit next image or return back to home page?
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button data-testid='next-step-return-btn-modal' onClick={onReturnBack}>Return Home</Button>
                    <Button data-testid='next-step-next-btn-modal' basic onClick={onNextImage}>Next Image</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default NextStepModal;
