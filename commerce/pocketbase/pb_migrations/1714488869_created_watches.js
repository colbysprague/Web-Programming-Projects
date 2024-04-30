/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0cjhjj1jurj8z1m",
    "created": "2024-04-30 14:54:29.025Z",
    "updated": "2024-04-30 14:54:29.025Z",
    "name": "watches",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rygy7c4q",
        "name": "watching",
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
      },
      {
        "system": false,
        "id": "fvrckxvl",
        "name": "watcher",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0cjhjj1jurj8z1m");

  return dao.deleteCollection(collection);
})
