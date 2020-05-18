$(document).ready(function() {

	//window scroll
	const heightBar = parseInt($('nav').css('height'));

	$('a.nav-link, .change-col-left a').bind('click', function(event) {
		event.preventDefault();
		$('html').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - heightBar + 1
		}, 1000);
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
			$('div[moto*="vespa"]').css({display: 'none'});
			$('div[moto*="sport"]').css({display: 'none'});
		}
		if($(this).attr('id') === 'sport'){
			$('#explore .row').css({display: 'flex'})
			$('div[moto*="cruiser"]').css({display: 'none'});
			$('div[moto*="vespa"]').css({display: 'none'});		
		}
		if($(this).attr('id') === 'vespa'){
			$('#explore .row').css({display: 'flex'})
			$('div[moto*="cruiser"]').css({display: 'none'});
			$('div[moto*="sport"]').css({display: 'none'});
		}
		if($(this).attr('id') === 'all'){
			$('#explore div[moto]').css({display: 'flex'});
		}
	});
	//setup button change type of moto

	$('#cart').bind('click', function(event){
		event.preventDefault();
		$('#list').toggleClass('open-list');
		$('#cart').toggleClass('active');
	});
	//turn on-off list-board-cart 

	//<--------------------------------------------------------------------------------------------------------------->
	//setup shopping-cart-items

	let INVENTORY = [];
	let id = 0;
	$('i.fa-shopping-cart').bind('click', function(event) {
		event.preventDefault();
		const cardItem = $(this).parentsUntil('.row').find('.card');
		const nameCard = $(cardItem.find('.card-body h4')).text();
		const imageCard = $(cardItem.find('img')).attr('src');
		const priceCard = $(cardItem.find('.cast')).text();

		if(INVENTORY.find(item => item.name === nameCard)){
			$('.name-item').text(nameCard);
			$('div.alert.alert-secondary').css('display', 'block');
			setTimeout(() => {
				$('div.alert.alert-secondary').css('display', 'none');
			}, 5000);
			//if item was in cart, alert-board is going to be appearance
		}else{
			addItem(nameCard,id,imageCard,priceCard);
			INVENTORY.push({
				name  : nameCard,
				id 	  : id,
				image : imageCard,
				price : priceCard
			});
			id++;
		}
	});

	const addItem = (name,id,image,price) => {
		let item = `<li class="list-group-item" id='${id}'>
						<div class="row">
							<div class="col-3 change-item-image">
								<img src="${image}" alt="${name}" class="w-100 shopping-cart-image">
							</div>
							<div class="col-6">
								<p class="shopping-cart-name">${name}</p>
							</div>
							<div class="col-3 change-price">	
								<p class="price">${price}</p>
								<span class="symbol-price">K</span>
							</div>	
						</div>
						<div class="row">
							<div class="col-8 adjust-button-amounts">
								<input type="number" class="amount" value ="1">
							</div>
							<div class="col-4 remove-button">
								<a href="#" class="btn btn-outline-secondary">remove</a>
							</div>
						</div>
					</li> <!--end list-item-->`

		$('ul.list-group').append(item);
	}
	const totalPrice = () => {
		$('.list-group-item')
	}
	//setup shopping-cart-items
	//<--------------------------------------------------------------------------------------------------------------->
});