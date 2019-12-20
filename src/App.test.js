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
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '20' } });
    expect(getNodeText(result)).toEqual('20');
  });

  it('parses a double operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '1,5000' } });
    expect(getNodeText(result)).toEqual('5001');
  });

  it('parses a negative operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '4,-3' } });
    expect(getNodeText(result)).toEqual('1');
  });

  it('parses a missing operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '5,' } });
    expect(getNodeText(result)).toEqual('5');
  });

  it('parses an invalid operand', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '5,tytyt' } });
    expect(getNodeText(result)).toEqual('5');
  });

  it('displays an error when too many operands are given', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const result = getByText(/0/i);
    const input = getByPlaceholderText(/comma delimited/i);
    fireEvent.change(input, { target: { value: '1,2,3' } });
    expect(getNodeText(result)).toEqual('0');
    const error = getByText(/too many/i);
    expect(error).toBeInTheDocument();
  });
});