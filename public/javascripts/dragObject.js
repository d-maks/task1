var drag;
var x1;
var x2;
var y1;
var y2;
function startDragging(event){
    drag=1;
    x2=event.clientX;
    y2=event.clientY;
}

function dragging(event){
    if (drag==1){

        x1=event.clientX;
        y1=event.clientY;

        shift_x=x1-x2
        shift_y=y1-y2

        document.getElementById('mainDiv').style.marginLeft="0px";
        document.getElementById('mainDiv').style.marginRight="0px";
        document.getElementById('mainDiv').style.marginTop="0px";
        document.getElementById('mainDiv').style.marginBottom="0px";

        document.getElementById('mainDiv').style.left=mainDiv.offsetLeft+shift_x
        document.getElementById('mainDiv').style.top=mainDiv.offsetTop+shift_y

        x2=x1; y2=y1;
    }
}

function stopDragging(){drag=0;}
