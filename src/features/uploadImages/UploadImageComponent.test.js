import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadImageComponent from "./UploadImageComponent";
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

//test block
test("Upload Image Component", () => {
// render the component on virtual dom
    render(<Provider store={store}><Router><UploadImageComponent /></Router></Provider>);

// expect(component.find('input[type="file"]')).toExist();
});