/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // remove
  collection.schema.removeField("akwgtjiz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lj8cexkw",
    "name": "highestBid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tnzfrl3q8dnx7e9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("76f6itquaolmcl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "akwgtjiz",
    "name": "highestBid",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("lj8cexkw")

  return dao.saveCollection(collection)
})
