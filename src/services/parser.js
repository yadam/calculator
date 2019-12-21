export function parse(i) {
  let result = 0;
  let input = i;
  const delimiters = [',', '\n'];
  const badOperands = [];
  // matches //x\n where x is a custom delimiter and then captures the rest
  // of the string for further parsing
  const captureGroups = input.match(/^\/\/(?:(.)|\[(.+)\])\n(.*)$/is);
  if (captureGroups && captureGroups.length > 1) {
    // the first captured group is in index 1 or 2 depending on the length
    const newDelimiter = captureGroups[1] || captureGroups[2];
    // escape regex special characters (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
    const escapedDelimiter = newDelimiter.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    delimiters.push(escapedDelimiter);
    // the rest of the string is in index 3
    input = captureGroups[3];
  }

  // join the delimiters together and pass that as the split regex
  const operands = input.split(new RegExp(`(${delimiters.join('|')})`));
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
