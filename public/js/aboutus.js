
$('.click-me-2').click(function async(event) {

    // Don't follow the linka
    event.preventDefault();
    error = [];
    // Log the clicked element in the console
    var x = document.querySelector('#newsletter-email').value
    // if(!x) {
    //   error.push('please enter email')
    //   inner
    // }
    // <div id="adjad" style="display:none">"Please enter a valid email" </div>


    // if(error.length ==0)
    // {

    // }
    axios.post("/api/newsletter", {
        email: x
    }).then(response => {
        console.log(response);
        $("#checkemail").text(response.data.message);
        $("#checkemail").animate({ opacity: 1 });
    })





});


(function ($) {
    $.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof (settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof (settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // start all the timers
    $('.timer').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
});


function animate1(elementclass,animation1 )
{
var element3 = document.querySelectorAll(elementclass);
var element4 = document.querySelector('nav');
window.addEventListener('scroll', function(event) {
  element3.forEach(element => {
    var wintop     = $(window).scrollTop();
    var winheight=$(window).height();
    var winbottom= wintop+winheight;
    console.log(winbottom);
    const navheight=$(element4).height();
    var eletop = $(element).offset().top;
    var eleheight=$(element).height();
    var elebottom=eletop + eleheight;
    console.log(elebottom);
      if(eletop>(wintop-eleheight) && elebottom<(winbottom+eleheight))
     { element.style.opacity=1;
      $(element).addClass(animation1); 
      
      
      //  console.log("yes");
    }
     else
     
    {  
   
      element.style.opacity=0;
       
      $(element).removeClass(animation1);

      //  console.log($(window).width());
      //   console.log("no");
      }

})
});
}