
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



function query(filterBy = {}) {
    // if (!filterBy.txt) filterBy.txt = ''
    // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    // const regExp = new RegExp(filterBy.txt, 'i')
    return storageService.query(STORAGE_KEY)
    // .then(toys => {
    //     return toys.filter(toy =>
    //         regExp.test(toy.vendor) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
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

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


