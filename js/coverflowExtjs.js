


function Coverflow (items, cfHolder, imgWidth, imgHeight, holderWidth, holderHeight, center, top, imgOffset, reflectionFactor) 
{
        this.Opera = window.opera ? true : false;
        this.IE = document.all && !this.Opera ? true : false;
        this.IE6 = this.IE && typeof(window.XMLHttpRequest) == "undefined" ? true : false;
        this.IE8 = this.IE && typeof(document.querySelectorAll) != "undefined" ? true : false;
        this.IE7 = this.IE && ! this.IE6 && !this.IE8 ? true : false;
        this.WebKit = /WebKit/i.test(navigator.userAgent) ? true : false, 
        this.iPhone = /iPhone|iPod/i.test(navigator.userAgent)? true : false;
        this.Chrome = /Chrome/i.test(navigator.userAgent) ? true : false;
        this.Safari = /Safari/i.test(navigator.userAgent) && !this.Chrome ? true : false;
        this.Konqueror = navigator.vendor == "KDE" ? true : false;
        this.Konqueror4 = this.Konqueror && /native code/.test(document.getElementsByClassName) ? true : false;
        this.Gecko = !this.WebKit && navigator.product == "Gecko" ? true : false;
        this.Gecko19 = this.Gecko && Array.reduce ? true : false;
        this.isIE = (this.IE | this.IE6 | this.IE7 | this.IE8) ? true : false;

        this.reflectionFactor = reflectionFactor || 0.25;
        this.steps = 10;
        this.items = items;
        this.holder = cfHolder;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.holderWidth = holderWidth;
        this.holderHeight = holderHeight;
        this.imgOffset = imgOffset || 0;
        this.onSelectCenter = function(){};
        this.createLabel = function(){};
        this.createDescription = function(){};
        this.createRating = function(){};
        this.createPreview = function(){};
        this.width = holderWidth || 1000;
	this.height = holderHeight || 500;
        this.numItems = 0;
        this.currCenter = 1;
        this.numVisible = 4;
        this.center = center;
        this.top = top;
        this.flat = false;
        this.loading = 1;
        this.dir = 1;

        this.holder.style.width = holderWidth || this.width;
        this.holder.style.height = holderHeight || this.height;
        this.holder.style.width = "600px";
        this.holder.style.height = "375px";
        //this.holder.style.border = "1px solid #FF00FF";

        this.smallerPreview    = document.createElement("div");
        this.coverflow_label   = document.createElement("div");
        this.instructions      = document.createElement("div");
        this.rating            = document.createElement("div");
        this.description       = document.createElement("div");

	//this.smallerPreview.style.border = "1px solid #FF0000";
	//this.coverflow_label.style.border = "1px solid #FF0000";

	//<div class="slider"><div class="position"></div></div>
        this.scrollbar = document.createElement("div");
        this.scrollbar.className = "scrollbar";
        this.scrollbar.innerHTML = '<img class="opaque50" src="./img/scrollArrowButtonLeft.png" style="postion: relative; float: left; margin-left: -40px; height: 30px;" onclick="javascript:scrollPrev();" onmouseover="this.style.cursor = \'pointer\';"/><img class="opaque50" src="./img/scrollArrowButtonRight.png" style="postion: relative; float: right; margin-right: -40px; height: 30px;" onclick="javascript:scrollNext();" onmouseover="this.style.cursor = \'pointer\';"/>';

        this.slider = document.createElement("div");
        this.slider.className = "slider";

        this.position = document.createElement("div");
        this.position.className = "position";

	//this.slider.style.left = this.width - this.center + 500 + "px";
	//this.slider.style.top = 300 + "px";


        this.slider.appendChild(this.position);
        this.scrollbar.appendChild(this.slider);

        this.scrollbar.style.top = 300 + 'px';
        this.scrollbar.style.left = parseInt((this.holderWidth / 2) - this.center,10) + 'px';
        //alert(parseInt((this.holderWidth / 2) - this.center,10) + 'px');
        //this.scrollbar.style.width = 500 + 'px';
        //this.scrollbar.style.height = 20 + 'px';
        //this.scrollbar.style.border = "1px solid #FF0000";

        this.holder.appendChild(this.scrollbar);

        this.holder.appendChild(this.smallerPreview);
        this.holder.appendChild(this.coverflow_label);
        this.holder.appendChild(this.instructions);
        this.holder.appendChild(this.rating);
        this.holder.appendChild(this.description);

        var left = (this.width/3) - 10 + 'px';
        var top = this.height - 80 - 0 + 'px';


        this.coverflow_label.style.color = "#FF6A00";
        this.coverflow_label.style.font = "14pt Arial";
        this.coverflow_label.style.lineHeight = "1.0em";
        this.coverflow_label.style.position = "absolute";
        this.coverflow_label.style.top = "0px";
        //this.coverflow_label.style.bottom = "40px";
        this.coverflow_label.style.zIndex = "700";
        this.coverflow_label.style.marginLeft = "100px";
        this.coverflow_label.style.marginTop = "20px";
        //this.coverflow_label.style.float = "left";

        this.smallerPreview.style.position = "absolute";
        //this.smallerPreview.style.marginTop = "5px";
        this.smallerPreview.style.top = "15px";
        //this.smallerPreview.style.bottom = "25px";
        this.smallerPreview.style.float = "left";
        this.smallerPreview.style.marginLeft = left;
        this.smallerPreview.style.marginLeft = 0;
        this.smallerPreview.style.marginRight = "0px";
        //this.smallerPreview.style.border = "2px solid #444444";
        this.smallerPreview.style.zIndex = "700";
        this.smallerPreview.style.width = "100px";
        //this.smallerPreview.style.clear = "both";
        this.smallerPreview.id = "preview";
        //this.smallerPreview.style.background = "url(./images/frame.png)";
        //this.smallerPreview.style.background-size = "contain";



        this.instructions.style.color = "#777777";
        this.instructions.style.font = "8pt Arial";
        this.instructions.style.lineHeight = "1.0em";
        this.instructions.style.position = "absolute";
        this.instructions.style.top = "-20px";
        this.instructions.style.right = "-5px";
        this.instructions.style.zIndex = "0";
        this.instructions.style.padding = "10px";
        this.instructions.style.marginLeft = "100px";
        this.instructions.style.marginTop = "35px";
        //this.instructions.style.width = "120px";
        this.instructions.style.textAlign = "center";
        this.instructions.style.background="#333333";
        this.instructions.className="corners opaque";
        this.instructions.innerHTML = 'Use Mouse Scroll Wheel<br>or<br>Keyboard Arrow Keys<br>to rotate images<br><br>Clicking on an image<br>adds it to<br>your ring';





        this.rating.style.color = "#ffffff";
        this.rating.style.font = "8pt Arial";
        this.rating.style.lineHeight = "1.0em";
        this.rating.style.position = "absolute";
        this.rating.style.bottom = "0px";
        //this.rating.style.right = "150px";
        this.rating.style.right = parseInt((this.holderWidth / 2) - this.center - (this.imgWidth/4),10) + 'px';
        this.rating.style.zIndex = "9999";
        this.rating.style.padding = "0px";
        this.rating.style.marginLeft = "0px";
        this.rating.style.marginTop = "55px";
        //this.rating.style.width = "120px";
        this.rating.style.textAlign = "center";
        this.rating.style.background="transparent";
        this.rating.className="";
        this.rating.innerHTML = '<img src="images/starBoard.png" height="30"/>';


        this.description.style.color = "#4CFF00";
        this.description.style.font = "9pt Arial";
        this.description.style.lineHeight = "0.75em";
        this.description.style.position = "absolute";
        this.description.style.top = "-15px";
        this.description.style.left = "0px";
        this.description.style.zIndex = "700";
        this.description.style.marginLeft = "10px";
        this.description.style.marginTop = "20px";
        //this.description.style.width = "800px";
        this.description.style.textAlign = "center";
        this.description.style.float = "left";
        this.description.style.clear = "left";
        //this.description.style.-khtml-opacity=".90";
        //this.description.style.-moz-opacity=".90";
        //this.description.style.-ms-filter="alpha(opacity=90)";
        this.description.style.filter="alpha(opacity=99)";
        this.description.style.opacity=".99";
        this.description.style.whiteSpace = "pre";


        this.label = this.coverflow_label;

 
        this._map = new Array();






	var me = this;
    this.makeDraggable = function (onDrag, beforeDrag, afterDrag)
    {
      //alert("CALLED");
        this.stopDrag = function(event)
        {
	  //alert("stopDrag");
            if (!event) var event = window.event;
            if (this.iPhone)  {
                window.removeEvent('touchemove', onDrag, false);
                if (!this.ontochmove) {
                    var t = event.target;
                    if (t.firstChild) t = t.firstChild;
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    t.dispatchEvent(e);
                }
            }
            else {
	      me.slider.removeEventListener('mousemove', onDrag, false);
	      me.holder.removeEventListener('mousemove', onDrag, false);
            }
	    //alert(afterDrag);
            afterDrag(event); 
        };

        this.initDrag = function (event) {
            if (!event) var event = window.event;
            var e = event;
            if (event.touches) e = event.touches[0];

            this.mouseX = e.clientX; 
            this.mouseY = e.clientY; 

            beforeDrag(event);

        };

        this.startDrag = function (event) {
            if (!event) var event = window.event;

            //alert("IN START DRAG");
            var stopDrag = me.stopDrag;
            //alert(stopDrag);
            if (this.iPhone)  {
                var s = this;
                s.ontouchmove = false
                window.addEvent('touchmove', function (e) {
                        s.ontouchmove = true; 
                        onDrag(e);
                }, false);
                event.preventDefault();
                window.addEvent('touchend', stopDrag, false);
            }
            else {
	        //alert("DEFINING MOUSEUP");
                me.slider.addEventListener('mousemove', onDrag, false);
                me.holder.addEventListener('mousemove', onDrag, false);
                me.slider.addEventListener('mouseup', stopDrag, false);
            }
            if(event.preventDefault) { event.preventDefault() }

        };

        var startDrag = this.startDrag;
        if (this.iPhone)  {
            this.slider.addEventListener('touchstart', startDrag, false);
        }
        else
        {
          if(this.slider.addEventListener)
          {
            this.slider.addEventListener('mousedown', startDrag, false);
          }
          else if(this.slider.attachEvent)
          {
            this.slider.attachEvent('onmousedown', startDrag);
	  } 
        }
        
    };







    var me = this;

        // make slider draggable
        var beforeDrag = function (event) {
	  //this.scrollbar.clickLocked = true;
        };

        var onDrag = function (event) {
            var e = event;
            if (event.touches) e = event.touches[0];
            //alert(e.clientX);
            var scrollbarLeft = getPos(me.scrollbar).left;
            var scrollbarWidth = me.scrollbar.offsetWidth;
            var selectedIndex = me.checkIndex((e.clientX - scrollbarLeft) / scrollbarWidth * (me.numItems-1));
            //alert(selectedIndex);
            var pos = me.getIndexByPosition(selectedIndex);
            //alert(pos);
            me.moveTo(pos);
            me.setSliderPosition(selectedIndex);
            //me.setSliderPosition(pos);
            //this._initStep(true, true);
        };

        var afterDrag = function (event) {
          //alert("afterDrag");
            var e = event;
            if (event.touches) e = event.touches[0];
            //alert(e.clientX);
            var scrollbarLeft = getPos(me.scrollbar).left;
            var scrollbarWidth = me.scrollbar.offsetWidth;
            var selectedIndex = me.checkIndex((e.clientX - scrollbarLeft) / scrollbarWidth * me.numItems);
            //alert(selectedIndex);
            var pos = me.getIndexByPosition(selectedIndex);
            //alert(pos);
            //me.setSliderPosition(selectedIndex);
            me.setSliderPosition(pos);
            me.moveTo(pos);
	  //this._targetPosition = Math.round(this._targetPosition);
	  //this.conf.onMoveTo(this._getItemByPosition(this._targetPosition));
	  //this._initStep(true);
        };

        this.makeDraggable(onDrag, beforeDrag, afterDrag);




        /*
         * checks if index is within the index range of the this.items array
         * returns a value that is within this range
         */
        this.checkIndex = function (index)
        {
          index = Math.max(index, 0);
          index = Math.min(index, this.numItems);
          return index;
        };
























        //alert(this.width);



	this.init = function(items, opts)
	{


          var x = getOffset( this.holder ).left;
          var y = getOffset( this.holder ).top;
          var w = this.holder.offsetWidth;
          //alert("(" + x + "," + y + ")");
          //var x = getPos( this.holder ).left;
          //var y = getPos( this.holder ).top;
          //alert("(" + x + "," + y + ")");
          //var x = this.holder.offsetLeft;
          //var y = this.holder.offsetTop;
          //alert("(" + x + "," + y + ")");

          //this.center = this.getContainerCenter(this.holder) + 320;
          if(! this.center)
	  {
            //alert("W: " + w);
            //alert("WIDTH: " + this.width);
            this.center = x + (this.width/2);
            //this.center = (w/2);
            //alert("CENTER: " + this.center);
	  }

	  if(items.length > 0) {this.numItems = items.length; this.items = this.items.concat(items);}
          //alert(this.numItems);
          this.loading = this.numItems-1;
          //alert(this.loading);
          //alert(this.numItems);

          var me = this;
          for(var i = 0; i < this.numItems; i++)
          {
            //var imgWrapper = document.createElement("div");
            //imgWrapper.style.border = "1px solid #FF0000";
            //imgWrapper.id = "imgWrapper" + i;
            var img = new Image();
            img.onload = function()
            {
              //alert("LOADED " + this.id);
              me.loading--;
              //alert("ALL LOADED: " + me.loading);
              //if(!me.loading) {alert("ALL LOADED: " + me.loading);}
              //if(me.imgWidth)  {img.width = me.imgWidth;}
              //if(me.imgHeight) {img.height = me.imgHeight;}
              //Reflection.add(document.getElementById(this.id), { height: 1, opacity: 2/3 });
            };
            img.src = this.items[i].src;
            img.id = 'img' + i;

            if(this.imgWidth)  {img.width = this.imgWidth;}
            if(this.imgHeight) {img.height = this.imgHeight;}
            //imgWrapper.style.height = img.height * 2 + "px";
            //imgWrapper.appendChild(img);

            //document.body.appendChild(img);
            this.holder.appendChild(img);

            var img = Reflection.add(img, { height: 1, opacity: 2/3 });
            img.id = 'imgHolder' + i;
            img.style.position = "relative";
            img.style.top = "300px";
            this.holder.appendChild(img);
            this.items[i].img = img;

	  }

          this.imgHeight = parseInt(document.getElementById('imgHolder0').style.height, 10);
          this.imgWidth = parseInt(document.getElementById('imgHolder0').style.width, 10);
          //alert(this.imgHeight);
	  



	  
	  var me = this;



          if (this.holder.addEventListener)
          {    // all browsers except IE before version 9
               // Internet Explorer, Opera, Google Chrome and Safari
	    this.holder.addEventListener ("mousewheel", MouseScroll, false);
               // Firefox
	    this.holder.addEventListener ("DOMMouseScroll", MouseScroll, false);
          }
          else
          {
              if (this.holder.attachEvent)
              { // IE before version 9
	        this.holder.attachEvent ("onmousewheel", MouseScroll);
              }
          }


          function MouseScroll(e)
          {
            var rolled = 0;
            //alert("ROLLED");
            if ('wheelDelta' in e)
            {
                rolled = e.wheelDelta;
	        if (rolled < 0)
	      	  me.next();
	        else
	      	  me.prev();
            }
            else
            {   // Firefox: The measurement units of the detail and wheelDelta properties are different.
                rolled = -40 * e.detail;
	        if (rolled < 0)
	      	  me.next();
	        else
	      	  me.prev();
            }
          }

	  /*
          if (this.holder.addEventListener)
          { // all browsers except IE before version 9
            // Internet Explorer, Opera, Google Chrome, Firefox and Safari
	    this.holder.addEventListener ("onmousemove", MouseMove, false);
          }
          else
          {
            if (this.holder.attachEvent)
            { // IE before version 9
	      this.holder.attachEvent ("onmousemove", MouseMove);
            }
          }


          function MouseMove(e)
          {
            var rolled = 0;
            alert("MOVED");
              if (e == undefined){e = window.event;}
	      cx = e.layerX; cy = e.layerY;
	      boundX = cx >= me._center.poly[0][0] && cx <= me._center.poly[3][0];
	      boundY = cy >= me._center.poly[0][1] && cy <= me._center.poly[1][1];
	      if (boundX && boundY)
	      	this.style.cursor = 'pointer';
	      else
	  	this.style.cursor = 'default';
          }
	  */


	  /*	  
          if(this.holder.addEventListener)
	  {
	    this.holder.addEventListener('DOMMouseScroll', function(e)
	    {
              if (e == undefined){e = window.event;}
	      if (e.detail > 0)
	        me.next();
	      else
	        me.prev();
	      e.preventDefault();
	    }, false);
          }
	  
          var me = this;
          if(this.holder.addEventListener)
	  {
	    this.holder.addEventListener('mousewheel', function(e)
	    {
              if (e == undefined){e = window.event;}
	      if (e.wheelDelta < 0)
	      	me.next();
	      else
	      	me.prev();
	      e.preventDefault();
	    }, false);
	  }
	  */

          var me = this;
	  /*var cx, cy, boundX, boundY;
          if(this.holder.addEventListener)
	  {
	    this.holder.onmousemove = function(e)
	    {
              if (e == undefined){e = window.event;}
	      cx = e.layerX; cy = e.layerY;
	      boundX = cx >= me._center.poly[0][0] && cx <= me._center.poly[3][0];
	      boundY = cy >= me._center.poly[0][1] && cy <= me._center.poly[1][1];
	      if (boundX && boundY)
	      	this.style.cursor = 'pointer';
	      else
	  	this.style.cursor = 'default';
	    };
	  }*/

          var me = this;
	  this.holder.onclick = function(e)
	  {
            //alert("CLICKED");
            if (e == undefined){e = window.event;}
	    //if(boundX && boundY)
	    //me.onSelectCenter(me.items[me.currCenter]);
	  };


          //while(this.loading) {this.sleep(0.1);}
          for(var i = 0; i < this.numItems; i++)
          {
	    this.items[i].x = 0;
	    this.items[i].y = 0;
	  }
         
          this.calcCoords();
          //this.sleep(0.5);

          this.display();



          
          //while(me.loading) {this.sleep(0.1);}
          //this.prev();
          //this.prev();
          //this.next();
          //this.next();
          //this.prev();
          //this.prev();
          //this.next();
          //this.next();
          
          //this.next();
          //this.next();
          //this.next();
          //this.next();

	};


        this.getIndexByPosition = function (position)
        {
          if (position < 0) var mod = 0;
          else var mod = 1;

          var I = (Math.round(position) + mod) % (items.length+1);
          //alert(I);
          if (I>0) I -= mod;
          else if(I<0) I += items.length - mod;
          else if(position<0) I = 0;
          else I = items.length - 1;

          return I;
        };

        var me = this;
        this.setSliderPosition = function (relPos)
        {
	  //relPos = relPos - Math.floor(relPos) + this.getIndexByPosition(Math.floor(relPos));
            //alert(relPos);
	  /*
            if (Math.round(relPos) < 0)
	      relPos = this.numItems;
            else if (relPos <= 0)
                relPos = 0;
            else if (Math.round(relPos) > this.numItems)
                relPos = 0;
            else if (relPos >= this.numItems)
                relPos = this.numItems;
	  */
            //alert(this.numItems + " " + this.scrollbar.style.width);

            if (items.length > 1) {
              var sPos = (((relPos - (this.numItems-1)/2)) / ((this.numItems-1)/2));
              sPos = (sPos * this.width / 4.2) + (this.width / 4.2);
	      //var sPos = (relPos / this.numItems)* 300;
            } else {
	      var sPos = (0.5 * 1);
            }
            //alert(sPos);
            //alert(this.slider.style.left);
            //this.slider.style.left = sPos + "px";
            this.slider.style.marginLeft = sPos + 'px';

            relPos = Math.round(relPos);
            if((relPos + 1) < 10)
              this.position.innerHTML = ' ' + (relPos + 1);
            else
              this.position.innerHTML = (relPos + 1);

            //this.slider.style.top = this.Scrollbar.center.y - this.scrollbar.center.y +"px";

        };






        this.display = function()
	{
	  var i = this.currCenter;
          this.setSliderPosition(i);
	  this.displayItem(this.items[i], i);

	  for(var i = this.currCenter+1; i < (this.currCenter+1 + this.numVisible); i++)
	  {
	    if(i >= this.numItems) {break;}
            //alert(i);
	    this.displayItem(this.items[i], i);
	  }
	  for(var i = this.currCenter-1; i > (this.currCenter-1 - this.numVisible); i--)
	  {
	    if(i < 0) {break;}
            //alert(i);
	    this.displayItem(this.items[i], i);
	  }
	};


        this.addReflection = function(item, i)
	{
          var imgID = item.img.id;

          imgID = 'img' + imgID.replace('imgHolder', '');

          var img = document.getElementById(imgID);
          img.height = item.h/2;
          img.width = item.w;
          var img = Reflection.add(img, { height: 1, opacity: item.o*this.reflectionFactor});

          img.id = 'imgHolder' + i;
          img.style.position = "absolute";
          //alert("X: " + item.x + " Y: " + item.y);
	  img.style.top   = item.y + 'px';
	  img.style.right = item.x + 'px';

	  //img.style.top = item.oldY + 'px';
	  //img.style.right = item.oldX + 'px';



          img.style.opacity = item.o;
          //img.style.-moz-opacity = item.o;
          img.style.filter = "alpha(opacity=" + item.o*(this.reflectionFactor*100) + ")"; 

          img.style.visibility = "hidden";
          img.style.cursor = '';

          var me = this;
	  img.onclick = function(e)
	  {
	    if (!e) var e = window.event;
            var caller = e.target || e.srcElement;
            var imgID = caller.id;
            //alert("IMG CLICKED");
            //alert(caller.id);
            if (e == undefined){e = window.event;}
	    //if(boundX && boundY)
            imgID = imgID.replace('img', '');

	    me.onSelectCenter(me.items[imgID]);
	  };




          this.holder.appendChild(img);

          //alert(item.oldY + " " + item.y);

          //xAniXY(img, item.oldX, item.y, item.x, item.y, 200)
          //xAniXY(img, item.x, item.y, item.oldX, item.oldY, 2000)

          this.items[i].img = img;
	}




        this.displayItem = function(item, i)
	{
          //var el = Ext.fly(item.img.id);
          var el = document.getElementById(item.img.id);
          //el.dom.style.zIndex = item.z;
          el.style.zIndex = item.z;
          //el.dom.style.display = "block";
          el.style.visibility = "";
          el.style.cursor = 'pointer';

          //el.sequenceFx();
          //el.syncFx();
          //el.stopFx();

	  //alert('id: ' + id + ' x: ' + item.x + ' y: ' + item.y + ' w: ' + item.w + ' h: ' + item.h + ' o: ' + item.o + ' img.height: ' + item.img.style.height + ' img.width: ' + item.img.style.width);

          //el.shift( { x: item.x, y: item.y, width: item.w, height: item.h, opacity: item.o, duration: 0.10});
          //el.shift( "tl", { x: item.x, y: item.y, opacity: item.o, duration: 2.20});
	};




        this.animRotation = function()
	{
	  var i = this.currCenter;
	  //alert("CURR: (" + this.items[i].x + "," + this.items[i].y + ") NEXT: (" + this.getX(i) + "," + this.getY(i) + ")");
            this.items[i].wf = this.getW(i);
            this.items[i].hf = this.getH(i);
	    this.items[i].xf = this.getX(i);
            this.items[i].yf = this.getY(i);
            this.items[i].zf = this.getZ(i);
            this.items[i].of = this.getO(i);

          var dir = (this.items[i].wf > this.items[i].w) ? 1 : -1;
          var wStep = Math.abs(this.items[i].wf - this.items[i].w)/this.steps;
          var hStep = Math.abs(this.items[i].hf - this.items[i].h)/this.steps;
          var xStep = Math.abs(this.items[i].xf - this.items[i].x)/this.steps;
          var yStep = Math.abs(this.items[i].yf - this.items[i].y)/this.steps;
          var zStep = Math.abs(this.items[i].zf - this.items[i].z)/this.steps;
          var oStep = Math.abs(this.items[i].of - this.items[i].o)/this.steps;

          //alert(this.items[i].x);
          //alert(this.items[i].xf);
          //alert(xStep);
          //alert(xStep*dir);

	  for(var j = 0; j < this.steps-1; j++)
          {
	    this.sleep(0.1);
            //window.setTimeout("alert(400);",400);
            this.items[i].w += (wStep * dir);
            this.items[i].h += (hStep * dir);
            this.items[i].x += (xStep * dir);
            this.items[i].y += (yStep * dir);
            this.items[i].z += (zStep * dir);
            this.items[i].o += (oStep * dir);
	    this.addReflection(this.items[i], i);
            this.displayItem(this.items[i], i);
            this.display();
	  }
            
            this.items[i].w = this.items[i].wf;
            this.items[i].h = this.items[i].hf;
            this.items[i].x = this.items[i].xf;
            this.items[i].y = this.items[i].yf;
            this.items[i].z = this.items[i].zf;
            this.items[i].o = this.items[i].of;
	    this.addReflection(this.items[i], i);

	  for(var i = this.currCenter+1; i < this.numItems; i++)
          {
	    if(i > this.numItems) {break;}
            this.items[i].w = this.getW(i);
            this.items[i].h = this.getH(i);
	    this.items[i].x = this.getX(i);
            this.items[i].y = this.getY(i);
            this.items[i].z = this.getZ(i);
            this.items[i].o = this.getO(i);
	    this.addReflection(this.items[i], i);
	  }
	  for(var i = this.currCenter-1; i >= 0; i--)
          {
	    if(i < 0) {break;}
            this.items[i].w = this.getW(i);
            this.items[i].h = this.getH(i);
	    this.items[i].x = this.getX(i);
            this.items[i].y = this.getY(i);
            this.items[i].z = this.getZ(i);
            this.items[i].o = this.getO(i);
	    this.addReflection(this.items[i], i);
	  }

	};


        this.calcCoords = function()
	{
 

          for(var i = 0; i < this.numItems; i++)
          {
	    this.items[i].oldX = this.items[i].x;
	    this.items[i].oldY = this.items[i].y;
	  }


	  var i = this.currCenter;
	  //alert("CURR: (" + this.items[i].x + "," + this.items[i].y + ") NEXT: (" + this.getX(i) + "," + this.getY(i) + ")");

	  //this.items[i].oldX = this.items[i].x;
	  //this.items[i].oldY = (this.getY(i) - this.items[i].y);

            this.items[i].w = this.getW(i);
            this.items[i].h = this.getH(i);
	    this.items[i].x = this.getX(i);
            this.items[i].y = this.getY(i) - this.imgOffset;
            this.items[i].z = this.getZ(i);
            this.items[i].o = this.getO(i);
	    this.addReflection(this.items[i], i);



	  for(var i = this.currCenter+1; i < this.numItems; i++)
          {
	    if(i > this.numItems) {break;}
	    //this.items[i].oldX = this.items[i].x;
	    //this.items[i].oldY = (this.getY(i) - this.items[i].y);

            this.items[i].w = this.getW(i);
            this.items[i].h = this.getH(i);
	    this.items[i].x = this.getX(i);
            this.items[i].y = this.getY(i);
            this.items[i].z = this.getZ(i);
            this.items[i].o = this.getO(i);
	    this.addReflection(this.items[i], i);
	  }
	  for(var i = this.currCenter-1; i >= 0; i--)
          {
	    if(i < 0) {break;}
	    //this.items[i].oldX = this.items[i].x;
	    //this.items[i].oldY =  (this.getY(i) - this.items[i].y);

            this.items[i].w = this.getW(i);
            this.items[i].h = this.getH(i);
	    this.items[i].x = this.getX(i);
            this.items[i].y = this.getY(i);
            this.items[i].z = this.getZ(i);
            this.items[i].o = this.getO(i);
	    this.addReflection(this.items[i], i);
	  }

          for(var i = 0; i < this.numItems; i++)
          {
	    //alert("I: " + i + "CURR: (" + Math.round(this.items[i].oldX) + "," + Math.round(this.items[i].oldY) + ") NEXT: (" + Math.round(this.items[i].x) + "," + Math.round(this.items[i].y) + ")");
	  }
          //for(var i = 0; i < this.numItems; i++)
          //{
	  //  this.items[i].img.style.visibility = "hidden";
	  //}



	};













        this.getContainerCenter = function(el)
	{
          //alert(this.width);
          //alert(el.style.width);
          //return(this.width/2);
          return((el.style.width)/2);
	};

        this.getX = function(pos)
	{
          //return((this.center + ((pos - this.currCenter) * 0.75)) - (this.items[pos].img.width/2));
          //alert(pos);
          if(pos < this.currCenter)
	  {
	    return(this.items[pos+1].x - (this.items[pos+1].w * 0.15));            
	  }
          else if(pos > this.currCenter)
	  {
	    return(this.items[pos-1].x + (this.items[pos-1].w * 0.45));            
	  }
          else // pos == this.currCenter
	  {
	    //return(500);
            //alert(this.items[pos].img.style.width);
            var scrollbarLeft = getPos(this.holder).left;
            var scrollbarWidth = this.holder.offsetWidth;

            //return(400);
	    //return(this.center - 100);
	    return(this.center - (0.70 * (parseInt(this.items[pos].img.style.width,10))));
	  }
	};

        this.getY = function(pos)
	{
          var pcnt = 0.1;
          if(this.flat) pcnt = 0.273;
          //if(this.flat) return((this.height/2) + (30 * Math.abs(this.currCenter - pos)));
          
          if(pos < this.currCenter)
	  {
            //alert(this.items[pos+1].h * pcnt);
	    return(this.items[pos+1].y + (this.items[pos+1].h * pcnt));            
	  }
          else if(pos > this.currCenter)
	  {
	    return(this.items[pos-1].y + (this.items[pos-1].h * pcnt));            
	  }
          else // pos == this.currCenter
	  {
            //alert(this.height);
            //alert(this.top);
            //return(600);
	    //return(this.height/2 - (50));
            //return(this.top);
	    //return((this.height));
	    //return((this.imgHeight/2));
	    return((this.height)-(this.imgHeight/2));
	  }
	};

        this.getZ = function(pos)
	{
          if(pos < this.currCenter)
	  {
	    return(this.items[pos+1].z - 1);            
	  }
          else if(pos > this.currCenter)
	  {
	    return(this.items[pos-1].z - 1);            
	  }
          else // pos == this.currCenter
	  {
	    return(this.numItems);
	  }
	};

        this.getW = function(pos)
	{
          if(pos < this.currCenter)
	  {
	    //alert("pos: " + pos + " +1 w: " + this.items[pos+1].w);
	    return(this.items[pos+1].w * 0.70);            
	  }
          else if(pos > this.currCenter)
	  {
	    //alert("pos: " + pos + " -1 w: " + this.items[pos-1].w);
	    return(this.items[pos-1].w * 0.70);            
	  }
          else // pos == this.currCenter
	  {
	    //alert("pos: " + pos + " w: " + this.imgWidth);
	    //alert("pos: " + pos + " w: " + this.items[pos].img.width);
            return(this.imgWidth);
            //alert(this.items[pos].img.style.width);
	    return(parseInt(this.items[pos].img.style.width,10));
	  }
	};

        this.getH = function(pos)
	{
          if(pos < this.currCenter)
	  {
	    return(this.items[pos+1].h * 0.70);            
	  }
          else if(pos > this.currCenter)
	  {
	    return(this.items[pos-1].h * 0.70);            
	  }
          else // pos == this.currCenter
	  {
            return(this.imgHeight);
            //alert(
	    return(parseInt(this.items[pos].img.style.height,10));
	  }
	};

        this.getO = function(pos)
	{
          if(pos < this.currCenter)
	  {
	    return(this.items[pos+1].o - 0.15);            
	  }
          else if(pos > this.currCenter)
	  {
	    return(this.items[pos-1].o - 0.15 );            
	  }
          else // pos == this.currCenter
	  {
	    return(1);
	  }
	};





	
        this.showLabel = function(sel)
        {
          this.label.innerHTML = this.createLabel(this.items[sel]);
          this.description.innerHTML = this.createDescription(this.items[sel]);
          this.rating.innerHTML = this.createRating(this.items[sel]);
          this.smallerPreview.innerHTML = this.createPreview(this.items[sel]);
        };



        this.sleep = function (time)
        {
          time = time * 1000;
          var sleeping = true;
          var now = new Date();
          var alarm;
          var startingMSeconds = now.getTime();
          //alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
          while(sleeping)
          {
            alarm = new Date();
            alarmMSeconds = alarm.getTime();
            if(alarmMSeconds - startingMSeconds > time){ sleeping = false; }
          }        
          //alert("Wakeup!");
        }

	
	this.prev = function(n)
	{
	   this.currCenter += (n || 1);
           if(this.currCenter > this.numItems-1) {this.currCenter = this.numItems-1;}
           else
	   {
             this.dir = 1;
             this.calcCoords();
             this.display();
             this.showLabel(this.currCenter);
	   }
	};
	
	this.next = function(n)
	{
	   this.currCenter -= (n || 1);
           if(this.currCenter < 0) {this.currCenter = 0;}
           else
	   {
             //this.animRotation();
             this.dir = -1;
             this.calcCoords();
             this.display();
             this.showLabel(this.currCenter);
	   }
	};

	this.moveTo = function(n)
	{
	   this.currCenter = (n || 0);
           if(this.currCenter < 0) {this.currCenter = 0;}
           else if(this.currCenter > this.numItems-1) {this.currCenter = this.numItems-1;}
           else
	   {
             this.calcCoords();
             this.display();
             this.showLabel(this.currCenter);
	   }
	};


        this.backAndforth = function()
        {
	  this.moveTo(0);
          for(var i = 0; i < this.numItems; i++)
          {
            this.next();
	  }
          for(var i = 0; i < this.numItems; i++)
          {
	    this.prev();
	  }
	};



















	
};




function getSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth + (document.documentElement.scrollLeft ? 0 : 16);
    myHeight = document.documentElement.clientHeight + (document.documentElement.scrollTop ? 0 : 0);
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth + (document.body.scrollLeft ? 0 : 16);
    myHeight = document.body.clientHeight + (document.body.scrollTop ? 0 : 0);
  }
  return {width: myWidth, height: myHeight};
}


function getOffset( el )
{
    if( typeof( el.offsetParent ) != 'undefined' )
    {
      for( var posX = 0, posY = 0; el; el = el.offsetParent )
      {
        posX += el.offsetLeft;
        posY += el.offsetTop;
      }
      //return [ posY, posX ];
      return { top: posY, left: posX };
    }
    else
    {
      //return [ oElement.y, oElement.x ];
      return { top: el.y, left: el.x };
    }
}


function getPos(el) {
    // yay readability
    for (var lx=0, ly=0, lx2=0;
         el != null;
         lx += el.offsetLeft, lx2 += el.offsetWidth, ly += el.offsetTop, el = el.offsetParent);
    return {left: lx, width: lx2, top: ly};
}




var findPos = function(obj) {
        var curleft = curtop = 0;
        try {
            if (obj.offsetParent) {
                curleft = obj.offsetLeft;
                curtop = obj.offsetTop;
                while (obj = obj.offsetParent) {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
            }
        }
        catch (ex) {}
        return {left:curleft, top:curtop};
    };


/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};



function xAniXY(e, x0, y0, x, y, t)
{
  if (!(e=xGetElementById(e))) return;
  //var x0 = xLeft(e), y0 = xTop(e); // start positions
  //var x0 = parseInt(e.style.right,10), y0 = parseInt(e.style.top,10);//parseInt(this.items[pos].img.style.height,10));
  //alert(x0);
  var dx = x - x0, dy = y - y0; // displacements
  var fq = 1 / t; // frequency
  var t0 = new Date().getTime(); // start time
  var tmr = setInterval(
    function() {
      var xi = x, yi = y;
      var et = new Date().getTime() - t0; // elapsed time
      if (et < t) {
        var f = et * fq; // constant velocity
        xi = f * dx + x0; // instantaneous positions
        yi = f * dy + y0;
      }
      else { clearInterval(tmr); }
      e.style.right = Math.round(xi) + 'px';
      e.style.top = Math.round(yi) + 'px';
      //alert(xi + " " + yi); 
    }, 10 // timer resolution
  );
}
