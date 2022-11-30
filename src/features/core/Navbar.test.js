import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
//test block
test("NavBar", () => {
// render the component on virtual dom
    render(<Provider store={store}><Router><NavBar /></Router></Provider>);

    expect(screen.getByTestId("img")).toBeInTheDocument();
    expect(screen.getByTestId("home")).toBeInTheDocument();
});