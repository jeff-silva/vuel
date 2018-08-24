(function(v) {
	v.vuel = function(tagname, params) {
		var doc = document.currentScript.ownerDocument;
		var style = doc.querySelector('style')||false;
		style? document.head.appendChild(style): false;

		var _customElementApply = function(wrapper, params) {
			var template = doc.getElementById(tagname);
			wrapper.innerHTML = '<div>'+ template.innerHTML +'</div>';
			params.el = wrapper.children[0];

			var paramsData = params.data;
			if (typeof params.data == "function") {
				paramsData = params.data();
			}
			paramsData = JSON.parse(JSON.stringify(paramsData));
			for(var i in paramsData) {
				var attr = wrapper.getAttribute(i)||'';
				if (attr) {
					try { eval('attr='+attr); } catch(e) {}
					paramsData[i] = attr;
				}
			}

			params.data = paramsData;
			params.methods = params.methods||{};
			for(var i in params.methods) { wrapper[i] = params.methods[i]; }
			var vm = new Vue(params);
		};


		class NewElement extends HTMLElement {
			constructor() { super(); };
			createdCallback() { };
			attachedCallback() { _customElementApply(this, params); };
			detachedCallback() { };
			attributeChangedCallback(attr, oldVal, newVal) { };
		}

		// customElements.define(tagname, NewElement);
		document.registerElement(tagname, NewElement);	};
})(Vue);
