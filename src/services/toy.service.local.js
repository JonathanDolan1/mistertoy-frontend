
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



function query(filterBy = {}) {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    if (filterBy.inStock === undefined) filterBy.inStock = ''
    if (filterBy.labels === undefined) filterBy.labels = []
    if (!filterBy.sortBy) filterBy.sortBy = 'name'
    if (!filterBy.sortDir) filterBy.sortDir = 1
    const regExp = new RegExp(filterBy.txt, 'i')
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            toys = toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
            if (filterBy.inStock !== '') toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            filterBy.labels.forEach(label=>toys=toys.filter(toy=>toy.labels.includes(label)))
            
           if (filterBy.sortBy === 'name'){
                    toys = toys.toSorted((t1,t2)=> t1.name.localeCompare(t2.name) * filterBy.sortDir)
           } else {
            toys = toys.toSorted((t1,t2)=> (t1[filterBy.sortBy]-t2[filterBy.sortBy]) * filterBy.sortDir)
           }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    const toy = {
        name: '',
        price: '',
        labels: [],
        createdAt: '',
        inStock: false,
    }
    return toy
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createToys() {
    let toys = localStorage.getItem(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            toys.push(_createDemoToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createDemoToy() {
    const toy = {
        _id: utilService.makeId(),
        name: utilService.generateRandomToyName(),
        price: utilService.getRandomIntInclusive(10, 100),
        labels: utilService.generateRandomToyLabels(),
        createdAt: utilService.getRandomTimestamp(),
        inStock: Math.random() < 0.6 ? true : false,
    }
    return toy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


