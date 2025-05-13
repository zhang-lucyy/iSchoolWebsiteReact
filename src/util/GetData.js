/*
https://solace.ist.rit.edu/~dsbics/proxy/
*/

//const proxyServer = 'https://solace.ist.rit/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';
const proxyServer = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';

// endpoint ex: 'about/'
async function getData(endpoint) {
    const result = await fetch(`${proxyServer}${endpoint}`);
    return await result.json();
}

export default getData;
