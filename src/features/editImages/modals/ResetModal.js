import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateImage, updateActiveImage } from '../../../store/imagesSlice';

const ResetModal = (props) => {
    const dispatch = useDispatch();

    const onCancel = () => {
        props.handleClose();
    };

    const onReset = () => {
        const newImage = { url: props.url, points: [], position: [], isPolyComplete:false };
        dispatch(updateImage(newImage));
        dispatch(updateActiveImage(newImage));
        props.handleClose();
    };
    return (
        <div data-testid='reset-modal'>
            <Modal size="mini" open={props.modalOpen} data-testid="delete-modal">
                <Modal.Header >Reset</Modal.Header>
                <Modal.Content>
                    <div>
                        You will lose all the shapes that you drew!
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button data-testid='reset-modal-cancel' onClick={onCancel}>Cancel</Button>
                    <Button data-testid='reset-modal-reset' basic onClick={onReset}>Reset</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ResetModal;
