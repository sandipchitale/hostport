(function() {
    const tb = document.getElementById("tb");
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", () => {
        tb.innerHTML = '';
    });
    chrome.devtools.network.onRequestFinished.addListener(function(request) {
        function isRedirect(port) {
            return (port >=300 && port <= 310);
        }
        if (request.request.url.startsWith('http')) {
            let method = `<td>${request.request.method}</td>`;
            let requestUrl = `<td title="${request.request.url}">${request.request.url}</td>`;
            let status = `<td>${request.response.status}</td>`;
            let location = `<td>&nbsp;</td>`;

            if (isRedirect(request.response.status)) {
                let locationHeader = request.response.headers.find(h => h.name.toLowerCase() === 'location');
                if (locationHeader) {
                    location = `<td title="${locationHeader.value}">${locationHeader.value}</td>`
                }
            }
            let tr = `<tr>${method}${requestUrl}${status}${location}</tr>`;
            if (isRedirect(request.response.status)) {
                tr = tr.replace('<tr', '<tr class="redirect"');
            }
            tb.innerHTML += tr;
        }
    });
})();
