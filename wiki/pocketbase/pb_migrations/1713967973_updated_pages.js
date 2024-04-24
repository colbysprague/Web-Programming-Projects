/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jeliz2rj",
    "name": "author",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k8azq1r1sedmhxe")

  // remove
  collection.schema.removeField("jeliz2rj")

  return dao.saveCollection(collection)
})
