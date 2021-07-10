export const openOrCloseAccordions = (event) => {
    var content = event.target.nextElementSibling
    content.classList.toggle('is-open')
    if (content.style.maxHeight) { // if height is zero it will return false
        // accordion is open, we need to close it
        content.style.maxHeight = null
        content.style.padding = "2px"
    } else {
        // accordion is close we need to open
        content.style.maxHeight = content.scrollHeight + "px"
        content.style.padding = "10px"
    }
}