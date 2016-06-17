function parse(document) {
    var XHTML = "http://www.w3.org/1999/xhtml";

    var iterator;
    var nextNode;
    var root;
    var rootFirstChild;

    var elmStartTemplate, elmStartName;
    var elmEndTemplate, elmEndName;



    function buildTree() {
        root = document.documentElement;
        rootFirstChild = root.firstChild;
        buildElementTemplate();

        iterator = document.createNodeIterator(document, NodeFilter.SHOW_ALL, null, false);
        nextNode = iterator.nextNode();
        buildNode();
    }

    function buildNode() {
        var node;
        while (nextNode) {
            node = nextNode;
            nextNode = iterator.nextNode();
            if (node.nodeType == Node.ELEMENT_NODE) {
                buildElement(node);
            }
        }
    }

    function buildElement(elm) {
        if (elm instanceof HTMLElement) return;

        var firstChild;
        var hasChildren = false;
        var isCollapsable = false;

        if(elm == root){
            firstChild = rootFirstChild;
        }
        else{
            firstChild = elm.firstChild;
        }

        if(firstChild != null){
            hasChildren = true;
        }

        if(hasChildren && (firstChild.nextSibling != null)){
            isCollapsable = true;
        }

        elmStartName.textContent = elm.nodeName;
        var treeNode = elmStartTemplate.cloneNode(true);

        if (isCollapsable) {
            treeNode.href = "#";
            treeNode.className += " collapse";
        }

        if (elm == root) {
            elm.insertBefore(treeNode, rootFirstChild);
            elm.className += " root";
        }
        else {
            elm.insertBefore(treeNode, elm.firstChild);
        }

        if (hasChildren) {
            treeNode.appendChild(document.createTextNode(">"));
            elmEndName.textContent = elm.nodeName;
            treeNode = elmEndTemplate.cloneNode(true);
            if (isCollapsable) {
                treeNode.className += " end";
                treeNode.style.display = "block";
                treeNode.style.marginLeft = "-2em";

            }
            elm.appendChild(treeNode);
        }
        else {
            treeNode.appendChild(document.createTextNode("/>"));
        }
    }

    function buildElementTemplate() {
        elmStartTemplate = document.createElementNS(XHTML, "a");
        elmStartTemplate.className += " bracket";
        elmStartTemplate.style.marginLeft = "-2em";
        elmStartTemplate.appendChild(document.createTextNode("<"));
        elmStartName = document.createElementNS(XHTML, "span");
        elmStartName.className += " tag";
        elmStartTemplate.appendChild(elmStartName);

        elmEndTemplate = document.createElementNS(XHTML, "span");
        elmEndTemplate.className += " bracket";
        elmEndTemplate.style.display = " block";
        elmEndTemplate.style.marginLeft = "-2em";
        elmEndTemplate.appendChild(document.createTextNode("</"));
        elmEndName = document.createElementNS(XHTML, "span");
        elmEndName.className += " tag";
        elmEndTemplate.appendChild(elmEndName);
        elmEndTemplate.appendChild(document.createTextNode(">"));
    }
    function delErrors(){
        var errors = document.getElementsByTagName("error");
        for(var i=0; i<errors.length;i++){
            var a = errors[i].getElementsByTagName("a")[0];
            var span = a.getElementsByTagName("span")[0];
            a.removeChild(span);
            a.innerText = "";
        }
    }

    function delWarnings(){
        var warnings = document.getElementsByTagName("warning");
        for(var i=0; i<warnings.length;i++){
            var a = warnings[i].getElementsByTagName("a")[0];
            var span = a.getElementsByTagName("span")[0];
            a.removeChild(span);
            a.innerText = "";
        }
    }

    buildTree();
    delErrors();
    delWarnings();
    return document;
}
