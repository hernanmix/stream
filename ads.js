// 🚫 Bloqueo combinado de iframes no autorizados + popups (sin redirección)
!function(){
    try {
        // Lista de cadenas usadas en comprobaciones
        var t = [
            "sandbox","hasAttribute","frameElement","data","indexOf","href",
            "domain","","plugins","undefined","namedItem","object",
            "createElement","onerror","type","application/pdf","setAttribute",
            "style","visibility:hidden;width:0;height:0;position:absolute;top:-99px;",
            "appendChild","body","removeChild","parentElement","substring","referrer"
        ];

        // 🚫 Anti-iframe sandbox (solo avisa en consola)
        !function check(){
            try {
                if (window[t[2]][t[1]](t[0])) {
                    console.warn("⚠️ Bloqueo: ejecutando dentro de sandbox iframe");
                    return;
                }
            } catch(r) {}
            if (0 != location[t[5]][t[4]](t[3]) && document[t[6]] == t[7]) {
                console.warn("⚠️ Bloqueo: carga sospechosa");
                return;
            }
        }();

        // Protección contra manipulación de document.domain
        try { document.domain = document.domain }
        catch(e) {
            try {
                if (-1 != e.toString().toLowerCase().indexOf("sandbox")) {
                    console.warn("⚠️ Bloqueo: manipulación de sandbox detectada");
                }
            } catch(n){}
        }

        // Detectar si está embebido con sandbox
        if (window.parent !== window) {
            try {
                var e = window.frameElement;
            } catch(n) { e = null }
            if (e && e.hasAttribute("sandbox")) {
                console.warn("⚠️ Bloqueo: iframe con sandbox detectado");
            }
        }

        // 🚫 Bloqueador de popups
        (function(){
            var open = window.open;
            window.open = function(url, name, specs){
                console.warn("Popup bloqueado:", url);
                return null; // No abre la ventana
            };
        })();

    } catch(n) {}
}();
