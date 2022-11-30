import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainComponent from "./MainComponent";
import { store } from '../store/store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

//test block
test("Main Component", () => {
// render the component on virtual dom
    render(<Provider store={store}><Router><MainComponent /></Router></Provider>);

    expect(screen.getByTestId("footer")).toHaveTextContent(/Copyright © 2022 P.Karkanis/);
    expect(screen.getByTestId("cloudUploadIcon")).toBeInTheDocument();
    expect(screen.getByTestId("browse-button")).toBeInTheDocument();
    expect(screen.getByTestId("images-outline")).toBeInTheDocument();
});