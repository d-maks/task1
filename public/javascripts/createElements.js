var mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
mainDiv.onmousedown = startDragging;
mainDiv.onmousemove = dragging;
mainDiv.onmouseup = stopDragging;
document.body.appendChild(mainDiv);

var input = document.createElement('input');
input.value = "121.0.0.1:8080/public/xml/data.xml";
input.id = "path";
mainDiv.appendChild(input);

var getButton = document.createElement('input');
getButton.type = "button";
getButton.value = "GET";
getButton.id = "get";
getButton.onclick = getXMLFunction;
mainDiv.appendChild(getButton);

var postButton = document.createElement('input');
postButton.type = "button";
postButton.value = "POST";
postButton.id = "post";
postButton.onclick = postXMLFunction;
mainDiv.appendChild(postButton);

var div = document.createElement('div');
div.id = "status";
div.innerHTML = "Status: OK";
div.style.display = "none";
mainDiv.appendChild(div);

div = document.createElement("div");
div.id = "errorStatus";
div.innerHTML = "Status: Incorrect data";
div.style.display = "none";
mainDiv.appendChild(div);

var sizeLink = document.createElement("a");
sizeLink.id = "size";
sizeLink.href = "#";
sizeLink.onclick = showXML;
mainDiv.appendChild(sizeLink);

var errorsLink = document.createElement("a");
errorsLink.id = "errors";
errorsLink.href = "#";
errorsLink.onclick = showErrors;
mainDiv.appendChild(errorsLink);

var warningsLink = document.createElement("a");
warningsLink.id = "warnings";
warningsLink.href = "#";
warningsLink.onclick = showWarnings;
mainDiv.appendChild(warningsLink);

div = document.createElement('div');
div.id = "xml";
div.onclick = toggleTag;
div.style.display = "none";
mainDiv.appendChild(div);

div = document.createElement("div");
div.id = "warningText";
div.style.display = "none";
mainDiv.appendChild(div);

div = document.createElement("div");
div.id = "errorText";
div.style.display = "none";
mainDiv.appendChild(div);