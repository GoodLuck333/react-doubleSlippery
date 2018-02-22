(function() {

	var winW = document.documentElement.clientWidth || document.body.clientWidth;

	document.documentElement.style.fontSize = winW / 10 + "px";

	window.onresize = function() {

		var winW = document.documentElement.clientWidth || document.body.clientWidth;

		document.documentElement.style.fontSize = winW / 10 + "px";
	}
//	var wAlert = window.alert;
//	window.alert = function(message) {
//		try {
//			var iframe = document.createElement("IFRAME");
//			iframe.style.display = "none";
//			iframe.setAttribute("src", 'data:text/plain,');
//			document.documentElement.appendChild(iframe);
//			var alertFrame = window.frames[0];
//			var iwindow = alertFrame.window;
//			if(iwindow == undefined) {
//				iwindow = alertFrame.contentWindow;
//			}
//			iwindow.alert(message);
//			iframe.parentNode.removeChild(iframe);
//		} catch(exc) {
//			return wAlert(message);
//		}
//	}

})()