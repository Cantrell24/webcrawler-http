const {JSDOM} = require ('jsdom') 

function getURLsFromHTML (htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a') // We passed 'a' because we want a list of all the a tags. From HTML on the test page. 
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0,1)=== '/') {
      //relative url
      try {
        const urlObj = new URL (`${baseURL} ${linkElement.href}`)
        urls.push(urlObj.href) 
      } catch(err){
        console.log(`error with relative url: ${err.message}`)
      }
    } else {
      //absolute url
      try {
        const urlObj = new URL (linkElement.href)
        urls.push(urlObj.href) 
      } catch(err){
        console.log(`error with absolute url: ${err.message}`)
      }
      urls.push(linkElement.href)
    }
    

  }
  return urls
}


function normalizeURL(urlString) {
  const urlObj = new URL (urlString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostPath.length > 0 && hostPath.slice(-1)==='/') {
    return hostPath.slice(0, -1)
  }
  return hostPath
}

//This sends the function out so other files can import or 
//grab it. 
module.exports = {
    normalizeURL,
    getURLsFromHTML
}