const {normalizeURL, getURLsFromHTML} = require ('./crawl.js') //This imports the function and names the file its getting it from
const {test, expect} = require('@jest/globals')




test('normalizeURL, strip protocols', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL, strip trailing slash ', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL, capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL, strip HTTP', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML, absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
                <a href="https://blog.boot.dev/path/">
                    Boot.dev blog
                </a>
        </body>
    </html>          
  `              
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML, invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
                <a href="invalid">
                   Invalid URL
                </a>
        </body>
    </html>          
  `              
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML, relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
                <a href="/path/">
                    Boot Dev. Blog
                </a>
        </body>
    </html>          
  `              
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML, both', () => {
    const inputHTMLBody = `
    <html>
        <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev blog Path One
                </a>
                <a href="/path2/">
                    Boot.dev blog Path Two
                </a>
        </body>
    </html>          
  `              
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
}) 



