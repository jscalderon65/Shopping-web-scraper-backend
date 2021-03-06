const {
  setElementToDocument,
  getElementsFromDocument,
  DeleteElementInDocument,
  updateElementToDocument,
} = require('../Utils/dbOperations')
const {watcherMethods} = require('../Utils/watchersOperations')
const {v4: uuidv4} = require('uuid')
const debugAppError = require('debug')('app:error')

const collectionId = process.env.DB_WATCHERS_COLLECTION

const createWatcherInProduct = async (req, res) => {
  try {
    const {userId, productBrand} = req.params
    const {productUrl, userEmail} = req.body
    const method = 'CREATE_WATCHER'
    const IdWatcher = uuidv4()
    const watcherMethodsPayload = {
      productUrl,
      brand: productBrand,
      method,
      userEmail,
    }
    const newProduct = await watcherMethods(watcherMethodsPayload)
    await setElementToDocument(collectionId, userId, IdWatcher, newProduct)
    res.send({[IdWatcher]: newProduct})
  } catch (e) {
    res.status(500).send({error: e.message})
    debugAppError(e)
  }
}

const getUserWatchers = async (req, res) => {
  try {
    const {userId} = req.params
    const data = await getElementsFromDocument(collectionId, userId)
    res.send(data)
  } catch (e) {
    res.status(500).send({error: e.message})
    debugAppError(e)
  }
}

const deleteUserWatchers = async (req, res) => {
  try {
    const {userId} = req.params
    const {productId} = req.body
    const response = await DeleteElementInDocument(
      collectionId,
      userId,
      productId,
    )
    res.send(response)
  } catch (e) {
    res.status(500).send({error: e.message})
    debugAppError(e)
  }
}

const updateUserWatcher = async (req, res) => {
  try {
    const {userId} = req.params
    const {productId, newTags} = req.body
    const response = await updateElementToDocument(
      collectionId,
      userId,
      productId,
      newTags,
    )
    res.send(response)
  } catch (e) {
    res.status(500).send({error: e.message})
    debugAppError(e)
  }
}
module.exports = {
  createWatcherInProduct,
  getUserWatchers,
  deleteUserWatchers,
  updateUserWatcher,
}
