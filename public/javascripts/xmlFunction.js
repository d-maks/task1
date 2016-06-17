var xmlObject;

function getXMLFunction() {
    var input = document.getElementById("path");
    var path = input.value;
    if(path == ""){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "handler?path=" + path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            loadError();
        } else {
            view(xhr);
        }
    }
    xhr.send();
}

function postXMLFunction() {
    var input = document.getElementById("path");
    var path = input.value;
    if(path == ""){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "handler", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            loadError();
        } else {
            view(xhr);
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("path=" + path);
}

function loadError() {
    var tempDiv = document.getElementById("status");
    tempDiv.style.display = "none";

    tempDiv = document.getElementById("xml");
    tempDiv.style.display = "none";

    tempDiv = document.getElementById("size");
    tempDiv.style.display = "none";

    document.getElementById("warnings").style.display = "none";
    document.getElementById("errors").style.display = "none";

    tempDiv = document.getElementById("errorStatus");
    tempDiv.style.display = "block ";
}

function view(xml) {
    xmlObject = xml;

    var tempDiv = document.getElementById("status");
    tempDiv.style.display = "block";

    tempDiv = document.getElementById("errorStatus");
    tempDiv.style.display = "none";

    tempDiv = document.getElementById("size");
    var errors = document.getElementById("errors");
    var warnings = document.getElementById("warnings");
    tempDiv.innerHTML = "XML (" + xml.getResponseHeader("Content-Length") + " bytes) ";
    errors.innerHTML = "Errors(" + getErrorsCount(xml) + ") ";
    warnings.innerHTML = "Warnings(" + getWarningsCount(xml) + ")";
    tempDiv.style.display = "inline";
    errors.style.display = "inline";
    warnings.style.display = "inline";
}

function getErrorsCount(xml) {
    var errorsCount = 0;
    var arr = xml.responseXML.childNodes[0].children;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeName == "error") {
            errorsCount++
        }
    }
    return errorsCount;
}

function getWarningsCount(xml) {
    var warningsCount = 0;
    var arr = xml.responseXML.childNodes[0].children;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeName == "warning") {
            warningsCount++
        }
    }
    return warningsCount;
}

function showXML() {
    var temp = document.getElementById("xml");
    temp.innerHTML = "";
    var tempXMl = xmlObject.responseXML.cloneNode(true);
    tempXML = parse(tempXMl);
    var text = new XMLSerializer().serializeToString(tempXML);
    temp.innerHTML = text;
    temp.style.display = "block";
    document.getElementById("warningText").style.display = "none";
    document.getElementById("errorText").style.display = "none";
}

function showWarnings() {
    var temp = document.getElementById("warningText");
    temp.innerHTML = "";
    var arr = xmlObject.responseXML.childNodes[0].children;
    var text = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeName == "warning") {
            text += text + arr[i].getAttribute("text") + '\r\n';
        }
    }
    if (text != "") {
        var preEl = document.createElement('pre');
        preEl.appendChild(document.createTextNode(text));
        temp.appendChild(preEl);
        temp.style.display = "block";
        document.getElementById("errorText").style.display = "none";
        document.getElementById("xml").style.display = "none";
    }
}

function showErrors() {
    var temp = document.getElementById("errorText");
    temp.innerHTML = "";
    var arr = xmlObject.responseXML.childNodes[0].children;
    var text = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeName == "error") {
            text += arr[i].getAttribute("text") + ": " + arr[i].getAttribute("code") + '\r\n';
        }
    }
    if (text != "") {
        var preEl = document.createElement('pre');
        preEl.appendChild(document.createTextNode(text));
        temp.appendChild(preEl);
        temp.style.display = "block";
        document.getElementById("warningText").style.display = "none";
        document.getElementById("xml").style.display = "none";
    }
}

function toggleTag(event) {
    var XHTML = "http://www.w3.org/1999/xhtml";
    var node = event.target;
    var hide = false;
    if (node.className.indexOf("collapse") != -1) {
        hide = true;
    }

    if (hide) {
        node.className = node.className.replace("collapse", "expand");
    }
    else {
        node.className = node.className.replace("expand", "collapse");
    }

    while (node = node.nextSibling) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            if (hide) {
                node.setAttributeNS(XHTML, "hidden", "true");
                if (node.className.indexOf("end") != -1) {
                    node.style.display = "none";
                }
            }
            else {
                node.removeAttributeNS(XHTML, "hidden");
                if (node.className.indexOf("end") != -1) {
                    node.style.display = "block";
                }
            }

        }
    }

    return false;
}