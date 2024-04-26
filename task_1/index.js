import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

// Ключи, которые нужно пропустить
let keysToSkip = ['groupId', 'service', 'formatSize', 'ca']

// Уникальные ключи
let uniqueKeys = []

// Цикл по encoded
for (let i = 0; i < encoded.length; i++) {
    let obj = encoded[i]

    // Цикл по obj
    for (let key in obj) {

        // Проверка если ключ в формате с окончанием "Id" и если его значение уникально
        if (key.endsWith('Id') && !uniqueKeys.includes(obj[key])) {
            uniqueKeys.push(obj[key])
        }

        // Если ключ в keysToSkip, пропускаем его, иначе меняем значение
        if (!keysToSkip.includes(key)) {
            obj[key] = translations[obj[key]]
        }
    }
  }

  // Результат раскодировки
  console.log(encoded)

  // Уникальные ключи
  console.log(uniqueKeys)

