import jQuery from './jquery-3.4.1.js';
import {ins,maj} from '../../connect.js';
/* eslint no-undef: "off"*/
function ad(){
// var myForm = document.getElementById('insert-adresse');
  
// myForm.addEventListener('submit', function(e) {
	alert('Vous avez envoyé le formulaire !\n\nMais celui-ci a été bloqué pour que vous ne changiez pas de page.');
// 	e.preventDefault();
// });
}



function vald_ad(){
	var ville = document.getElementById("ville");
	var depart = document.getElementById("departement");
	var pays = document.getElementById("pays");
	
	if(ville.value == ''){
		jQuery('#form_status').html('<span class="wrong">Your Ville must not be empty!</span>');
		notice( ville );
	}else if(depart.value == ''){
		jQuery('#form_status').html('<span class="wrong">Your Depart must not be empty!</span>');
		notice( depart );
	}else if(pays.value == ''){
		jQuery('#form_status').html('<span class="wrong">Your Pays must not be empty!</span>');
		notice( pays );
	}else{
		var table = 'adresse';
		var col = ['ville','depart','pays'];
		var val = [ville,departement,pays];
		ins(table,col,val);
		jQuery('#form_status').html('<span class="loading">Sending your message...</span>');
		jQuery('#insert-adresse').animate({opacity:0.3});
		jQuery('#insert-adresse').find('inputs,button').css('border','none').attr({'disabled':''});
	}
}

function valid_adresse( f ){
	
	if( f.ville.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your Ville must not be empty!</span>');
		notice( f.ville );
	}else if( f.departement.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your departement must not be empty and correct format!</span>');
		notice( f.departement );
	}else if( f.pays.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your pays must not be empty!</span>');
		notice( f.pays );
	}else{
		var table = 'adresse';
		var col = ['ville','depart','pays'];
		var val = [ville,departement,pays];
		jQuery('#form_status').html('<span class="loading">Sending your message...</span>');
		ins(table,col,val);
		//  jQuery.ajax({
		// 	url: 'mail.php',
		// 	type: 'post',
		// 	data: jQuery('form#insert-adresse').serialize(),
		// 	complete: function(data) {
		// 		jQuery('#form_status').html(data.responseText);
		// 		jQuery('#fruitkha-contact').find('input,textarea').attr({value:''});
		// 		jQuery('#fruitkha-contact').css({opacity:1});
		// 		jQuery('#fruitkha-contact').remove();
		// 	}
		// });
		jQuery('#form_status').html('<span class="loading">Sending your message...</span>');
		jQuery('#insert-adresse').animate({opacity:0.3});
		jQuery('#insert-adresse').find('inputs,button').css('border','none').attr({'disabled':''});
	}
	
	return false;
}

function valid_datas( f ){
	
	if( f.name.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your name must not be empty!</span>');
		notice( f.name );
	}else if( f.email.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your email must not be empty and correct format!</span>');
		notice( f.email );
	//}else if( f.phone.value == '' ){
		//jQuery('#form_status').html('<span class="wrong">Your phone must not be empty and correct format!</span>');
		//notice( f.phone );
	}else if( f.subject.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your subject must not be empty!</span>');
		notice( f.subject );
	}else if( f.message.value == '' ){
		jQuery('#form_status').html('<span class="wrong">Your message must not be empty!</span>');
		notice( f.message );
	}else{
		 jQuery.ajax({
			url: 'mail.php',
			type: 'post',
			data: jQuery('form#fruitkha-contact').serialize(),
			complete: function(data) {
				jQuery('#form_status').html(data.responseText);
				jQuery('#fruitkha-contact').find('input,textarea').attr({value:''});
				jQuery('#fruitkha-contact').css({opacity:1});
				jQuery('#fruitkha-contact').remove();
			}
		});
		jQuery('#form_status').html('<span class="loading">Sending your message...</span>');
		jQuery('#fruitkha-contact').animate({opacity:0.3});
		jQuery('#fruitkha-contact').find('input,textarea,button').css('border','none').attr({'disabled':''});
	}
	
	return false;
}

function notice( f ){
	jQuery('#fruitkha-contact').find('input,textarea').css('border','none');
	f.style.border = '1px solid red';
	f.focus();
}