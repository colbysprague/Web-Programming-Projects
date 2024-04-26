/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // remove
  collection.schema.removeField("vcd2gzwd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcd2gzwd",
    "name": "bids",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tnzfrl3q8dnx7e9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
