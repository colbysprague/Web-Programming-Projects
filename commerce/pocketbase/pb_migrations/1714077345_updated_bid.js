/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tnzfrl3q8dnx7e9")

  collection.name = "bids"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tnzfrl3q8dnx7e9")

  collection.name = "bid"

  return dao.saveCollection(collection)
})
