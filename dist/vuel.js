(function(v) {
	v.vuel = function(tagname, params) {
		var doc = document.currentScript.ownerDocument;
		var style = doc.querySelector('style')||false;
		style? document.head.appendChild(style): false;

		var _customElementApply = function(wrapper, params) {
			var template = doc.getElementById(tagname);

			var newhtml = template.innerHTML;
			newhtml = newhtml.replace(/<content><\/content>/g, wrapper.innerHTML);
			newhtml = newhtml.replace(/&lt;content&gt;&lt;\/content&gt;/g, wrapper.innerHTML);
			newhtml = '<div>'+newhtml+'<textarea :name="name" style="display:none;">{{ value }}</textarea></div>';
			wrapper.innerHTML = newhtml;

			// Wrapper attributes
			var attrs = {};
			for(var i in wrapper.attributes) {
				var attr = wrapper.attributes[i];
				if (typeof attr=="function") continue;
				if (!attr.name) continue;
				var value = attr.value;
				try { eval('value='+value); } catch(e) {};
				attrs[ attr.name ] = value;
			}


			// Prepare $params
			params = jQuery.extend(true, {}, params);
			if (typeof params.data=="function") params.data = params.data();
			params.data = jQuery.extend(true, params.data, attrs);


			// Create Vue
			var vueParams = jQuery.extend(true, {}, params);
			if (typeof vueParams.data == "function") {
				vueParams.data = vueParams.data();
			}
			vueParams.data = jQuery.extend(true, vueParams.data, attrs);
			vueParams.el = wrapper.children[0];
			var vm = new Vue(vueParams);

			for(var i in params.methods) {
				wrapper[i] = function() {
					return params.methods[i].apply(vm, arguments);
				};
			}
		};


		class NewElement extends HTMLElement {
			constructor() { super(); };
			createdCallback() { };
			attachedCallback() { _customElementApply(this, params); };
			detachedCallback() { };
			attributeChangedCallback(attr, oldVal, newVal) { };
		}

		// customElements.define(tagname, NewElement);
		document.registerElement(tagname, NewElement);

	};
})(Vue);
