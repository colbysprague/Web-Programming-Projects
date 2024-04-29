/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ip9xpxit",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Home",
        "Vehicle",
        "Electronics",
        "Garden",
        "Fashion",
        "Misc."
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // remove
  collection.schema.removeField("ip9xpxit")

  return dao.saveCollection(collection)
})
