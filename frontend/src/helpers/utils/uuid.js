export const uuid = () => {
    let firstHalf = Date.now().toString(36);
    let secondHalf = Math.random().toString(36).substring(2,9)

    return firstHalf + secondHalf;
}