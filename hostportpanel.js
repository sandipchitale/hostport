(function() {
    const tb = document.getElementById("tb");
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", () => {
        tb.innerHTML = '';
    });
    chrome.devtools.network.onRequestFinished.addListener(function(request) {
        if (request.request.url.startsWith('http')) {
            const urlObject = new URL(request.request.url);
            let port = urlObject.port;
            if (!port) {
                if (request.request.url.startsWith('https')) {
                    port = 443;
                } else {
                    port = 80;
                }
            }
            let requestUrl = `<td title="${request.request.url}">${request.request.url}</td>`;
            let status = `<td>${request.response.status}</td>`;
            let location = `<td>&nbsp;</td>`;

            if (request.response.status === 302) {
                let locationHeader = request.response.headers.find(h => h.name.toLowerCase() === 'location');
                if (locationHeader) {
                    location = `<td title="${locationHeader.value}">${locationHeader.value}</td>`
                }
            }
            let tr = `<tr>${requestUrl}${status}${location}</tr>`;
            if (request.response.status === 302) {
                tr = tr.replace('<tr', '<tr class="redirect"');
            }
            tb.innerHTML += tr;
        }
    });
})();
