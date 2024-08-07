export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    generateRandomToyName,
    generateRandomToyLabels,
    getRandomTimestamp,
    formatTimestamp
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function _getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomToyName() {
    const adjectives = [
        'Amazing', 'Fun', 'Super', 'Incredible', 'Fantastic',
        'Magic', 'Adventure', 'Cool', 'Crazy', 'Happy'
    ];

    const toyTypes = [
        'Robot', 'Doll', 'Car', 'Puzzle', 'Train',
        'Animal', 'Game', 'Ball', 'Drone', 'Block'
    ];

    const randomAdjective = _getRandomElement(adjectives);
    const randomToyType = _getRandomElement(toyTypes);

    return `${randomAdjective} ${randomToyType}`;
}

function generateRandomToyLabels() {
    const labels = [
        'Fun', 'Educational', 'Interactive', 'Colorful', 'Creative',
        'Imaginative', 'Durable', 'Safe', 'Engaging', 'Unique'
    ];

    const length = getRandomIntInclusive(2, 4)
    const toyLabels = [];

    for (let i = 0; i < length; i++) {
        const randomLabel = _getRandomElement(labels);
        toyLabels.push(randomLabel);
    }

    return toyLabels;
}

function getRandomTimestamp() {
    const now = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(now.getFullYear() - 10);

    const randomTime = Math.random() * (now.getTime() - tenYearsAgo.getTime()) + tenYearsAgo.getTime();
    return randomTime; // Return the timestamp in milliseconds
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // This will use the current locale
}