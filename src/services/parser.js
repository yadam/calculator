export function parse(input) {
  let result = 0;
  const operands = input.split(/[,\n]/);
  operands.forEach(o => {
    const operand = parseInt(o) || 0;
    result += operand;
  });
  return result;
}

export default parse;
