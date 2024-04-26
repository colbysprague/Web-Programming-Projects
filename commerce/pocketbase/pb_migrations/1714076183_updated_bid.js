/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tnzfrl3q8dnx7e9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyuuztij",
    "name": "listing",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "76f6itquaolmcl0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tnzfrl3q8dnx7e9")

  // remove
  collection.schema.removeField("nyuuztij")

  return dao.saveCollection(collection)
})
