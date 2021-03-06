export function parse(i) {
  let result = 0;
  let input = i;
  let delimiters = [',', '\n'];
  const badOperands = [];
  // matches //x\n where x is a custom delimiter and then captures the rest
  // of the string for further parsing
  const captureGroups = input.match(/^\/\/(?:(.)|(\[.+\])+)\n(.*)$/is);
  if (captureGroups && captureGroups.length > 1) {
    // the first captured group is in index 1 for single character delimiters
    let newDelimiter = captureGroups[1];
    if (!newDelimiter) {
      // the first captured group is in index 2 for multicharacter delimiters
      newDelimiter = captureGroups[2]
        .replace(/\]\[/g, '|')
        .replace('[', '')
        .replace(']', '')
        .split('|');
    }
    // escape regex special characters (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
    delimiters = delimiters
      .concat(newDelimiter)
      .map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
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
