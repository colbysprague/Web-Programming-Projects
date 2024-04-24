/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // remove
  collection.schema.removeField("4tufgdzw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4tufgdzw",
    "name": "rich",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
