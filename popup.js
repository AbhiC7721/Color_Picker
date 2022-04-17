const btn = document.querySelector('.changeColorBtn')
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')

btn.addEventListener('click', async () => {

    chrome.storage.sync.get('color', ({color}) => {
        console.log('color', color)
    })

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true })
    
    chrome.scripting.executeScript({
        target: {tabId: tab.id},

        function: pickColor,
    }, async(injectionResults) => {
        //this receives whatever is returned from tbe pickColor(in a different process)
        const [data] = injectionResults
        // if data.result is not null
        if(data.result){
            const color = data.result.sRGBHex
            colorGrid.style.backgroundColor = color
            colorValue.innerText = color

            try {
                await navigator.clipboard.writeText(color)
            } catch(err){
                console.error(err)
            }
            
        }
        // console.log(data)
    })
})

// The above btn and eventListener and pcikColor codes are running in different contexts
// so we need to pass these variables to the pickCOlor function in order to use it
async function pickColor(){
    try {
        const eyeDropper = new EyeDropper()
        return await eyeDropper.open()
        // returns an object
    } catch (err) {
        console.error(err)
    }
}