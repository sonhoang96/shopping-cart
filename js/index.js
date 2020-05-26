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
		// turn off .info-board when #cart turn on
		if($('#cart').hasClass('active') || $('#list').hasClass('open-list')){
			$('.info-board').removeClass('active');
		}
	});
	//turn on-off list-board-cart 

	//<--------------------------------------------------------------------------------------------------------------->


	//<--------------------------------------------------------------------------------------------------------------->
	//setup shopping-cart-items
	let INVENTORY = [];
	let removedInventory = [];
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
				name      : nameItem,
				image     : imageItem,
				price     : priceItem + 'K',
				id        : id,
				amount 	  : 1,
				totalPrice: priceItem + 'K',
				status    : 'on cart'
			});
			id++;
			updateTotalPrice();
		}
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

		$('.remove-button a').off('click').on('click',function(event){
			event.preventDefault();
			removeCartItem(this);
		});


		//display amount of item which added to cart
		$('#number').text(INVENTORY.length);
		//set style to body-list-cart
		if(INVENTORY.length > 3){
			$('.body-list-cart').css({overflow : 'scroll'});
		}else{
			$('.body-list-cart').css({overflow : 'hidden'});
		}
		// screen width
		if($(window).width() <= 990){
			if(INVENTORY.length > 2){
				$('.body-list-cart').css({overflow : 'scroll'});
			}else{
				$('.body-list-cart').css({overflow : 'hidden'});
			}
		}
	});

	//function add item to cart
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
		$('#list-cart').append(item);
	}

	//function update amounts and totalPrice of item in INVENTORY and display to screen 
	const updateCartItem = (input,value) => {
		const item = $(input).parent().parent().parent();
		const itemId = $(item).attr('id');
		const itemPrice = $(item).find('.price');
		const itemQuantity = value;
		const find = INVENTORY.find(item => item.id === Number(itemId));
		const elementPosition = INVENTORY.indexOf(find);
		const priceConverter = parseFloat(INVENTORY[elementPosition].price); // take part number
		let totalPrice = 0;

		//update totalprice of item in INVENTORY
		totalPrice += Math.round(priceConverter * itemQuantity * 100) / 100;

		if(totalPrice >= 1000){
			totalPrice = Math.round(priceConverter * itemQuantity / 10) / 100;
			//change type of value from K(thousand) ---> M(Million)
			INVENTORY[elementPosition].totalPrice = String(totalPrice) + 'M';

			$(item).find('.symbol-price').text('M');
		}else{
			$(item).find('.symbol-price').text('K');
			INVENTORY[elementPosition].totalPrice = String(totalPrice) + 'K';
		}
		INVENTORY[elementPosition].amount = Number(itemQuantity);

		$(itemPrice).text(totalPrice);

		// update display total price of whole items
		updateTotalPrice();
	}

	// function remove this item
	const removeCartItem = (button) => {
		const item = $(button).parent().parent().parent();
		const itemId = $(item).attr('id');
		const find = INVENTORY.find(item => item.id === Number(itemId));
		const elementPosition = INVENTORY.indexOf(find);
		const elementremoved = INVENTORY.slice(elementPosition,elementPosition + 1);
		//remove item from list cart
		$(item).remove();

		//update removedInventory which elements removed in INVENTORY
		removedInventory = removedInventory.concat(elementremoved);
		addRemovedItems();

		//remove item in INVENTORY
		INVENTORY.splice(elementPosition,1);

		//display amount of item after remove item from cart
		$('#number').text(INVENTORY.length);
		//set style to body-list-cart
		if(INVENTORY.length > 4){
			$('.body-list-cart').css({overflow : 'scroll'});
		}else{
			$('.body-list-cart').css({overflow : 'hidden'});
		}
		// update display total price of whole items
		updateTotalPrice();
	}

	//function update whole totalPice items
	const updateTotalPrice = () => {
		let totalWholePrice = 0;

		INVENTORY.forEach(item => {
			totalWholePrice += parseFloat(item.price) * item.amount;
		});
		// console.log(Math.round(parseInt(totalWholePrice / 10)) / 100);
		if(totalWholePrice < 1000){
			$('.purchase-total-price').text(Math.round(totalWholePrice * 100) / 100 + 'K');
			if(totalWholePrice === 0){
				$('.purchase-total-price').text(0);
			}
		}else{
			$('.purchase-total-price').text(Math.round(parseInt(totalWholePrice / 10)) / 100 + 'M');
		}
	}

	// button remove all items in list cart
	$('#remove-all-btn').bind('click', function(event) {
		event.preventDefault();
		// $('#list-cart').children().remove();
		const buttonsRemove = $('.remove-button a');
		for(let i = 0; i < buttonsRemove.length; i++){
			removeCartItem(buttonsRemove[i]);
		}
	});

	//setup shopping-cart-items
	//<--------------------------------------------------------------------------------------------------------------->



	//<--------------------------------------------------------------------------------------------------------------->
	//setup history removed item

	//add active to selected list in #info-user
	$('#info-user li.list-group-item').bind('click', function(event) {
		event.preventDefault();
		$('#info-user li.list-group-item').removeClass('active');
		$(this).addClass('active');

		//on or off display of removed list items
		if($('#board-removed-items').hasClass('active')){
			$('#removed-items').addClass('active');
		}else{
			$('#removed-items').removeClass('active');
		}
	});

	//function check removed items to removed list items
	const addRemovedItems = () => {
		removedInventory.forEach(item => {
			const removedItem = `<li class="list-group-item" id='${item.id}'>
									<div class="removed-image">
							  			<img src="${item.image}" alt="" class='w-100 img-thumbnail'>
							  		</div>
							  		<div class="removed-info">
							  			<p class="removed-name">${item.name}</p>
							  			<div class="removed-info-others">
							  				<p class="removed-price">${item.price}</p>
							  				<p class="removed-amount">${item.amount}</p>
							  			</div>
							  		</div>
						  		</li>`;
			if(item.status === 'on cart'){
				$('#removed-items').append(removedItem);
				item.status = 'removed';
				if($('#removed-items').children().length > 3){
					$('#removed-items').css({
						height: '292px',
						overflowY: 'scroll'
					});
				}
			}
		});
		console.log(removedInventory)
	}
	//setup history removed item
	//<--------------------------------------------------------------------------------------------------------------->

	//<--------------------------------------------------------------------------------------------------------------->
	//Responsive
		const screen = $(window);
		if(screen.width() <= 990){
			$('i.fas.fa-user, .account-user').unbind('click');
		}
		if (screen.width() <= 766) {
			$('#about .container').removeClass('container').addClass('container-fluid');
			$('#explore .col-md-4 .card').addClass('mb-5');
		} else {
			//open and close div.info-board
			$('i.fas.fa-user, .account-user').bind('click', function(event) {
				event.preventDefault();
				$(this).parent().find('.info-board').toggleClass('active');
				// turn off .#cart and #list when div.info-board turn on
				if($('.info-board').hasClass('active')){
					$('#cart').removeClass('active');
					$('#list').removeClass('open-list');
					//remove all class active in div.info-board
					if($('#info-user li.list-group-item').hasClass('active')){
						$('#info-user li.list-group-item').removeClass('active');
						$('#removed-items').removeClass('active');
					}
				}
			});
			$('#about .container').removeClass('container-fluid').addClass('container');
		}
	//Responsive
	//<--------------------------------------------------------------------------------------------------------------->
});
