let unique = 0

export default function (prefix = "uuid") {
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++
    return prefix + '_' + random + unique + String(time);
}
