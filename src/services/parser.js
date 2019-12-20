export function parse(input) {
  const MAX_OPERANDS = 2;
  let result = 0;
  const operands = input.split(',');
  if (operands.length > MAX_OPERANDS) {
    throw new Error('Too many operands');
  }
  operands.forEach(o => {
    const operand = parseInt(o) || 0;
    result += operand;
  });
  return result;
}

export default parse;
