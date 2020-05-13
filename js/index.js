$(document).ready(function() {

	//window scroll
	const heightBar = parseInt($('nav').css('height'));

	$('a.nav-link').bind('click', function(event) {
		event.preventDefault();
		$('html').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - heightBar + 1
		}, 1000);
		$('.nav-item.active').removeClass('active');
		$(this).parent().addClass('active');
	});//setup click navbar link to scroll to true position

	$(window).scroll(function(){
		let windowScroll = $(window).scrollTop();
		if(windowScroll < $('#about').offset().top - heightBar)
		{	
			$('.nav-item.active').removeClass('active');
			$('.nav-item')[0].classList.add('active');
		}

		if(windowScroll >= $('#about').offset().top - heightBar && windowScroll < $('#explore').offset().top - heightBar)
		{
			$('.nav-item.active').removeClass('active');
			$('.nav-item')[1].classList.add('active');
		}

		if(windowScroll >= $('#explore').offset().top - heightBar)
		{	
			$('.nav-item.active').removeClass('active');
			$('.nav-item')[2].classList.add('active');
		}
	});//setup toggle active when scroll

	$('.nodes-type').children().bind('click', function(event) {
		event.preventDefault();
		$('.nodes-type').children().removeClass('active');
		$(this).addClass('active');
		if($(this).attr('id') === 'cruiser'){
			$('#explore .row').css({display: 'flex'})
			$('.row.sport').css({display: 'none'});
			$('.row.vespa').css({display: 'none'});
		}
		if($(this).attr('id') === 'sport'){
			$('#explore .row').css({display: 'flex'})
			$('.row.cruiser').css({display: 'none'});
			$('.row.vespa').css({display: 'none'});		
		}
		if($(this).attr('id') === 'vespa'){
			$('#explore .row').css({display: 'flex'})
			$('.row.cruiser').css({display: 'none'});
			$('.row.sport').css({display: 'none'});
		}
		if($(this).attr('id') === 'all'){
			$('#explore .row').css({display: 'flex'})
		}
		console.log($(this).attr('id'))
	});
	//setup button change type of moto

	$('#cart').bind('click', function(event){
		event.preventDefault();
		$('#list').toggleClass('open-list');
	})
});