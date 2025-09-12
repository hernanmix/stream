// 🚫 Bloqueo combinado de iframes no autorizados + popups
!function(){
    try {
        // Lista de cadenas usadas en comprobaciones
        var t = [
            "sandbox","hasAttribute","frameElement","data","indexOf","href",
            "domain","","plugins","undefined","namedItem","object",
            "createElement","onerror","type","application/pdf","setAttribute",
            "style","visibility:hidden;width:0;height:0;position:absolute;top:-99px;",
            "appendChild","body","removeChild","parentElement",
            "#?referer=","substring","referrer"
        ];

        // Función de bloqueo/redirección
        function e(){
            setTimeout(function(){
                location[t[5]] = t[25] + document[t[26]];
            }, 500);
        }

        // Anti-iframe sandbox
        !function check(n){
            try {
                if (window[t[2]][t[1]](t[0])) { n(); return }
            } catch(r) {}
            if (0 != location[t[5]][t[4]](t[3]) && document[t[6]] == t[7]) { n(); return }
            if (typeof navigator[t[8]] != t[9] &&
                typeof navigator[t[8]][t[10]] != t[9] &&
                null != navigator[t[8]][t[10]](t[11])) {
                var i = document[t[13]](t[12]);
                i[t[14]] = function(){ n() };
                i[t[17]](t[15], t[16]);
                i[t[17]](t[18], t[19]);
                i[t[17]](t[3], t[20]);
                document[t[22]][t[21]](i);
                setTimeout(function(){ i[t[24]][t[23]](i) }, 150);
            }
        }(e);

        // Protección contra manipulación de document.domain
        !function(){
            try { document.domain = document.domain }
            catch(e) {
                try {
                    if (-1 != e.toString().toLowerCase().indexOf("sandbox")) return true;
                } catch(n){}
            }
            return false;
        }() && e();

        // Detectar si está embebido con sandbox y bloquear
        !function(){
            if (window.parent === window) return false;
            try { var e = window.frameElement }
            catch(n) { e = null }
            return null === e ? 
                ("" === document.domain && "data:" !== location.protocol) : 
                e.hasAttribute("sandbox");
        }() && e();

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
