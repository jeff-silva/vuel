function Vuel(tag, params) {
	params = typeof params=="object"? params: {};
	params.data = typeof params.data=="object"? params.data: {};
	var templateHTML = (document.currentScript? document.currentScript.ownerDocument.getElementById(tag).innerHTML: "");
	var proto = Object.create(HTMLElement.prototype);

	for(var i in (params.methods||[])) {
		proto[i] = params.methods[i];
	}

	proto.createdCallback = function() {};
	proto.attachedCallback = function() {

		if (typeof params.data.attr=="object") {
			for(var i in params.data.attr) {
				var val =(this.getAttribute(i) || params.data.attr[i]);
				try { eval('val='+val); } catch(e) {}
				params.data.attr[i] = val;
			}
		}

		if (this.getAttribute("template")) {
			templateHTML = document.getElementById( this.getAttribute("template") ).innerHTML;
		}

		templateHTML = templateHTML.replace(/\<content\>\<\/content\>/g, this.innerHTML);
		this.innerHTML = "<div>"+ templateHTML +"</div>";

		params.el = this.children[0];
		new Vue(params);
	};
	return document.registerElement(tag, {prototype: proto});
}