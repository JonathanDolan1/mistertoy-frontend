
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabelCounts
}



function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(carId) {
    return httpService.get(BASE_URL + carId)

}
function remove(carId) {
    return httpService.delete(BASE_URL + carId)
}

function save(car) {
    if (car._id) {
        return httpService.put(BASE_URL, car)
    } else {
        return httpService.post(BASE_URL, car)
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

function getLabelCounts() {
    return query().then(toys => {
      console.log(toys)
      const labelCounts = {}
  
      toys.forEach(toy => {
        toy.labels.forEach(label => {
          if (labelCounts[label]) {
            labelCounts[label]++
          } else {
            labelCounts[label] = 1
          }
        })
      })
      const labelCountArray = Object.entries(labelCounts).map(
        ([label, count]) => ({
          label,
          count,
        })
      )
      return labelCountArray
    })
  }

// function _createToys() {
//     let toys = localStorage.getItem(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         for (let i = 0; i < 20; i++) {
//             toys.push(_createDemoToy())
//         }
//         utilService.saveToStorage(STORAGE_KEY, toys)
//     }
// }

// function _createDemoToy() {
//     const toy = {
//         _id: utilService.makeId(),
//         name: utilService.generateRandomToyName(),
//         price: utilService.getRandomIntInclusive(10, 100),
//         labels: utilService.generateRandomToyLabels(),
//         createdAt: utilService.getRandomTimestamp(),
//         inStock: Math.random() < 0.6 ? true : false,
//     }
//     return toy
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


