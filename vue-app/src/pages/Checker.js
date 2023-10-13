// check whether the tester has drawn the correct pattern for any task
export function checkCorrectness(originalPattern, requirement, userInput) {
    if (originalPattern.length != userInput.length) {
        return false;
    }
    // unify data type to from array to list
    const targetPattern = originalPattern.map(int => Number(int));
    const userPattern = userInput.map(char => Number(char));
    // change cell id list to coordinate list
    const originalPath = toCoordinateList(targetPattern);
    const userPath = toCoordinateList(userPattern);
    let target;
    switch (requirement) {
        case "copy":
            return isSame(originalPath, userPath);
        case "lateral":
            target = getLateralFlip(originalPath);
            return isSame(target, userPath);
        case "vertical":
            target = getVerticalFlip(originalPath);
            return isSame(target, userPath);
        case "diagonal":
            target = getDiagonalFlip(originalPath);
            return isSame(target, userPath);
        case "rotate180":
            target = getRotate180(originalPath);
            return isSame(target, userPath);
        default:
            return false;
    }
}

// change pattern(list of id) to path(list of coordinates)
export function toCoordinateList(pattern) {
    var path = [];
    for (var i = 0; i < pattern.length; i ++) {
        path.push([Math.ceil(pattern[i] / 4), (pattern[i] % 4 == 0 ? 4 : pattern[i] % 4)]);
    }
    return path;
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

// According to the original pattern, generate the pattern after undergoing a flip and 
// over y=x and return as a list of 2-element-lists.
export function getDiagonalFlip(originalPattern) {
    var size = originalPattern.length;
    var result = [];
    let i;
    for (i = 0; i < size; i ++) {
        result.push([5 - originalPattern[i][1], 5 - originalPattern[i][0]]);
    }
    return result;
}

// According to the original pattern, generate the pattern after undergoing a 180 degree
// rotation about the center and return as a list of 2-element-lists.
export function getRotate180(originalPattern) {
    var size = originalPattern.length;
    var result = [];
    let i;
    for (i = 0; i < size; i ++) {
        result.push([5 - originalPattern[i][0], 5 - originalPattern[i][1]]);
    }
    return result;
}