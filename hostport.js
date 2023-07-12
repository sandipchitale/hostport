(function() {
    chrome.devtools.panels.create("Host Port Monitor",
        "icons/hostportpanel.png",
        "hostportpanel.html",
        (panel) => {}
    );
})();