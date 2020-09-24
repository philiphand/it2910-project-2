import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from '../App';

it('Checks if input menu is working correctly', () => {
    const {getByAltText, getByTestId} = render(
        <App/>,
    ); 

    fireEvent.click(getByAltText("Input"))
    expect(getByTestId("inputMenu")).toHaveClass("open")

    fireEvent.click(getByAltText("Input"))
    expect(getByTestId("inputMenu")).toHaveClass("closed")

    fireEvent.change(getByTestId("fromColorR"), { target: { value: '255' } })
    fireEvent.change(getByTestId("fromColorG"), { target: { value: '255' } })
    fireEvent.change(getByTestId("fromColorB"), { target: { value: '255' } })
    fireEvent.change(getByTestId("fromColorA"), { target: { value: '0' } })

    expect(getByTestId("fromColorPreview")).toHaveStyle("background: rgba(255, 255, 255, 0)");

});