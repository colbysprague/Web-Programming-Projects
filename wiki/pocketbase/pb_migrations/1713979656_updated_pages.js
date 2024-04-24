/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nfzjkkpw",
    "name": "md",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // remove
  collection.schema.removeField("nfzjkkpw")

  return dao.saveCollection(collection)
})
