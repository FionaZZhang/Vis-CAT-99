// check whether the tester has drawn the correct pattern for any task
export function checkCorrectness(originalPattern, requirement, userInput) {
    if (originalPattern.length != userInput.length) {
        return false;
    }
    let target;
    switch (requirement) {
        case "copy":
            return isSame(originalPattern, userInput);
        case "lateral":
            target = getLateralFlip(originalPattern);
            return isSame(target, userInput);
        case "vertical":
            target = getVerticalFlip(originalPattern);
            return isSame(target, userInput);
        default:
            return false;
    }
}

// check whether two lists of lists are totally the same
export function isSame(target, userInput) {
    var size = target.length;
    var isSame = true;
    let i;
    for (i = 0; i < size; i ++) {
        if (target[i][0] != userInput[i][0] || target[i][1] != userInput[i][1]) {
            isSame = false;
        }
    }
    return isSame;
}

// According to the original pattern, generate the pattern after undergoing a lateral 
// flip and return as a list of 2-element-lists.
export function getLateralFlip(originalPattern) {
    var size = originalPattern.length;
    var result = [];
    let i;
    for (i = 0; i < size; i ++) {
        result.push([originalPattern[i][0], 5 - originalPattern[i][1]]);
    }
    return result;
}

// According to the original pattern, generate the pattern after undergoing a vertical 
// flip and return as a list of 2-element-lists.
export function getVerticalFlip(originalPattern) {
    var size = originalPattern.length;
    var result = [];
    let i;
    for (i = 0; i < size; i ++) {
        result.push([5 - originalPattern[i][0], originalPattern[i][1]]);
    }
    return result;
}