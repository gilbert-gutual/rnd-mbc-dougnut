jQuery.mbc_ddType = function( settings ) {
    settings = jQuery.extend(true, {
        debug:true,
		autonext:true,
		headerText:{
			"1":"COFFEE",
			"2":"ESPRESSO",
			"3":"REFRESHING SIPS",
			"4":"EATS",
			"5":"SNACKIN'",
			"6":"BAKERY",
		},
		menu_max:3,
		tblLayout:"col-4",
        itemTooltip: {
			"6":{"text":"This a sample item tooltip for item 6!"},
			"16":{"text":"This a sample item tooltip for item 16!"},
		},   
		packing_types:[12,6,3],
		mini_packing:[8],
		plus_packing:[4],
		discounts:{
				glazed:{
					12:13.49,
					6:9.98,
					3:4.99
				},
				assorted:{
					12:15.49,
					6:10.98,
					3:5.49
				},
				specialtyplus:{
					4:9.39,
				},
				mini_original_glazed:{
					8:13.99
				},
				mini_assorted:{
					8:15.99
				}
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
		     if (settings.debug) console.log(data[1])
		   var code =  data[1].split("||")[0].split("::")
		   var price = data[1].split("||")[1].split("::")
		   var group = data[1].split("||")[2].split("::")
		   var state = data[1].split("||")[3].split("::") 
		   var pic   = data[1].split("||")[4].split("::") 
		   var klas   = data[1].split("||")[5].split("::") 
		   var description  = data[1].split("||")[6].split("::") 
		 
		   
		   var label = data[0] 
			   tbldata[label] = {};
			   tbldata[label][code[0]] = code[1];
			   //-------------------assign data code to numeric boxes ----------------//
			   $(this).find("input.cm-numeric-input").attr("data-code",code[1]);
			   //-------------------end ----------------//
			   tbldata[label][price[0]] = price[1]
			   tbldata[label][group[0]] = group[1].replace("'","").replace(" ","_");
			   tbldata[label][state[0]] = state[1];
			   tbldata[label][pic[0]] = pic[1];
			   tbldata[label][klas[0]] = klas[1];
			   tbldata[label][description[0]] = description[1].replace("}","")  
		});
		//-------------------end ----------------//
		var containerstring = "<div class='stLoading'><h1>Loading items...</h1></div><div id='container' class=''><div class='header' style='flex-basis:99.8%'><div class='question'>Please enter the number of each doughnut you would buy in a TYPICAL TRIP to KRISPY KREME. If there are any you wouldn’t buy, just leave these at 0. You can buy as many doughnuts as you want or none.<br><br><i>Please enter the number of each doughnut you would buy in a TYPICAL TRIP to KRISPY KREME. If there are any you wouldn’t buy, just leave these at 0. You can buy as many doughnuts as you want or none.</i></div></div><div class='cell table-column column-1'><div class='category' data-group='1'><div class='menu-header'><span>"+settings.headerText["1"]+"</span><span>Enter # would order</span></div></div><div class='category' data-group='2'><div class='menu-header'><span>"+settings.headerText["2"]+"</span><span>Enter # would order</span></div></div></div><div class='cell table-column column-2'><div class='category' data-group='3'><div class='menu-header'><span>"+settings.headerText["3"]+"</span><span>Enter # would order</span></div></div><div class='category' data-group='4'><div class='menu-header'><span>"+settings.headerText["4"]+"</span><span>Enter # would order</span></div></div></div><div class='cell table-column column-3'><div class='category' data-group='5'><div class='menu-header'><span>"+settings.headerText["5"]+"</span><span>Enter # would order</span></div></div></div><div class='cell table-column column-4'><div class='category' data-group='6' style='display:none;'><div class='menu-header'><span>"+settings.headerText["6"]+"</span><span>Enter # would order</span></div></div></div><div class='footer' style='flex-basis:15%'><div style='flex-basis:25%;color:#fff;background-color:#fff;padding:5px;height:160px'><div class='tbl'><div class='btn right disabled' value='1' style='flex-basis:100%;background-color:red;' >CLEAR ALL SELECTIONS</div></div></div><div style='flex-basis:25%;color:#fff;background-color:#fff;padding:5px;height:25px'><div class='tbl'><img style='margin-top: -100px;' src='https://ssiprojects.s3.amazonaws.com/rnd/tools/mbc/mbc_ddType_v2/kk_logo.png' /></div></div><div style='flex-basis:25%;color:#fff;background-color:#548235;padding:5px;height:25px'><div class='tbl'><div style='font-size:10px;margin-left:0px;'>TOTAL COST</div><div style='font-size:10px;margin-left:0px;'>TOTAL # Ordered</div></div></div><div style='flex-basis:25%;color:#fff;background-color:#375623;padding:5px;height:25px'><div class='tbl'><div class='total' style='font-size:10px'>$0.00</div><div class='total_number' style='font-size:10px'>0</div></div></div><div style='flex-basis:25%;color:#000;background-color:#fff;padding:5px;height:25px'><div class='tbl'><div style='font-size:10px;margin-left:-40px;'>Proportion of dozen donuts ordered</div><div class='dozprop' style='font-size:10px;margin-right:30px;'>1.0</div></div></div></div><div class='btn left disabled' value='1' style='background-color:#006938;flex-basis:20%;margin-top: 235px;' data-html='true' data-placement='top'>CONTINUE</div></div>"

		//-------------------build table----------------//
		$(containerstring).insertBefore(".cm-numeric.fieldset");
		//-------------------build items----------------//
		$.each(tbldata, function(item,data){
		  var rawprice= data.Prices.split(",");
		  var state = data.state=="1" ? "style='display:none;'":"";
		  var active = data.state=="1" ? "":"active";
		  var price1 = (rawprice.length > 1) ? settings.symbol+rawprice[0]+" (H)":settings.symbol+rawprice[0];
		  var price2 = (rawprice.length > 1 && rawprice[1].length > 0) ? (" | "+settings.symbol+rawprice[1]+" (I)"):"";
		  var tooltip ="";
		  if (settings.debug) console.log(data)
		  /*
		  if( typeof(data.description) != "undefined"){
		      tooltip = data.description.length>0 ? "<i class='fa fa-info-circle' data-toggle='tooltip' data-placement='top' title='"+data.description+"'></i>":"";
		  }*/
		  
		  var template = "<div class='menu-item "+active+"' "+state+"><div class='liImg'><img src='"+data.image+"' width='30' data-placement='top' title='"+data.description+"' /></div><div class='liLabel'><span data-placement='top' title='"+data.description+"'>"+item+"</span></div><div class='liPrices  "+state+"'>"+(price1+price2)+"</div><div class='liSelection' data-price='"+rawprice[0]+"' data-class='"+data.class+"' data-code='"+data.itemNumber+"' data-value='0'><input type='number' min='0' max='36' value='0' onkeypress='return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57' pattern='\\d*' /></div></div>";
		  $(template).appendTo("div.category[data-group='"+data.Group+"']");
		});
		//-------------------end ----------------//
        jQuery("#container").addClass(settings.tblLayout);
		jQuery('.liLabel span,.liImg img').tooltip({
			content: function() {
				return $(this).attr('title');
			}
		});
		jQuery('.btn.disabled').tooltip({
			content: function() {
				return $(this).attr('title');
			}
		});
		calculate();
		validate();
		if (jQuery(".cm-qtext").length>0){ jQuery("#container .question").html(jQuery(".cm-qtext").html()); }
		if (jQuery(".cm-instructions").length>1){ jQuery("#container .freqText").html(jQuery(".cm-instructions").eq(1).html());  } 
		if (jQuery(".cm-instructions").length>1){ jQuery("#container .menu-sequence .order").html(jQuery(".cm-instructions").eq(0).html());  } 
		
		//hideLoading();
		jQuery(".menu-item.active:odd").css("background-color","rgba(128, 128, 128, 0.19)");
   }
   
		var inputbox = jQuery("input[type='number']");
		inputbox.on("change input mousewheel", function(){
		    var me = jQuery(this);
			var code = me.parent().data("code")
			me.parent().attr("data-value",me.val());
			//update total
			calculate();
			//validate continue button
			validate(); 
		}).on("focus", function (){
			if (jQuery(this).val()=="0") { jQuery(this).val(""); jQuery(this).parent().attr("data-value","")}
			//validate continue button
			validate();
		})

		jQuery(".btn.left").on("click", function(){
		  if ( !jQuery(this).hasClass("disabled") ){
		      onsubmit();
		  }
		});
		jQuery(".btn.right").on("click", function(){

			jQuery(".liSelection[data-class!='E']").attr("data-value","0");
			jQuery(".liSelection[data-class!='E']").find("input[type='number']").val("0");
			jQuery(".liSelection").removeClass("error")
			jQuery(this).addClass("disabled")

			//update total
			calculate();
			//validate continue button
			validate();

		});

		function validate(){
		   var error = 0;
		   var error_string="";
		   /*
		   if ( jQuery(".liSelection[data-value='0']").length==jQuery(".liSelection").length ){ error++; error_string += "<li>Please select at least one item.</li>" }
		   */
		   jQuery(".liSelection").each( function(){
			   var thisvalue = jQuery(this).attr("data-value");
			   if (!(thisvalue!="" && thisvalue<=36)){ jQuery(this).addClass("error");error++; error_string += "Please review input range (0-36) for "+jQuery(this).parent().find(".liLabel").text()+"<br/>"  } else { jQuery(this).removeClass("error"); } 
		   });
		   
		   if (error ==0){
				jQuery(".btn.left").removeClass("disabled")
				jQuery(".btn.left").removeAttr("data-original-title");				
				
		   } else{
		       jQuery(".btn.left").addClass("disabled");
			   jQuery(".btn.left").attr("title",""+error_string+"");
		   }

		   if ( jQuery(".liSelection[data-class!='E'][data-value!='0']").length > 0 ) { jQuery(".btn.right").removeClass("disabled") } else {  jQuery(".btn.right").addClass("disabled") }
		}
		
		function calculate(){
			var sum = {
				total_cost:0,
				total_number:0
			};
					//-------------- ORIGINAL GLAZED ---------------------//
					var  originalglazed = parseFloat(jQuery(".liSelection[data-code='28']").attr("data-value"));
					var  p_originalglazed = parseFloat(jQuery(".liSelection[data-code='28']").attr("data-price"));
					var originalglazed_dump = [];
					var excess_size = 0;
					if ( originalglazed > 0 ){
						
						if ( originalglazed < 3){
							 //sum.total_cost += (originalglazed * p_originalglazed);
							 excess_size = originalglazed;
						} else {
							var packing_types = settings.packing_types;
							var number_of_items = originalglazed;
							var discount = settings.discounts.glazed;
							
							
							var lowestpack = (packing_types[packing_types.length -1] - 1);
							var sortdump = [];
							var initsort = sortpacking(number_of_items, packing_types);
								sortdump.push(initsort);
								excess_size = initsort.excess;
								
								while ( excess_size >  lowestpack) {
								   var newsort = sortpacking(excess_size, packing_types)
								   excess_size = newsort.excess;
								   sortdump.push(newsort)
								}
								var R_Types = sortdump.map( n=> n.type);
								var R_Size =  sortdump.map( n=> n.size);
							
								jQuery.each(R_Types, function(i,type){
									var thistype = type;
									var thissize = R_Size[i];
									var newprice = discount[thistype];
									sum.total_cost+=(newprice*thissize);
								});
								//var newexcess = sortdump[sortdump.length-1].excess
								excess_size = sortdump[sortdump.length-1].excess;
								//sum.total_cost+=(excess_size * p_originalglazed);	

							if (settings.debug) console.log("============original glazed(1)===================");
							if (settings.debug) console.log(sum.total_cost,sortdump,excess_size);								
						}
						
					}

			        //sum.total_number += originalglazed;
					//-------------- ASSORTED ---------------------//
					var assorted 	  = [];
					var assorted_code = [];
					var bIsAssorted = true;
					var assorted_excess = 0;
					var upcharge = 0;
					var upcharge_rate=0.30;
					jQuery(".liSelection[data-class='C'][data-value!='0']").each( function(){    
							var thisprice = parseFloat(jQuery(this).attr("data-price"));
							var thisunit  = parseFloat(jQuery(this).attr("data-value"));
							var thiscode  = parseInt(jQuery(this).attr("data-code"));
							
							for (i=1;i<=thisunit;i++){
								assorted.push(thisprice);
								assorted_code.push(thiscode);
							}
					});
					if (assorted.length==0){
						sum.total_cost+=(excess_size * p_originalglazed);	
						if (settings.debug) console.log("============original glazed(2)===================");
					    if (settings.debug) console.log(sum.total_cost,sortdump,excess_size);
					} else {
						console.log("here here",assorted)
					    if ( originalglazed >  0 ){ //assorted with originzal glazed
								bIsAssorted = true;
								if ( !(originalglazed==3|| originalglazed==6 || originalglazed==12)){
									sum.total_cost = 0; //zero out calculation for glazed


									for(i=1;i<=originalglazed;i++){
										assorted.push(p_originalglazed);
									}
								}
						} else { //assorted codes only
							console.log("--- here");
							if (uniq(assorted_code).length > 1){bIsAssorted = true;}
						}							
					}
					
					if ( bIsAssorted ){
						
						if ( assorted.length < 3 ){
							let sam = 0;
							assorted.map(e => sam += e)
							sum.total_cost+=sam;
							
							if (settings.debug) console.log("============assorted===================");
							if (settings.debug) console.log(sum.total_cost);	
						}else{
							
							var packing_types = settings.packing_types;
							var number_of_items = assorted.length;
							var discount = settings.discounts.assorted;	
							
							var lowestpack = (packing_types[packing_types.length -1] - 1);
							var sortdump = [];
							var initsort = sortpacking_v2(assorted,number_of_items, packing_types);
								sortdump.push(initsort);
								assorted_excess = initsort.excess;
								
								while ( assorted_excess >  lowestpack) {
								   var newsort = sortpacking_v2(assorted,assorted_excess, packing_types)
								   assorted_excess = newsort.excess;
								   sortdump.push(newsort)
								}
								console.log(sortdump)
								var R_Types = sortdump.map( n=> n.type);
								var R_Size =  sortdump.map( n=> n.size);
							
								jQuery.each(R_Types, function(i,type){
									var thistype = type;
									var thissize = R_Size[i];
									var newprice = discount[thistype];
									sum.total_cost+=(newprice*thissize);
								});
								//var newexcess = sortdump[sortdump.length-1].excess
								excess_size = sortdump[sortdump.length-1].excess;
								//sum.total_cost+=(excess_size * p_originalglazed);	
								var newexcess = 0;
								if (excess_size>0){
									for(i=0;i<excess_size;i++){
										newexcess+=assorted[i];
									}
								}
								sum.total_cost+=newexcess;
								//check for upcharge
								jQuery.each(sortdump, function(i,thisval){
									upcharge+=thisval.special;
								});
								sum.total_cost+=(upcharge*upcharge_rate);	
								if (settings.debug) console.log("============assorted===================");
							    if (settings.debug) console.log(sum.total_cost,sortdump,assorted_excess);								
						}					
					} else {
						let sam = 0;
							assorted.map(e => sam += e)
							sum.total_cost+=sam;
							
							if (settings.debug) console.log("============assorted===================");
							if (settings.debug) console.log(sum.total_cost);	
					}

					//-------------- SPECIALTY PLUS ---------------------//
					var specialtyplus = [];
					var special_excess = 0;
					jQuery(".liSelection[data-class='A'][data-value!='0']").each( function(){
							var thisprice = parseFloat(jQuery(this).attr("data-price"));
							var thisunit  = parseFloat(jQuery(this).attr("data-value"));
							for (i=1;i<=thisunit;i++){
								specialtyplus.push(thisprice);
							}
					});
		
					if ( specialtyplus.length < 4 ){
						let sam = 0;
						specialtyplus.map(e => sam += e)
						sum.total_cost+=sam;
					}else{
							var packing_types = settings.plus_packing;
							var number_of_items = specialtyplus.length;
							var discount = settings.discounts.specialtyplus;
							
							
							var lowestpack = (packing_types[packing_types.length -1] - 1);
							var sortdump = [];
							var initsort = sortpacking(number_of_items, packing_types);
								sortdump.push(initsort);
								special_excess = initsort.excess;
								
								while ( special_excess >  lowestpack) {
								   var newsort = sortpacking(special_excess, packing_types)
								   special_excess = newsort.excess;
								   sortdump.push(newsort)
								}
								var R_Types = sortdump.map( n=> n.type);
								var R_Size =  sortdump.map( n=> n.size);
							
								jQuery.each(R_Types, function(i,type){
									var thistype = type;
									var thissize = R_Size[i];
									var newprice = discount[thistype];
									sum.total_cost+=(newprice*thissize);
								});
								//var newexcess = sortdump[sortdump.length-1].excess
								special_excess = sortdump[sortdump.length-1].excess;
								//sum.total_cost+=(special_excess * p_originalglazed);	
								var newexcess = 0;
								if (special_excess>0){
									for(i=0;i<special_excess;i++){
										newexcess+=specialtyplus[i];
									}
								}
								if (settings.debug) console.log(newexcess)
								sum.total_cost+=newexcess;

							if (settings.debug) console.log("============specialty plus===================");
							if (settings.debug) console.log(sum.total_cost,sortdump,special_excess);	
					}
					
					//-------------- MINI ORIGINAL GLAZED ---------------------//
					var  m_originalglazed = parseFloat(jQuery(".liSelection[data-code='36']").attr("data-value"));
					var  p_m_originalglazed = parseFloat(jQuery(".liSelection[data-code='36']").attr("data-price"));
					var m_originalglazed_dump = [];
					var m_originalglazed_excess = 0;
					if ( m_originalglazed > 0 ){
						
						if ( m_originalglazed < 8){
							 m_originalglazed_excess = m_originalglazed;
						} else {
							var packing_types = settings.mini_packing;
							var number_of_items = m_originalglazed;
							var discount = settings.discounts.mini_original_glazed;
							
							
							var lowestpack = (packing_types[packing_types.length -1] - 1);
							var sortdump = [];
							var initsort = sortpacking(number_of_items, packing_types);
								sortdump.push(initsort);
								m_originalglazed_excess = initsort.excess;
								
								while ( m_originalglazed_excess >  lowestpack) {
								   var newsort = sortpacking(m_originalglazed_excess, packing_types)
								   m_originalglazed_excess = newsort.excess;
								   sortdump.push(newsort)
								}
								var R_Types = sortdump.map( n=> n.type);
								var R_Size =  sortdump.map( n=> n.size);
							
								jQuery.each(R_Types, function(i,type){
									var thistype = type;
									var thissize = R_Size[i];
									var newprice = discount[thistype];
									sum.total_cost+=(newprice*thissize);
								});
								//var newexcess = sortdump[sortdump.length-1].excess
								m_originalglazed_excess = sortdump[sortdump.length-1].excess;
								

							if (settings.debug) console.log("============mini original glazed===================");
							if (settings.debug) console.log(sum.total_cost,sortdump,m_originalglazed_excess);								
						}
					}
					
					//-------------- MINI ASSORTED ---------------------//
					var m_assorted 	  = [];
					var m_assorted_code = [];
					var bIsm_assorted = true;
					var m_assorted_excess = 0;
					jQuery(".liSelection[data-class='B'][data-code!='36'][data-value!='0']").each( function(){    
							var thisprice = parseFloat(jQuery(this).attr("data-price"));
							var thisunit  = parseFloat(jQuery(this).attr("data-value"));
							var thiscode  = parseInt(jQuery(this).attr("data-code"));
							
							for (i=1;i<=thisunit;i++){
								m_assorted.push(thisprice);
								m_assorted_code.push(thiscode);
							}
					});
					console.log(">>",uniq(m_assorted_code).length);
					if (m_assorted.length==0){
						sum.total_cost+=(m_originalglazed_excess * p_m_originalglazed);	
						if (settings.debug) console.log("============m original glazed(1)===================");
					    if (settings.debug) console.log(sum.total_cost,sortdump,m_originalglazed_excess,p_m_originalglazed);
					} else {
					    if ( m_originalglazed_excess >  0 ){ //m_assorted with originzal glazed
								bIsm_assorted = true;
								for(i=1;i<=m_originalglazed_excess;i++){
									m_assorted.push(p_m_originalglazed);
								}
						} else { //m_assorted codes only
							if (uniq(m_assorted_code).length > 1){bIsm_assorted = true;}
						}							
					}
					
					if ( bIsm_assorted ){
						
						if ( m_assorted.length < 8 ){
							let sam = 0;
							m_assorted.map(e => sam += e)
							sum.total_cost+=sam;
							
							if (settings.debug) console.log("============m_assorted===================");
							if (settings.debug) console.log(sum.total_cost);	
						}else{
							
							var packing_types = settings.mini_packing;
							var number_of_items = m_assorted.length;
							var discount = settings.discounts.mini_assorted;	
							
							var lowestpack = (packing_types[packing_types.length -1] - 1);
							var sortdump = [];
							var initsort = sortpacking(number_of_items, packing_types);
								sortdump.push(initsort);
								m_assorted_excess = initsort.excess;
								
								while ( m_assorted_excess >  lowestpack) {
								   var newsort = sortpacking(m_assorted_excess, packing_types)
								   m_assorted_excess = newsort.excess;
								   sortdump.push(newsort)
								}
								var R_Types = sortdump.map( n=> n.type);
								var R_Size =  sortdump.map( n=> n.size);
							
								jQuery.each(R_Types, function(i,type){
									var thistype = type;
									var thissize = R_Size[i];
									var newprice = discount[thistype];
									sum.total_cost+=(newprice*thissize);
								});
								//var newexcess = sortdump[sortdump.length-1].excess
								m_originalglazed_excess = sortdump[sortdump.length-1].excess;
								//sum.total_cost+=(m_originalglazed_excess * p_originalglazed);	
								var newexcess = 0;
								if (m_originalglazed_excess>0){
									for(i=0;i<m_originalglazed_excess;i++){
										newexcess+=m_assorted[i];
									}
								}
								sum.total_cost+=newexcess;
	
								if (settings.debug) console.log("============mini assorted===================");
							    if (settings.debug) console.log(sum.total_cost,sortdump,m_originalglazed_excess);								
						}					
					} else {
						let sam = 0;
							m_assorted.map(e => sam += e)
							sum.total_cost+=sam;
							
							if (settings.debug) console.log("============m_assorted===================");
							if (settings.debug) console.log(sum.total_cost);	
						
					}
					
					jQuery(".liSelection[data-class!='E'][data-value!='0'][data-value!='0']").each( function(){   
							var thisunit  = parseFloat(jQuery(this).attr("data-value"));					
							sum.total_number+=thisunit;
					});
			
			jQuery(".footer .tbl .total").text(sum.total_cost.toFixed(2));
		    jQuery(".footer .tbl .total_number").text(sum.total_number);
			jQuery(".footer .tbl .dozprop").text((sum.total_number/12).toFixed(2));
		}
		function onsubmit(){
		        //items
				jQuery(".menu-item.active").find(".liSelection").each( function(){
				    var thiscode = jQuery(this).data("code");
					var thisvalue = jQuery(this).attr("data-value");
					jQuery(".cm-numeric-input[data-code='"+thiscode+"']").val(thisvalue);
				});
				//total
				jQuery(".cm-numeric-input[data-code='48']").val(jQuery(".footer .tbl .total").text().replace("$",""));
				jQuery(".cm-numeric-input[data-code='49']").val(jQuery(".footer .tbl .total_number").text());
				jQuery(".cm-numeric-input[data-code='50']").val(jQuery(".footer .tbl .dozprop").text());
				//submit button
				if (settings.autonext){ jQuery("#cm-NextButton").click() }
		}
		function sortpacking(number_of_items, packing_types) {
      	var packing_details = {
      		"type": 0,
      		"size": 0,
			"excess":0,
      	};
      	jQuery.each(packing_types,function(_o,_type){
      	    if ( number_of_items >= _type ){
      	           packing_details["type"]    = _type;
      	           packing_details["size"]    = Math.floor(number_of_items/_type);
      	           packing_details["excess"]  = number_of_items%_type;
      	           return false; /*break loop*/
      	    }
      	});
    	return packing_details;
		}
		function sortpacking_v2(objArray,number_of_items, packing_types) {
			var packing_details = {
				"type": 0,
				"size": 0,
				"excess":0,
				"special":0,
			};
			jQuery.each(packing_types,function(_o,_type){
				if ( number_of_items >= _type ){
					packing_details["type"]    = _type;
					packing_details["size"]    = Math.floor(number_of_items/_type);
					packing_details["excess"]  = number_of_items%_type;
					console.log(objArray)
					for (i=0;i<_type;i++){

						if (objArray[i] > 2.09)  packing_details["special"]  += 1;
					}

					return false; /*break loop*/
				}
			});
			return packing_details;
		}
		function uniq(a) {
			return a.sort().filter(function(item, pos, ary) {
				return !pos || item != ary[pos - 1];
			});
		}

		function hideLoading() {
		  setTimeout(function() {
			var itemsLoaded = true;

			// Check that every images is regestering a height greater than 0.
			jQuery('.menu-item').each(function (index) {
			  if ($ (this).height() < 1) {
				itemsLoaded = false;
			  }
			});

			if (itemsLoaded) {
			  jQuery('.stLoading').animate({
				opacity: 0,
				
			  }, 1000, function () { $ (this).hide() });
			} else {
			  hideLoading();
			  console.error('Rerunning hideLoading(). This means a product image is missing or has a height less than 1.');
			}
		  }, 1000);
		}
    
  
}