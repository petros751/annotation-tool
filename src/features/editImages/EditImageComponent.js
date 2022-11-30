import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva'
import PolygonAnnotation from './PolygonAnnotation';
import { imagesSliceSelector, updateImage, updateActiveImage } from '../../store/imagesSlice';
import NextStepModal from './modals/NextStepModal';
import ResetModal from './modals/ResetModal';
import { Grid, Segment, Button } from 'semantic-ui-react';


const EditImageComponent = () => {
  const [image, setImage] = useState();
  const imageRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({});
  const [flattenedPoints, setFlattenedPoints] = useState();
  const [position, setPosition] = useState([0, 0]);
  const [isMouseOverPoint, setMouseOverPoint] = useState(false);
  const [isPolyComplete, setPolyComplete] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [shapes, setshapes] = useState([]);
  const [enableNextStepModal, setEnableNextStepModal] = useState(false);
  const [enableResetModal, setEnableResetModal] = useState(false);
  const [dispalyCordinates, setDispalyCordinates] = useState(false);
  const { activeImage } = useSelector(imagesSliceSelector);
  const dispatch = useDispatch();

  const imageElement = useMemo(() => {
    const element = new window.Image()
    element.width = 480
    element.height = 360
    element.src = imageSource
    return element
  }, [imageSource]) //it may come from redux

  useEffect(() => {
    const onload = function () {
      setSize({
        width: imageElement.width,
        height: imageElement.height,
      })
      setImage(imageElement)
      imageRef.current = imageElement
    }
    imageElement.addEventListener('load', onload);
    return () => {
      imageElement.removeEventListener('load', onload);
    }
  }, [imageElement])

  useEffect(() => {
    if (activeImage) {
      setPolyComplete(activeImage.isPolyComplete);
      setImageSource(activeImage.url);
      setPoints(activeImage.points);
      setPosition(activeImage.position);
    }
  }, [activeImage]);

  const getMousePos = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y]
  }
  //drawing begins when mousedown event fires.
  const handleMouseDown = (e) => {
    if (isPolyComplete) return
    const stage = e.target.getStage()
    const mousePos = getMousePos(stage)
    if (isMouseOverPoint && points.length >= 3) {
      setPolyComplete(true);
      const newImage = { url: activeImage.url, points, position, isPolyComplete: true }
      dispatch(updateActiveImage(newImage));
    } else {
      setPoints([...points, mousePos]);
    }
  }

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const mousePos = getMousePos(stage);
    setPosition(mousePos);
  }

  const handleMouseOverStartPoint = (e) => {
    if (isPolyComplete || points.length < 3) return
    e.target.scale({ x: 3, y: 3 })
    setMouseOverPoint(true);
  }

  const handleMouseOutStartPoint = (e) => {
    e.target.scale({ x: 1, y: 1 })
    setMouseOverPoint(false);
  }

  const handlePointDragMove = (e) => {
    const stage = e.target.getStage()
    const index = e.target.index - 1
    const pos = [e.target._lastPos.x, e.target._lastPos.y]
    if (pos[0] < 0) pos[0] = 0
    if (pos[1] < 0) pos[1] = 0
    if (pos[0] > stage.width()) pos[0] = stage.width();
    if (pos[1] > stage.height()) pos[1] = stage.height();
    setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
  }

  useEffect(() => {
    setFlattenedPoints(
      points.concat(isPolyComplete ? [] : position).reduce((a, b) => a.concat(b), [])
    );
    if (isPolyComplete) {
      const shapeObj = {
        points,
        position
      }
      setshapes([...shapes, shapeObj]);
    }
  }, [points, isPolyComplete])

  const undo = () => {
    setPoints(points.slice(0, -1));
    setPolyComplete(false);
  }

  const handleGroupDragEnd = (e) => {
    //drag end listens other children circles' drag end event
    if (e.target.name() === 'polygon') {
      let result = []
      let copyPoints = [...points]
      copyPoints.map((point) => result.push([point[0] + e.target.x(), point[1] + e.target.y()]))
      e.target.position({ x: 0, y: 0 }) //needs for mouse position otherwise when click undo you will see that mouse click position is not normal:)
      setPoints(result);
    }
  }

  const showCoordinates = () => {
    setDispalyCordinates(!dispalyCordinates);
  }

  const reset = () => {
    setEnableResetModal(true);
  };

  const submit = () => {
    if (isPolyComplete) {
      const newImage = { url: activeImage.url, points, position, isPolyComplete }
      dispatch(updateImage(newImage));
      setEnableNextStepModal(true);
    }
  };

  return (
    <div className="mainDiv">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment placeholder>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                data-testid='canvas'
              >
                <Stage
                  width={size.width || 480}
                  height={size.height || 360}
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                >
                  <Layer>
                    <Image ref={imageRef} image={image} x={0} y={0} width={size.width} height={size.height} />
                    <PolygonAnnotation
                      points={points}
                      flattenedPoints={flattenedPoints}
                      handlePointDragMove={handlePointDragMove}
                      handleGroupDragEnd={handleGroupDragEnd}
                      handleMouseOverStartPoint={handleMouseOverStartPoint}
                      handleMouseOutStartPoint={handleMouseOutStartPoint}
                      isFinished={isPolyComplete}
                    />
                  </Layer>
                </Stage>
                <Button data-testid='coordinates' style={{ marginTop: 20 }} onClick={showCoordinates}>
                  Coordinates
                </Button>
                <Button data-testid='undo' style={{ marginTop: 20 }} onClick={undo}>
                  Undo
                </Button>
                <Button data-testid='reset' style={{ marginTop: 20 }} onClick={reset} >Reset</Button>
                {isPolyComplete &&
                  <Button data-testid='submit' style={{ marginTop: 20 }} onClick={submit}>
                    Submit
                  </Button>
                }
                {dispalyCordinates && (
                  <div
                    data-testid='coordinates-box'
                    style={{ width: 400, boxShadow: '7px 7px 5px .4em rgba(0,0,0,.1)' }}
                  >
                    <span style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(points)}</span>
                  </div>
                )}
                {/* Modals */}
                {enableNextStepModal
                  && (
                    <NextStepModal
                      modalOpen={enableNextStepModal}
                      url={activeImage.url}
                      handleClose={
                        () => {
                          setEnableNextStepModal(false);
                        }
                      }
                    />
                  )}
                {enableResetModal
                  && (
                    <ResetModal
                      modalOpen={enableResetModal}
                      url={activeImage.url}
                      handleClose={
                        () => {
                          setEnableResetModal(false);
                        }
                      }
                    />
                  )}
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default EditImageComponent;
