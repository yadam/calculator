import React from 'react';
import { fireEvent, getNodeText, render } from '@testing-library/react';
import App from './App';

describe('String Calculator', () => {
  it('renders initial result', () => {
    const { getByText } = render(<App />);
    const result = getByText(/0/i);
    expect(result).toBeInTheDocument();
  });

  it('parses a single operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, { target: { value: '20' } });
    expect(getNodeText(result)).toEqual('20');
  });

  it('parses double operands', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, { target: { value: '1,500' } });
    expect(getNodeText(result)).toEqual('501');
  });

  it('parses multiple operands', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: { value: '1,2,3,4,5,6,7,8,9,10,11,12' },
    });
    expect(getNodeText(result)).toEqual('78');
  });

  it('parses multiple operands with newline delimiters', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: {
        value: `1
        2,3`,
      },
    });
    expect(getNodeText(result)).toEqual('6');
  });

  it('parses multiple operands with custom delimiters of any length', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: {
        value: `//[***]
        11***22***33`,
      },
    });
    expect(getNodeText(result)).toEqual('66');
  });

  it('parses multiple operands with multiple custom delimiters of any length', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: {
        value: `//[*][!!][r9r]
        11r9r22*hh*33!!44`,
      },
    });
    expect(getNodeText(result)).toEqual('110');
  });

  it('parses multiple operands with custom delimiters and invalid characters', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: {
        value: `//,
        2,ff,100`,
      },
    });
    expect(getNodeText(result)).toEqual('102');
  });

  it('parses a missing operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, { target: { value: '5,' } });
    expect(getNodeText(result)).toEqual('5');
  });

  it('parses an invalid operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, { target: { value: '5,tytyt' } });
    expect(getNodeText(result)).toEqual('5');
  });

  it('also considers operands greater than 1000 to be invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, { target: { value: '2,1001,6' } });
    expect(getNodeText(result)).toEqual('8');
  });

  it('displays an error for negative operands', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma or newline delimited/i);
    fireEvent.change(input, {
      target: { value: '1,2,-3,-4,5' },
    });
    expect(getNodeText(result)).toEqual('0');
    const error = getByText(/negative numbers/i);
    expect(error).toBeInTheDocument();
    expect(getNodeText(error)).toEqual(
      'Negative numbers not allowed - [ -3, -4 ]',
    );
  });
});
