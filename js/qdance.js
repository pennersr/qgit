// JavaScript Document
		var QD = QD || {};

        QD.initPrettyPhoto = function() {
            $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'qdance',
            slideshow: 5500,
            deeplinking: false,
            animationFrames: 64,
            intervalcallback: function(count) {
                
                // animate the offset of the background to count * frame height/width
                $('.pp_pause').css({'backgroundPosition': ($('.pp_pause').height() * count * -1) + "px 0px" });

            },

            changepicturecallback: function() {
                $(document).trigger("pp_initshare");
            },

            stopcallback: function() {

                // reset back to the start frame
                $('.pp_play').css({'backgroundPosition': "0 0" });

            },
            shareoncallback: function(e) {
                e.preventDefault();
                $('.pp_content_share').show();
                $('.pp_share').addClass('active');
                $('.pp_pause').trigger("click");
                $(document).trigger("pp_initshare");
            },
            shareoffcallback: function(e) {
                e.preventDefault();
                $('.pp_content_share').hide();
                $('.pp_share').removeClass('active');
                $('.pp_play').trigger("click");
            },
            autoplay_slideshow:true,
            markup: '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                                <div class="pp_right"> \
                                    <div class="pp_content"> \
                                        <div class="pp_loaderIcon"></div> \
                                        <div class="pp_fade"> \
                                            <div class="pp_content_share"> \
                                                <ul> \
                                                    <li class="facebook"><a href="#">Facebook</a></li> \
                                                    <li class="twitter"><a href="#">Twitter</a></li> \
                                                    <li class="pinterest"><a href="#">Pinterest</a></li> \
                                                    <li class="googleplus"><a href="#">Google+</a></li> \
                                                </ul> \
                                                <div class="nib"></div> \
                                            </div> \
                                            <div id="pp_full_res"></div> \
                                            <div class="pp_details"> \
                                                <span class="pp_description"></span> \
                                                <div class="pp_nav"> \
                                                    <p class="currentTextHolder">0/0</p> \
                                                    <a href="#" class="pp_arrow_previous">Previous</a> \
                                                    <a href="#" class="pp_arrow_next">Next</a> \
                                                    <a class="pp_download" href="#">Download</a> \
                                                    <a href="#" class="pp_share">Share</a> \
                                                    <a class="pp_close" href="#">Close</a> \
                                                </div> \
                                            </div> \
                                        </div> \
                                    </div> \
                                </div> \
                                </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>',
            gallery_markup: ''
        }); };

        QD.initPrettyPhoto();
		
        var filters = {};
		
		
		$('.header-login-btn').click(function(){
			$('.login-container').slideToggle('fast');
		});

        var $container;

        $(window).load(function(){
            $container = $('#container');
            $container.isotope({
                itemSelector : '.item',
                transformsEnabled: false
            });
        });

        $('.toggle-buttons a').click(function(){
            var $this = $(this);

            if ( $this.hasClass('active') ) {
                return;
            }

            var $optionSet = $this.parents('.toggle-buttons');

            $optionSet.find('.active').removeClass('active');
            $this.addClass('active');

            var group = $optionSet.attr('data-filter-group');
            filters[ group ] = $this.attr('data-filter-value');

            var isoFilters = [];
            for ( var prop in filters ) {
                isoFilters.push( filters[ prop ] )
            }
            var selector = isoFilters.join('');
            $container.isotope({ filter: selector });

            return false;
        });

		var CYCLE_DURATION = 15000;
		$(".collapse").collapse();
		
			$("#promo-slides").cycle({
				fx: 'fade',
                speed: 1000,
                timeout: CYCLE_DURATION  - 1000,
                slideResize: true,
                containerResize: false,
                width: '100%',
                fit: 1
            });

            var cyclecount = 0;

            $("#feature-cycle-inner").cycle({fx: 'scrollHorz',
                speed: 'fast',
                timeout: 0,
                pager: '#feature-cycle-pagination span',
                prev: '#feature-cycle-pagination .left',
                next: '#feature-cycle-pagination .right'
            });

            $('#fill').maximage({
                fillElemen: '#fill',
                verticalCenter:true,
                cssTransitions: 0,
                cycleOptions: {
                    fx: 'fade',
                    speed: 1500,
                    timeout: CYCLE_DURATION  - 1500,
                    pager: '#promo-pagination span',
                	prev: '#promo-pagination .left',
                	next: '#promo-pagination .right',
                	before : function (curr, next, opts) {
                        if (cyclecount != 0) {
					       $("#promo-slides").cycle(opts.nextSlide);
                        }
                        else {
                            cyclecount++;
                        }
					} 
                },
                backgroundSize: function( $item ){
                    if ($item.data('h') > $item.data('w')) {
                        if ($.Window.data('w') / $.Window.data('h') < $item.data('ar')) {
                            $item
                                .height(($.Window.data('w') / $item.data('ar')).toFixed(0))
                                .width($.Window.data('w'));
                        } else {
                            $item
                                .height($.Window.data('h'))
                                .width(($.Window.data('h') * $item.data('ar')).toFixed(0));
                        }
                    } else {
                        if ($.Window.data('w') / $.Window.data('h') < $item.data('ar')) {
                            $item
                                .height($.Window.data('h'))
                                .width(($.Window.data('h') * $item.data('ar')).toFixed(0));
                        } else {
                            $item
                                .height(($.Window.data('w') / $item.data('ar')).toFixed(0))
                                .width($.Window.data('w'));
                        }
                    }
                }
            });
		
		$("#player-drawer").toggle(
      function() {
          $(this).animate({ 'bottom' : "+=100px" }, 'slow');
		  $('#music-player-persistent').animate({ 'bottom' : "+=100px" }, 'slow');
      },
      function() {
          $(this).animate({ 'bottom' : "-=100px" }, 'slow');
		  $('#music-player-persistent').animate({ 'bottom' : "-=100px" }, 'slow');
      });
	  
	  //$("SELECT").selectBox();
	  $("select").selectBoxIt();

	  //$('.timeline-viewport').tinyscrollbar({ axis: 'x'});
	  $('#scrollbar1').tinyscrollbar();
	  
	 	$('.timeline').each(function(){
        var width=0;
        $(this).children('div').each(function(i){ width+= $(this).outerWidth(); });
        $(this).width(width+'px');

   		});
		
		 $('.playlist-container').each(function(){
		  var width=0;
		  //$(this).find('div').each(function(){width+=$(this).width();});
		 // $(this).width(width+'px');
		  $(this).children('div').each(function(i){ width+= $(this).outerWidth(); });
       	  $(this).width(width+'px');
		});
		
		
		$('.watch-trailer').click(function(){
			$("#fill").cycle('pause');
			$("#promo-slides").cycle('pause');
		});
		
		var videoPlayers = [];
		function removeVideoPlayers() {
			$('.modal-video iframe').each(function(count, $item) {
				$item = $($item);
				videoPlayers.push({id: $item.parents('.modal').attr('id'), el: $item});
			});
		};
		
		removeVideoPlayers();
		
		$('.modal-video').on('show', function () {
			var that = this;
			var id = $(that).attr('id');
			$.each(videoPlayers, function(count, item) {
				if( item.id == id ) {
					$(that).append(item.el);
				}
			});
    	});
		
		$('.modal-video').on('hide', function () {
	    	$(this).find('iframe').remove();
    	});
		
		
		$('a.close').click(function(){
			$("#fill").cycle('resume');
			$("#promo-slides").cycle('resume');
		});
		
		
		$('a.swap-video-link').click(function(e){
			e.preventDefault();
  			var linkid = $(this).attr("href");
			document.getElementById("swap-video").src = linkid;
		});
		
		
		$(".radio-tweets").cycle({fx: 'scrollHorz',
                speed: 'fast',
                timeout: 0,
                prev: '.previous-tweet a',
                next: '.next-tweet a',
				nowrap: 1
            });
		
		$(".event-tweets").cycle({fx: 'scrollHorz',
                speed: 'fast',
                timeout: 0,
                prev: '#tweets-qdance .previous-tweet a',
                next: '#tweets-qdance .next-tweet a',
				nowrap: 1
            });
		
		$(".hashtag-tweets").cycle({fx: 'scrollHorz',
                speed: 'fast',
                timeout: 0,
                prev: '#tweets-hashtag .previous-tweet a',
                next: '#tweets-hashtag .next-tweet a',
				nowrap: 1
            });
		
		$('#tab-qdance').click(function(e){
				e.preventDefault();
				$('#tweets-hashtag').hide();
				$('#tweets-qdance').show();
				$(this).addClass('active');
				$('#tab-hashtag').removeClass('active');
			});
		
		$('#tab-hashtag').click(function(e){
				e.preventDefault();
				$('#tweets-hashtag').show();
				$('#tweets-qdance').hide();
				$(this).addClass('active');
				$('#tab-qdance').removeClass('active');
			});
		
		$('#tweets-hashtag').hide();
		
		function closeNotice() {
			$("#alert-banner").fadeOut("slow");
		}
		 
		 
		 
		$('#myTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		})
		
		
		$('#list-filter').on('show', function () {
		  $('.btn-refine-list').addClass('active');
		  $('.btn-refine-list').text('Hide list filter');
		  $('.list-filter').removeClass('closed');
		  
		})
		
		$('#list-filter').on('hide', function () {
		  $('.btn-refine-list').removeClass('active');
		  $('.btn-refine-list').text('Show list filter');
		  $('.list-filter').addClass('closed');
		})
		
		
		
		$("#iframe-ticket").height($("#extra-info").height());
		
				
	
		
		 
	

			
