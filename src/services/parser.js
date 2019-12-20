export function parse(input) {
  let result = 0;
  const badOperands = [];
  const operands = input.split(/[,\n]/);
  operands.forEach(o => {
    const operand = parseInt(o) || 0;
    if (operand < 0) {
      badOperands.push(operand);
      return;
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
