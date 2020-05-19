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

	//<--------------------------------------------------------------------------------------------------------------->
	//setup shopping-cart-items
	let INVENTORY = [];
	let id = 0;

	$('a.btn-outline-warning').bind('click', function(event) {
		event.preventDefault();
		const ITEM = $(this).parent().parent().parent();
		const nameItem = ITEM.find('h4').text();
		const imageItem = ITEM.find('img').attr('src');
		const priceItem = ITEM.find('.cast').text();
		const existedObj = INVENTORY.find(obj => obj.name === nameItem);

		if(existedObj){
			$('.name-item').text(nameItem);
			$('div.alert-secondary').css('display', 'block');
			setTimeout(() => {
				$('div.alert-secondary').css('display', 'none');
			},5000);
			$('html').stop().animate({
				scrollTop: $('#explore').offset().top - heightBar + 1
			}, 100);
		}else{
			//update INVENTORY if item is not exist
			addItem(nameItem,id,imageItem,priceItem);
			INVENTORY.push({
				name   : nameItem,
				image  : imageItem,
				price  : priceItem,
				id     : id,
				amount : 1,
			});
			id++;
		}
		// id++;

		$('input.amount').off('change').on('change',function(event){
			event.preventDefault();
			const input = event.target;
			if(isNaN(input.value) || input.value <= 0){
				input.value = 1;
			}else if(input.value >= 99) {
				input.value = 99;
			}
			updateCartItem(this,input.value);
		});



		//display amount of item which added to cart
		$('#number').text(INVENTORY.length);
		//set style to body-list-cart
		if(INVENTORY.length > 4){
			$('.body-list-cart').css({overflow : 'scroll'});
		}else{
			$('.body-list-cart').css({overflow : 'hidden'});
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
					</li> <!--end list-item-->`;
		$('ul.list-group').append(item);
	}
	const updateCartItem = (input,value) => {
		const item = $(input).parent().parent().parent();
		const itemId = $(item).attr('id');
		const itemPrice = $(item).find('.price');
		const itemQuantity = value;
		let totalPrice = 0;

		//update price of item
		totalPrice += Math.round(Number(INVENTORY[itemId].price) * itemQuantity * 100) / 100;
		if(totalPrice >= 1000){
			totalPrice = Math.round(Number(INVENTORY[itemId].price) * itemQuantity / 10) / 100;
			$(item).find('.symbol-price').text('B');
		}else{
			$(item).find('.symbol-price').text('K');
		}
		$(itemPrice).text(totalPrice);

		// update new INVENTORY
		INVENTORY[itemId].amount = itemQuantity;
		INVENTORY[itemId].totalPrice = totalPrice;
		console.log(INVENTORY);
	}
	//setup shopping-cart-items
	//<--------------------------------------------------------------------------------------------------------------->
});
