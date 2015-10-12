(function (app, $) {
	try {
		if(!app)
			throw new Error("app module not loaded");
		if(!$)
			throw new Error("$ (JQuery) module not loaded");

		var validationModule = {
			isKeyCodeANumber: function(e){
				try {
					// Allow: backspace, delete, tab, escape, enter
			        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
			             // Allow: Ctrl+A, Command+A
			            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
			             // Allow: home, end, left, right, down, up
			            (e.keyCode >= 35 && e.keyCode <= 40)) {
			                 // let it happen, don't do anything
			                 return true;
			        }
			        // Ensure that it is a number and stop the keypress
			        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			            return false;
			        }

			        return true;
		    	}
		    	catch(error){
		    		throw error;
		    	}
			},
			isKeyCodeADecimal: function(event){
				try {
					if(this.isKeyCodeANumber(event) || event.keyCode === 110 || event.keyCode === 190)
						return true;
					return false;
				}
				catch(error) {
					throw error;
				}
				
			},
			keydown: function (sender, event) {
				try {
					var validationsStr = $(sender).attr("data-val-event-keydown"),
						validationsAry = validationsStr.split(",");

					if (!$.isArray(validationsAry))
						throw new Error("validations are not propery formatted for" + $(sender).attr("name"));

					for (var index in validationsAry) {
						var validationStr = validationsAry[index];
						switch (validationStr) {
							case "Number": 
								{
									return this.isKeyCodeANumber(event);
								}
								break;
							case "Decimal": 
								{
									return this.isKeyCodeADecimal(event);
								}
								break;
							default: return true;
								break;
						}
					}
				}
				catch(error) {
					console.error(error);
				}

				return true;
			},
			control: function(senderId, errorFun) {
				try {
					var validationsStr = $(senderId).attr("data-val-event-save"),
						validationsAry = validationsStr.split(",");

					if (!$.isArray(validationsAry))
						throw new Error("validations are not propery formatted for" + $(sender).attr("name"));;

					for (var index in validationsAry) {
						
						var validationStr = validationsAry[index]
							valueStr = $(senderId).val();
						
						if (validationStr === "Required") {
							if($.trim(valueStr) === "") {
								if(errorFun)
									errorFun( $(senderId).attr("name") + " field is required", $("div[data-val-for='"+$(senderId).attr("id")+"']"));
							}
							
						}
						else if(validationStr === "Range") { 
							//TODO: Impl Range validation
						}
					}

				}
				catch(error) {
					console.error(error);
				}

			}

		};

		app.modules["validation"] = {
			lib: validationModule,
			description: "",
			loadedOn: new Date()
		};
	}
	catch(e){
		console.error(e);
	}
})(app, $);