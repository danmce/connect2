(function ($) {
    window.CONNECT = {};
    CONNECT.dragElements = function (target) {
        var dragStartX,
            dragStartY,
            objInitLeft,
            objInitTop,
            $elements = $(target),
            activeClass = 'active',
            canDrag = false;

        $.each($elements, function (e){
            $(this).on("mousedown", bindDrag);
        });

        function bindDrag (e) {
            canDrag = true;
            var $that = $(this);
            $that.attr('id', activeClass);
            objInitLeft = $that.offset().left;
            objInitTop = $that.offset().top;
            dragStartX = e.pageX;
            dragStartY = e.pageY;
        }

        function removeDrag (e) {
            canDrag = false;
            $(this).removeAttr(id);
        }
        
        document.addEventListener("mousemove", function (e) {
            if(!canDrag)
                return;
            var $element = $("#" + activeClass);
            $element.css('left', (objInitLeft + e.pageX - dragStartX) + "px");
            $element.css('top', (objInitTop + e.pageY - dragStartY) + "px");
        });

        document.addEventListener("mouseup", function(e) {
            canDrag = false;
            $("#" + activeClass).removeAttr('id');
        });
    }
    CONNECT.insertText = function (control, target, data) {
        var text;
        var update = function () {
            var lock, rnd, q, html, $target;
            $target = $(target);
            lock = false;
            if (!lock) {
                lock = true;
                rnd = Math.floor(Math.random() * text.length);
                q = text[rnd];
                html = q;
                $target.fadeOut('slow', function () {
                    $target.html(html);
                    $target.fadeIn('slow');
                });
                lock = false;
            }
        }
        $(control).click(function () {
            if (typeof quotes === "undefined") {
                $.getJSON(data, function (json) {
                    text = json.quotes;
                    update();
                })
            } else {
                update();
            }
        })
    }
    CONNECT.responsiveGallery = function () {
        var $window = $(window),
            sm = false,
            smCopy = false,
            breakpoint = 768;

        $window.resize(function (){
            toggleMedia ();
        });

        function setCopy () {
            if($window.width() < breakpoint) {
                smCopy = true;
            } else {
                smCopy = false;
            }
        }

        function toggleMedia () {
            var width = $window.width();
            if(width < breakpoint) {
                sm = true;
            } else {
                sm = false;
            }
            if(sm != smCopy) {
                smCopy = Object.assign(sm);
                replaceMedia();
            }
        }

        function replaceMedia () {
            var width = $window.width();
            if(width < breakpoint) {
                 $('img').each(function () {
                     var $this = $(this);
                    $this.attr("src", $this.data("imagealternate"))
                 });
            } else {
                $('img').each(function () {
                    var $this = $(this);
                    $this.attr("src", $this.data("imageorig"))
                });
            }
        }

        setCopy();
        toggleMedia();
        replaceMedia();
    }
})(jQuery);