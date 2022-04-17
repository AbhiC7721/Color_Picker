//this file runs inside service worker
let color =  'red'

//listener on the extension
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set( {color} )
})