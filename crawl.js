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
    normalizeURL
}