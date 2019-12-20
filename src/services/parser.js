export function parse(input) {
  let result = 0;
  const badOperands = [];
  const operands = input.split(/[,\n]/);
  operands.forEach(o => {
    let operand = parseInt(o) || 0;

    // Deny negative numbers
    if (operand < 0) {
      badOperands.push(operand);
      return;
    }

    // Numbers greater than 1000 are invalid
    if (operand > 1000) {
      operand = 0;
    }
    result += operand;
  });

  if (badOperands.length > 0) {
    throw new Error(
      `Negative numbers not allowed - [ ${badOperands.join(', ')} ]`,
    );
  }

  return result;
}

export default parse;
