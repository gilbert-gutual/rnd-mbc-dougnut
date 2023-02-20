jQuery.mbc_ddType = function( settings ) {
    settings = jQuery.extend(true, {
        debug:true,
		autonext:true,
		menu_max:4,
		tblLayout:"col-4",
        itemTooltip: {
			"6":{"text":"This a sample item tooltip for item 6!"},
			"16":{"text":"This a sample item tooltip for item 16!"},
		},   
        symbol: '$',
		inputErrorText:"Please enter a value between 0-30",
    }, settings || {});
  var $ = jQuery;
  //onLoad
 onLoad();
   function onLoad() {
		//-------------------convert numeric table label data to object ----------------//
	    var tbldata = {};   
	    $("ul.cm-numeric-response-set").find("li").each( function(){
		   var data =  $(this).find("label").text().split("{")
		   var code =  data[1].split("||")[0].split("::")
		   var price = data[1].split("||")[1].split("::")
		   var group = data[1].split("||")[2].split("::")
		   var state = data[1].split("||")[3].split("::") 
		   var label = data[0] 
			   tbldata[label] = {};
			   tbldata[label][code[0]] = code[1];
			   //-------------------assign data code to numeric boxes ----------------//
			   $(this).find("input.cm-numeric-input").attr("data-code",code[1]);
			   //-------------------end ----------------//
			   tbldata[label][price[0]] = price[1]
			   tbldata[label][group[0]] = group[1].replace("'","").replace(" ","_");
			   tbldata[label][state[0]] = state[1].replace("}","")  
		});
		//-------------------end ----------------//
		var containerstring = "<div id='container' class='col-4'><div class='header' style='flex-basis:99.8%'><div class='question'>If this menu were available<b>what you would buy?</b>(Menu 1 of 4)<br><strong>PURCHASE OCCASION:</strong>Next morning purchase (before 11am) buying for<strong>x people</strong>, including yourself.<br></div><div class='menu-sequence'>MENU #<label class='order'>1</label><label class='total'> of "+settings.menu_max+"</label></div><div class='hoverinstruction' style='text-align:center'><i class='fa fa-info-circle fa-2x'></i> Roll over the <i class='fa fa-info-circle'></i> icon next to an item for description</div></div><div class='cell table-column column-1'><div class='category' data-group='COFFEE'><div class='menu-header'><span>COFFEE</span><span>Hot | Iced</span></div></div><div class='category' data-group='ESPRESSO'><div class='menu-header'>ESPRESSO</div></div></div><div class='cell table-column column-2'><div class='category' data-group='REFRESHING_SIPS'><div class='menu-header'><span>REFRESHING SIPS</span><span>Hot | Iced</span></div></div></div><div class='cell table-column column-3'><div class='category' data-group='EATS'><div class='menu-header'>EATS</div></div></div><div class='cell table-column column-4'><div class='category' data-group='SNACKIN'><div class='menu-header'>SNACKIN'</div></div><div class='category' data-group='BAKERY'><div class='menu-header'>BAKERY</div></div></div><div class='footer' style='flex-basis:97.98%'><div style='flex-basis:25%;background-color:#e0e6f4;padding:5px;height:55px'><div class='tbl'><div class='totallabel'>TOTAL:</div><div class='total' style='font-size:15pt'>$0.00</div><div class='totalimage'><img src='https://ssiprojects.s3.amazonaws.com/rnd/tools/mbc/mbc_ddType/machine.png' height='50'></div></div></div><div style='flex-basis:75%;background-color:#e0e6f4;padding:5px;height:55px'><div class='tbl'><div class='freqText'>Earlier you said you would purchase from Brand x times in the morning. If this menu replaced the current menu, how many times would you purchase in the next 30 days. Please assume you like the taste of any items you choose from this menu</div><div class='freqAnswer'><label class='input-error-label not-visible'>"+settings.inputErrorText+"</label><input autocomplete='off' type='text' min='0' max='30' value='' style='width:50px;height:30px'></div></div></div></div><div class='btn left disabled' value='1' style='flex-basis:20%;background-color:#2f5597;margin-top:10px' data-html='true' data-placement='top' title='Please select at lease one response.'>CONTINUE</div></div>"
		//-------------------build table----------------//
		$(containerstring).insertBefore(".cm-numeric.fieldset");
		//-------------------build items----------------//
		$.each(tbldata, function(item,data){
		  var rawprice= data.Prices.split(",");
		  var state = data.state=="0" ? "disabled":"";
		  var price1 = (rawprice.length > 1) ? settings.symbol+rawprice[0]+" (H)":settings.symbol+rawprice[0];
		  var price2 = (rawprice.length > 1 && rawprice[1].length > 0) ? (" | "+settings.symbol+rawprice[1]+" (I)"):"";
		  var tooltip ="";
		  
		  if( typeof(settings.itemTooltip[data.itemNumber]) != "undefined"){
		      tooltip = settings.itemTooltip[data.itemNumber]["text"].length>0 ? "<font color='#FF3399'><strong>NEW!</strong></font> <i class='fa fa-info-circle' data-toggle='tooltip' data-placement='top' title='"+settings.itemTooltip[data.itemNumber]["text"]+"'></i>":"";
		  }
		  var template = "<div class='menu-item'><div class='liSelection' data-price='"+rawprice[0]+"' data-code='"+data.itemNumber+"' data-value=''><select name='answer' class='round' "+state+"><option value=''></option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></div><div class='liLabel "+state+"'>"+item+" "+tooltip+"</div><div class='liPrices  "+state+"'>"+(price1+price2)+"</div></div>";
		  $(template).appendTo("div.category[data-group='"+data.Group+"']");
		});
		//-------------------end ----------------//
        jQuery("#container").addClass(settings.tblLayout);
		jQuery('i.fa').tooltip();
		jQuery('.btn.disabled').tooltip();
		calculate();
		validate();
		if (jQuery(".cm-qtext").length>0){ jQuery("#container .question").html(jQuery(".cm-qtext").html()); }
		if (jQuery(".cm-instructions").length>1){ jQuery("#container .freqText").html(jQuery(".cm-instructions").eq(1).html());  } 
		if (jQuery(".cm-instructions").length>1){ jQuery("#container .menu-sequence .order").html(jQuery(".cm-instructions").eq(0).html());  } 
   }
   
		var dropdown = jQuery("select")
		var selectItem = jQuery("div.liSelection");
		dropdown.on("change", function(){
		    var me = jQuery(this);
			var code = me.parent().data("code")
			me.parent().attr("data-value",me.val());
			//update total
			jQuery(".footer .tbl .total").text(settings.symbol+calculate())
			//validate continue button
			validate();
			  
		});
		jQuery(".freqAnswer").find("input[type='text']").on("keyup", function(){
			validate();
		});
		jQuery(".btn.left").on("click", function(){
		  if ( !jQuery(this).hasClass("disabled") ){
		      onsubmit();
		  }
		});
	
		const autoNumElement = new AutoNumeric(".freqAnswer input",{
				decimalPlaces: 0,
				maximumValue: "30",
				minimumValue: "0"
		});
		//console.log("autoNumElement",autoNumElement);

		
		function validate(){
		   var error = 0;
		   var error_string="";
		   if ( jQuery(".liSelection[data-value!='']").length==0 ){ error++; error_string += "<li>Please select at least one item.</li>" }
		   if ( jQuery(".freqAnswer").find("input").val().length==0){ error++; error_string += "<li>Please provide # of visits in next 30 days.</li>" }
		   
		   const inputVal = jQuery(".freqAnswer").find("input").val();
		   let inputError = 0;
		   if (inputVal && (isNaN(inputVal) || inputVal.indexOf(".")>=0 || (parseInt(inputVal)<0 || parseInt(inputVal)>30))){ inputError++;}
		   
		   if (error ==0 && inputError==0){
				jQuery(".btn.left").removeClass("disabled")
				jQuery(".btn.left").removeAttr("data-original-title");				
				
		   } else{
		       jQuery(".btn.left").addClass("disabled")
			   jQuery(".btn.left").attr("data-original-title","<ul>"+error_string+"</ul>");
			 }
			 
			if (inputError>0){
				jQuery(".input-error-label").removeClass("not-visible");
			}
			else{
				jQuery(".input-error-label").addClass("not-visible");
			}
		}
		function calculate(){
		    var sum = 0;	    
			jQuery(".liSelection[data-value!='']").find("select").each( function(){
				 if (jQuery(this).data("value")!=""){
					var thisprice = parseFloat(jQuery(this).parent().data("price"));
					var thisunit  = parseFloat(jQuery(this).val());
					var thisproduct = parseFloat(thisprice * thisunit);
					sum += thisproduct;
				  }
			});
			return sum.toFixed(2);
		}
		function onsubmit(){
		        //items
				jQuery(".liSelection[data-value!='']").each( function(){
				    var thiscode = jQuery(this).data("code");
					var thisvalue = jQuery(this).data("value");
					jQuery(".cm-numeric-input[data-code='"+thiscode+"']").val(thisvalue);
				});
				//total
				jQuery(".cm-numeric-input[data-code='68']").val(calculate());
				//times
				jQuery(".cm-numeric-input[data-code='69']").val(jQuery(".freqAnswer").find("input").val());
				if (settings.autonext){ jQuery("#cm-NextButton").click() }
		}
    
  
}