/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x22swo77",
    "name": "endsAt",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // remove
  collection.schema.removeField("x22swo77")

  return dao.saveCollection(collection)
})
