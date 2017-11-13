const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/clock', (error, db) => {
  const timezones = db.collection('times')
  timezones
    .find({})
    .toArray()
    .then(results => {
      !results.length
        ? timezones
            .insertMany(
              [
                'Asia/Tokyo',
                'Asia/Dubai',
                'Europe/Istanbul',
                'Europe/Stockholm',
                'America/Sao_Paulo',
                'America/New_York',
                'America/Chicago',
                'America/Denver',
                'Pacific/Guam'
              ].map(zone => ({zone: zone})))
            .then(() => db.close())
            .catch(error => console.error(error))
        : db.close()
    })
    .catch(error => console.error(error))
})
