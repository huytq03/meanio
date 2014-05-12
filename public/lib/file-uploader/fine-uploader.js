/*!
 * Fine Uploader
 *
 * Copyright 2013, Widen Enterprises, Inc. info@fineuploader.com
 *
 * Version: 4.4.0
 *
 * Homepage: http://fineuploader.com
 *
 * Repository: git://github.com/Widen/fine-uploader.git
 *
 * Licensed under GNU GPL v3, see LICENSE
 */
var qq = function (a) {
    "use strict";
    return {
        hide: function () {
            return a.style.display = "none", this
        },
        attach: function (b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c),
            function () {
                qq(a).detach(b, c)
            }
        },
        detach: function (b, c) {
            return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), this
        },
        contains: function (b) {
            return b ? a === b ? !0 : a.contains ? a.contains(b) : !! (8 & b.compareDocumentPosition(a)) : !1
        },
        insertBefore: function (b) {
            return b.parentNode.insertBefore(a, b), this
        },
        remove: function () {
            return a.parentNode.removeChild(a), this
        },
        css: function (b) {
            if (null == a.style) throw new qq.Error("Can't apply style to node as it is not on the HTMLElement prototype chain!");
            return null != b.opacity && "string" != typeof a.style.opacity && "undefined" != typeof a.filters && (b.filter = "alpha(opacity=" + Math.round(100 * b.opacity) + ")"), qq.extend(a.style, b), this
        },
        hasClass: function (b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return c.test(a.className)
        },
        addClass: function (b) {
            return qq(a).hasClass(b) || (a.className += " " + b), this
        },
        removeClass: function (b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), this
        },
        getByClass: function (b) {
            var c, d = [];
            return a.querySelectorAll ? a.querySelectorAll("." + b) : (c = a.getElementsByTagName("*"), qq.each(c, function (a, c) {
                qq(c).hasClass(b) && d.push(c)
            }), d)
        },
        children: function () {
            for (var b = [], c = a.firstChild; c;) 1 === c.nodeType && b.push(c), c = c.nextSibling;
            return b
        },
        setText: function (b) {
            return a.innerText = b, a.textContent = b, this
        },
        clearText: function () {
            return qq(a).setText("")
        },
        hasAttribute: function (b) {
            var c;
            return a.hasAttribute ? a.hasAttribute(b) ? null == /^false$/i.exec(a.getAttribute(b)) : !1 : (c = a[b], void 0 === c ? !1 : null == /^false$/i.exec(c))
        }
    }
};
! function () {
    "use strict";
    qq.log = function (a, b) {
        window.console && (b && "info" !== b ? window.console[b] ? window.console[b](a) : window.console.log("<" + b + "> " + a) : window.console.log(a))
    }, qq.isObject = function (a) {
        return a && !a.nodeType && "[object Object]" === Object.prototype.toString.call(a)
    }, qq.isFunction = function (a) {
        return "function" == typeof a
    }, qq.isArray = function (a) {
        return "[object Array]" === Object.prototype.toString.call(a) || a && window.ArrayBuffer && a.buffer && a.buffer.constructor === ArrayBuffer
    }, qq.isItemList = function (a) {
        return "[object DataTransferItemList]" === Object.prototype.toString.call(a)
    }, qq.isNodeList = function (a) {
        return "[object NodeList]" === Object.prototype.toString.call(a) || a.item && a.namedItem
    }, qq.isString = function (a) {
        return "[object String]" === Object.prototype.toString.call(a)
    }, qq.trimStr = function (a) {
        return String.prototype.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
    }, qq.format = function (a) {
        var b = Array.prototype.slice.call(arguments, 1),
            c = a,
            d = c.indexOf("{}");
        return qq.each(b, function (a, b) {
            var e = c.substring(0, d),
                f = c.substring(d + 2);
            return c = e + b + f, d = c.indexOf("{}", d + b.length), 0 > d ? !1 : void 0
        }), c
    }, qq.isFile = function (a) {
        return window.File && "[object File]" === Object.prototype.toString.call(a)
    }, qq.isFileList = function (a) {
        return window.FileList && "[object FileList]" === Object.prototype.toString.call(a)
    }, qq.isFileOrInput = function (a) {
        return qq.isFile(a) || qq.isInput(a)
    }, qq.isInput = function (a, b) {
        var c = function (a) {
            var c = a.toLowerCase();
            return b ? "file" !== c : "file" === c
        };
        return window.HTMLInputElement && "[object HTMLInputElement]" === Object.prototype.toString.call(a) && a.type && c(a.type) ? !0 : a.tagName && "input" === a.tagName.toLowerCase() && a.type && c(a.type) ? !0 : !1
    }, qq.isBlob = function (a) {
        return window.Blob && "[object Blob]" === Object.prototype.toString.call(a) ? !0 : void 0
    }, qq.isXhrUploadSupported = function () {
        var a = document.createElement("input");
        return a.type = "file", void 0 !== a.multiple && "undefined" != typeof File && "undefined" != typeof FormData && "undefined" != typeof qq.createXhrInstance().upload
    }, qq.createXhrInstance = function () {
        if (window.XMLHttpRequest) return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (a) {
            return qq.log("Neither XHR or ActiveX are supported!", "error"), null
        }
    }, qq.isFolderDropSupported = function (a) {
        return a.items && a.items[0].webkitGetAsEntry
    }, qq.isFileChunkingSupported = function () {
        return !qq.androidStock() && qq.isXhrUploadSupported() && (void 0 !== File.prototype.slice || void 0 !== File.prototype.webkitSlice || void 0 !== File.prototype.mozSlice)
    }, qq.sliceBlob = function (a, b, c) {
        var d = a.slice || a.mozSlice || a.webkitSlice;
        return d.call(a, b, c)
    }, qq.arrayBufferToHex = function (a) {
        var b = "",
            c = new Uint8Array(a);
        return qq.each(c, function (a, c) {
            var d = c.toString(16);
            d.length < 2 && (d = "0" + d), b += d
        }), b
    }, qq.readBlobToHex = function (a, b, c) {
        var d = qq.sliceBlob(a, b, b + c),
            e = new FileReader,
            f = new qq.Promise;
        return e.onload = function () {
            f.success(qq.arrayBufferToHex(e.result))
        }, e.onerror = f.failure, e.readAsArrayBuffer(d), f
    }, qq.extend = function (a, b, c) {
        return qq.each(b, function (b, d) {
            c && qq.isObject(d) ? (void 0 === a[b] && (a[b] = {}), qq.extend(a[b], d, !0)) : a[b] = d
        }), a
    }, qq.override = function (a, b) {
        var c = {}, d = b(c);
        return qq.each(d, function (b, d) {
            void 0 !== a[b] && (c[b] = a[b]), a[b] = d
        }), a
    }, qq.indexOf = function (a, b, c) {
        if (a.indexOf) return a.indexOf(b, c);
        c = c || 0;
        var d = a.length;
        for (0 > c && (c += d); d > c; c += 1)
            if (a.hasOwnProperty(c) && a[c] === b) return c;
        return -1
    }, qq.getUniqueId = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 0 | 16 * Math.random(),
                c = "x" == a ? b : 8 | 3 & b;
            return c.toString(16)
        })
    }, qq.ie = function () {
        return -1 !== navigator.userAgent.indexOf("MSIE")
    }, qq.ie7 = function () {
        return -1 !== navigator.userAgent.indexOf("MSIE 7")
    }, qq.ie10 = function () {
        return -1 !== navigator.userAgent.indexOf("MSIE 10")
    }, qq.ie11 = function () {
        return -1 !== navigator.userAgent.indexOf("Trident") && -1 !== navigator.userAgent.indexOf("rv:11")
    }, qq.safari = function () {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple")
    }, qq.chrome = function () {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google")
    }, qq.opera = function () {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Opera")
    }, qq.firefox = function () {
        return !qq.ie11() && -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor
    }, qq.windows = function () {
        return "Win32" === navigator.platform
    }, qq.android = function () {
        return -1 !== navigator.userAgent.toLowerCase().indexOf("android")
    }, qq.androidStock = function () {
        return qq.android() && navigator.userAgent.toLowerCase().indexOf("chrome") < 0
    }, qq.ios7 = function () {
        return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 7_")
    }, qq.ios = function () {
        return -1 !== navigator.userAgent.indexOf("iPad") || -1 !== navigator.userAgent.indexOf("iPod") || -1 !== navigator.userAgent.indexOf("iPhone")
    }, qq.preventDefault = function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }, qq.toElement = function () {
        var a = document.createElement("div");
        return function (b) {
            a.innerHTML = b;
            var c = a.firstChild;
            return a.removeChild(c), c
        }
    }(), qq.each = function (a, b) {
        var c, d;
        if (a)
            if (window.Storage && a.constructor === window.Storage)
                for (c = 0; c < a.length && (d = b(a.key(c), a.getItem(a.key(c))), d !== !1); c++);
            else if (qq.isArray(a) || qq.isItemList(a) || qq.isNodeList(a))
            for (c = 0; c < a.length && (d = b(c, a[c]), d !== !1); c++);
        else if (qq.isString(a))
            for (c = 0; c < a.length && (d = b(c, a.charAt(c)), d !== !1); c++);
        else
            for (c in a)
                if (Object.prototype.hasOwnProperty.call(a, c) && (d = b(c, a[c]), d === !1)) break
    }, qq.bind = function (a, b) {
        if (qq.isFunction(a)) {
            var c = Array.prototype.slice.call(arguments, 2);
            return function () {
                var d = qq.extend([], c);
                return arguments.length && (d = d.concat(Array.prototype.slice.call(arguments))), a.apply(b, d)
            }
        }
        throw new Error("first parameter must be a function!")
    }, qq.obj2url = function (a, b, c) {
        var d = [],
            e = "&",
            f = function (a, c) {
                var e = b ? /\[\]$/.test(b) ? b : b + "[" + c + "]" : c;
                "undefined" !== e && "undefined" !== c && d.push("object" == typeof a ? qq.obj2url(a, e, !0) : "[object Function]" === Object.prototype.toString.call(a) ? encodeURIComponent(e) + "=" + encodeURIComponent(a()) : encodeURIComponent(e) + "=" + encodeURIComponent(a))
            };
        return !c && b ? (e = /\?/.test(b) ? /\?$/.test(b) ? "" : "&" : "?", d.push(b), d.push(qq.obj2url(a))) : "[object Array]" === Object.prototype.toString.call(a) && "undefined" != typeof a ? qq.each(a, function (a, b) {
            f(b, a)
        }) : "undefined" != typeof a && null !== a && "object" == typeof a ? qq.each(a, function (a, b) {
            f(b, a)
        }) : d.push(encodeURIComponent(b) + "=" + encodeURIComponent(a)), b ? d.join(e) : d.join(e).replace(/^&/, "").replace(/%20/g, "+")
    }, qq.obj2FormData = function (a, b, c) {
        return b || (b = new FormData), qq.each(a, function (a, d) {
            a = c ? c + "[" + a + "]" : a, qq.isObject(d) ? qq.obj2FormData(d, b, a) : qq.isFunction(d) ? b.append(a, d()) : b.append(a, d)
        }), b
    }, qq.obj2Inputs = function (a, b) {
        var c;
        return b || (b = document.createElement("form")), qq.obj2FormData(a, {
            append: function (a, d) {
                c = document.createElement("input"), c.setAttribute("name", a), c.setAttribute("value", d), b.appendChild(c)
            }
        }), b
    }, qq.setCookie = function (a, b, c) {
        var d = new Date,
            e = "";
        c && (d.setTime(d.getTime() + 1e3 * 60 * 60 * 24 * c), e = "; expires=" + d.toGMTString()), document.cookie = a + "=" + b + e + "; path=/"
    }, qq.getCookie = function (a) {
        var b, c = a + "=",
            d = document.cookie.split(";");
        return qq.each(d, function (a, d) {
            for (var e = d;
                " " == e.charAt(0);) e = e.substring(1, e.length);
            return 0 === e.indexOf(c) ? (b = e.substring(c.length, e.length), !1) : void 0
        }), b
    }, qq.getCookieNames = function (a) {
        var b = document.cookie.split(";"),
            c = [];
        return qq.each(b, function (b, d) {
            d = qq.trimStr(d);
            var e = d.indexOf("=");
            d.match(a) && c.push(d.substr(0, e))
        }), c
    }, qq.deleteCookie = function (a) {
        qq.setCookie(a, "", -1)
    }, qq.areCookiesEnabled = function () {
        var a = 1e5 * Math.random(),
            b = "qqCookieTest:" + a;
        return qq.setCookie(b, 1), qq.getCookie(b) ? (qq.deleteCookie(b), !0) : !1
    }, qq.parseJson = function (json) {
        return window.JSON && qq.isFunction(JSON.parse) ? JSON.parse(json) : eval("(" + json + ")")
    }, qq.getExtension = function (a) {
        var b = a.lastIndexOf(".") + 1;
        return b > 0 ? a.substr(b, a.length - b) : void 0
    }, qq.getFilename = function (a) {
        return qq.isInput(a) ? a.value.replace(/.*(\/|\\)/, "") : qq.isFile(a) && null !== a.fileName && void 0 !== a.fileName ? a.fileName : a.name
    }, qq.DisposeSupport = function () {
        var a = [];
        return {
            dispose: function () {
                var b;
                do b = a.shift(), b && b(); while (b)
            },
            attach: function () {
                var a = arguments;
                this.addDisposer(qq(a[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)))
            },
            addDisposer: function (b) {
                a.push(b)
            }
        }
    }
}(),
function () {
    "use strict";
    qq.Error = function (a) {
        this.message = "[Fine Uploader " + qq.version + "] " + a
    }, qq.Error.prototype = new Error
}(), qq.version = "4.4.0", qq.supportedFeatures = function () {
    "use strict";

    function a() {
        var a, b = !0;
        try {
            a = document.createElement("input"), a.type = "file", qq(a).hide(), a.disabled && (b = !1)
        } catch (c) {
            b = !1
        }
        return b
    }

    function b() {
        return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[2][1-9]|Chrome\/[3-9][0-9]/)
    }

    function c() {
        return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[1][4-9]|Chrome\/[2-9][0-9]/)
    }

    function d() {
        if (window.XMLHttpRequest) {
            var a = qq.createXhrInstance();
            return void 0 !== a.withCredentials
        }
        return !1
    }

    function e() {
        return void 0 !== window.XDomainRequest
    }

    function f() {
        return d() ? !0 : e()
    }

    function g() {
        return void 0 !== document.createElement("input").webkitdirectory
    }
    var h, i, j, k, l, m, n, o, p, q, r, s, t, u;
    return h = a(), j = h && qq.isXhrUploadSupported(), i = j && !qq.androidStock(), k = j && b(), l = j && qq.isFileChunkingSupported(), m = j && l && qq.areCookiesEnabled(), n = j && c(), o = h && (void 0 !== window.postMessage || j), q = d(), p = e(), r = f(), s = g(), t = j && void 0 !== window.FileReader, u = function () {
        return j ? !(qq.androidStock() || qq.ios() && navigator.userAgent.indexOf("CriOS") >= 0) : !1
    }(), {
        ajaxUploading: j,
        blobUploading: i,
        canDetermineSize: j,
        chunking: l,
        deleteFileCors: r,
        deleteFileCorsXdr: p,
        deleteFileCorsXhr: q,
        fileDrop: j,
        folderDrop: k,
        folderSelection: s,
        imagePreviews: t,
        imageValidation: t,
        itemSizeValidation: j,
        pause: l,
        progressBar: u,
        resume: m,
        scaling: t && i,
        tiffPreviews: qq.safari(),
        uploading: h,
        uploadCors: o,
        uploadCustomHeaders: j,
        uploadNonMultipart: j,
        uploadViaPaste: n
    }
}(), qq.Promise = function () {
    "use strict";
    var a, b, c = [],
        d = [],
        e = [],
        f = 0;
    qq.extend(this, {
        then: function (e, g) {
            return 0 === f ? (e && c.push(e), g && d.push(g)) : -1 === f ? g && g.apply(null, b) : e && e.apply(null, a), this
        },
        done: function (c) {
            return 0 === f ? e.push(c) : c.apply(null, void 0 === b ? a : b), this
        },
        success: function () {
            return f = 1, a = arguments, c.length && qq.each(c, function (b, c) {
                c.apply(null, a)
            }), e.length && qq.each(e, function (b, c) {
                c.apply(null, a)
            }), this
        },
        failure: function () {
            return f = -1, b = arguments, d.length && qq.each(d, function (a, c) {
                c.apply(null, b)
            }), e.length && qq.each(e, function (a, c) {
                c.apply(null, b)
            }), this
        }
    })
}, qq.BlobProxy = function (a, b) {
    "use strict";
    qq.extend(this, {
        referenceBlob: a,
        create: function () {
            return b(a)
        }
    })
}, qq.UploadButton = function (a) {
    "use strict";

    function b() {
        var a = document.createElement("input");
        return a.setAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME, d), f.multiple && a.setAttribute("multiple", ""), f.folders && qq.supportedFeatures.folderSelection && a.setAttribute("webkitdirectory", ""), f.acceptFiles && a.setAttribute("accept", f.acceptFiles), a.setAttribute("type", "file"), a.setAttribute("name", f.name), qq(a).css({
            position: "absolute",
            right: 0,
            top: 0,
            fontFamily: "Arial",
            fontSize: "118px",
            margin: 0,
            padding: 0,
            cursor: "pointer",
            opacity: 0
        }), f.element.appendChild(a), e.attach(a, "change", function () {
            f.onChange(a)
        }), e.attach(a, "mouseover", function () {
            qq(f.element).addClass(f.hoverClass)
        }), e.attach(a, "mouseout", function () {
            qq(f.element).removeClass(f.hoverClass)
        }), e.attach(a, "focus", function () {
            qq(f.element).addClass(f.focusClass)
        }), e.attach(a, "blur", function () {
            qq(f.element).removeClass(f.focusClass)
        }), window.attachEvent && a.setAttribute("tabIndex", "-1"), a
    }
    var c, d, e = new qq.DisposeSupport,
        f = {
            element: null,
            multiple: !1,
            acceptFiles: null,
            folders: !1,
            name: "qqfile",
            onChange: function () {},
            hoverClass: "qq-upload-button-hover",
            focusClass: "qq-upload-button-focus"
        };
    qq.extend(f, a), d = qq.getUniqueId(), qq(f.element).css({
        position: "relative",
        overflow: "hidden",
        direction: "ltr"
    }), c = b(), qq.extend(this, {
        getInput: function () {
            return c
        },
        getButtonId: function () {
            return d
        },
        setMultiple: function (a) {
            a !== f.multiple && (a ? c.setAttribute("multiple", "") : c.removeAttribute("multiple"))
        },
        setAcceptFiles: function (a) {
            a !== f.acceptFiles && c.setAttribute("accept", a)
        },
        reset: function () {
            c.parentNode && qq(c).remove(), qq(f.element).removeClass(f.focusClass), c = b()
        }
    })
}, qq.UploadButton.BUTTON_ID_ATTR_NAME = "qq-button-id", qq.UploadData = function (a) {
    "use strict";

    function b(a) {
        if (qq.isArray(a)) {
            var b = [];
            return qq.each(a, function (a, c) {
                b.push(e[c])
            }), b
        }
        return e[a]
    }

    function c(a) {
        if (qq.isArray(a)) {
            var b = [];
            return qq.each(a, function (a, c) {
                b.push(e[f[c]])
            }), b
        }
        return e[f[a]]
    }

    function d(a) {
        var b = [],
            c = [].concat(a);
        return qq.each(c, function (a, c) {
            var d = g[c];
            void 0 !== d && qq.each(d, function (a, c) {
                b.push(e[c])
            })
        }), b
    }
    var e = [],
        f = {}, g = {};
    qq.extend(this, {
        addFile: function (b, c, d, h) {
            h = h || qq.status.SUBMITTING;
            var i = e.push({
                name: c,
                originalName: c,
                uuid: b,
                size: d,
                status: h
            }) - 1;
            return e[i].id = i, f[b] = i, void 0 === g[h] && (g[h] = []), g[h].push(i), a.onStatusChange(i, null, h), i
        },
        retrieve: function (a) {
            return qq.isObject(a) && e.length ? void 0 !== a.id ? b(a.id) : void 0 !== a.uuid ? c(a.uuid) : a.status ? d(a.status) : void 0 : qq.extend([], e, !0)
        },
        reset: function () {
            e = [], f = {}, g = {}
        },
        setStatus: function (b, c) {
            var d = e[b].status,
                f = qq.indexOf(g[d], b);
            g[d].splice(f, 1), e[b].status = c, void 0 === g[c] && (g[c] = []), g[c].push(b), a.onStatusChange(b, d, c)
        },
        uuidChanged: function (a, b) {
            var c = e[a].uuid;
            e[a].uuid = b, f[b] = a, delete f[c]
        },
        updateName: function (a, b) {
            e[a].name = b
        },
        updateSize: function (a, b) {
            e[a].size = b
        },
        setParentId: function (a, b) {
            e[a].parentId = b
        },
        setGroupIds: function (a, b) {
            e[a].groupIds = b
        }
    })
}, qq.status = {
    SUBMITTING: "submitting",
    SUBMITTED: "submitted",
    REJECTED: "rejected",
    QUEUED: "queued",
    CANCELED: "canceled",
    PAUSED: "paused",
    UPLOADING: "uploading",
    UPLOAD_RETRYING: "retrying upload",
    UPLOAD_SUCCESSFUL: "upload successful",
    UPLOAD_FAILED: "upload failed",
    DELETE_FAILED: "delete failed",
    DELETING: "deleting",
    DELETED: "deleted"
},
function () {
    "use strict";
    qq.basePublicApi = {
        log: function (a, b) {
            !this._options.debug || b && "info" !== b ? b && "info" !== b && qq.log("[Fine Uploader " + qq.version + "] " + a, b) : qq.log("[Fine Uploader " + qq.version + "] " + a)
        },
        setParams: function (a, b) {
            this._paramsStore.set(a, b)
        },
        setDeleteFileParams: function (a, b) {
            this._deleteFileParamsStore.set(a, b)
        },
        setEndpoint: function (a, b) {
            this._endpointStore.set(a, b)
        },
        getInProgress: function () {
            return this._uploadData.retrieve({
                status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED]
            }).length
        },
        getNetUploads: function () {
            return this._netUploaded
        },
        uploadStoredFiles: function () {
            var a;
            if (0 === this._storedIds.length) this._itemError("noFilesError");
            else
                for (; this._storedIds.length;) a = this._storedIds.shift(), this._uploadFile(a)
        },
        clearStoredFiles: function () {
            this._storedIds = []
        },
        retry: function (a) {
            return this._manualRetry(a)
        },
        cancel: function (a) {
            this._handler.cancel(a)
        },
        cancelAll: function () {
            var a = [],
                b = this;
            qq.extend(a, this._storedIds), qq.each(a, function (a, c) {
                b.cancel(c)
            }), this._handler.cancelAll()
        },
        reset: function () {
            this.log("Resetting uploader..."), this._handler.reset(), this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], qq.each(this._buttons, function (a, b) {
                b.reset()
            }), this._paramsStore.reset(), this._endpointStore.reset(), this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData.reset(), this._buttonIdsForFileIds = [], this._pasteHandler && this._pasteHandler.reset(), this._options.session.refreshOnReset && this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._totalProgress && this._totalProgress.reset()
        },
        addFiles: function (a, b, c) {
            var d, e, f, g = [];
            if (a) {
                for (qq.isFileList(a) || (a = [].concat(a)), d = 0; d < a.length; d += 1)
                    if (e = a[d], qq.isFileOrInput(e))
                        if (qq.isInput(e) && qq.supportedFeatures.ajaxUploading)
                            for (f = 0; f < e.files.length; f++) this._handleNewFile(e.files[f], g);
                        else this._handleNewFile(e, g);
                        else this.log(e + " is not a File or INPUT element!  Ignoring!", "warn");
                this.log("Received " + g.length + " files or inputs."), this._prepareItemsForUpload(g, b, c)
            }
        },
        addBlobs: function (a, b, c) {
            if (!qq.supportedFeatures.blobUploading) throw new qq.Error("Blob uploading is not supported in this browser!");
            if (a) {
                var d = [].concat(a),
                    e = [],
                    f = this;
                qq.each(d, function (a, b) {
                    var c;
                    qq.isBlob(b) && !qq.isFileOrInput(b) ? c = {
                        blob: b,
                        name: f._options.blobs.defaultName
                    } : qq.isObject(b) && b.blob && b.name ? c = b : f.log("addBlobs: entry at index " + a + " is not a Blob or a BlobData object", "error"), c && f._handleNewFile(c, e)
                }), this._prepareItemsForUpload(e, b, c)
            } else this.log("undefined or non-array parameter passed into addBlobs", "error")
        },
        getUuid: function (a) {
            return this._uploadData.retrieve({
                id: a
            }).uuid
        },
        setUuid: function (a, b) {
            return this._uploadData.uuidChanged(a, b)
        },
        getResumableFilesData: function () {
            return this._handler.getResumableFilesData()
        },
        getSize: function (a) {
            return this._uploadData.retrieve({
                id: a
            }).size
        },
        getName: function (a) {
            return this._uploadData.retrieve({
                id: a
            }).name
        },
        setName: function (a, b) {
            this._uploadData.updateName(a, b)
        },
        getFile: function (a) {
            return this._handler.getFile(a) || null
        },
        deleteFile: function (a) {
            return this._onSubmitDelete(a)
        },
        setDeleteFileEndpoint: function (a, b) {
            this._deleteFileEndpointStore.set(a, b)
        },
        doesExist: function (a) {
            return this._handler.isValid(a)
        },
        getUploads: function (a) {
            return this._uploadData.retrieve(a)
        },
        getButton: function (a) {
            return this._getButton(this._buttonIdsForFileIds[a])
        },
        drawThumbnail: function (a, b, c, d) {
            if (this._imageGenerator) {
                var e = this._thumbnailUrls[a],
                    f = {
                        scale: c > 0,
                        maxSize: c > 0 ? c : null
                    };
                return !d && qq.supportedFeatures.imagePreviews && (e = this.getFile(a)), null == e ? (new qq.Promise).failure(b, "File or URL not found.") : this._imageGenerator.generate(e, b, f)
            }
        },
        pauseUpload: function (a) {
            var b = this._uploadData.retrieve({
                id: a
            });
            if (!qq.supportedFeatures.pause || !this._options.chunking.enabled) return !1;
            if (qq.indexOf([qq.status.UPLOADING, qq.status.UPLOAD_RETRYING], b.status) >= 0) {
                if (this._handler.pause(a)) return this._uploadData.setStatus(a, qq.status.PAUSED), !0;
                qq.log(qq.format("Unable to pause file ID {} ({}).", a, this.getName(a)), "error")
            } else qq.log(qq.format("Ignoring pause for file ID {} ({}).  Not in progress.", a, this.getName(a)), "error");
            return !1
        },
        continueUpload: function (a) {
            var b = this._uploadData.retrieve({
                id: a
            });
            return qq.supportedFeatures.pause && this._options.chunking.enabled ? b.status === qq.status.PAUSED ? (qq.log(qq.format("Paused file ID {} ({}) will be continued.  Not paused.", a, this.getName(a))), this._uploadFile(a), !0) : (qq.log(qq.format("Ignoring continue for file ID {} ({}).  Not paused.", a, this.getName(a)), "error"), !1) : !1
        },
        getRemainingAllowedItems: function () {
            var a = this._options.validation.itemLimit;
            return a > 0 ? this._options.validation.itemLimit - this._netUploadedOrQueued : null
        },
        scaleImage: function (a, b) {
            var c = this;
            return qq.Scaler.prototype.scaleImage(a, b, {
                log: qq.bind(c.log, c),
                getFile: qq.bind(c.getFile, c),
                uploadData: c._uploadData
            })
        },
        getParentId: function (a) {
            var b = this.getUploads({
                id: a
            }),
                c = null;
            return b && void 0 !== b.parentId && (c = b.parentId), c
        }
    }, qq.basePrivateApi = {
        _initFormSupportAndParams: function () {
            this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), this._formSupport && this._formSupport.attachedToForm ? (this._paramsStore = this._createStore(this._options.request.params, this._formSupport.getFormInputsAsObject), this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && (this._options.request.endpoint = this._formSupport.newEndpoint)) : this._paramsStore = this._createStore(this._options.request.params)
        },
        _uploadFile: function (a) {
            this._handler.upload(a) || this._uploadData.setStatus(a, qq.status.QUEUED)
        },
        _refreshSessionData: function () {
            var a = this,
                b = this._options.session;
            qq.Session && null != this._options.session.endpoint && (this._session || (qq.extend(b, this._options.cors), b.log = qq.bind(this.log, this), b.addFileRecord = qq.bind(this._addCannedFile, this), this._session = new qq.Session(b)), setTimeout(function () {
                a._session.refresh().then(function (b, c) {
                    a._options.callbacks.onSessionRequestComplete(b, !0, c)
                }, function (b, c) {
                    a._options.callbacks.onSessionRequestComplete(b, !1, c)
                })
            }, 0))
        },
        _addCannedFile: function (a) {
            var b = this._uploadData.addFile(a.uuid, a.name, a.size, qq.status.UPLOAD_SUCCESSFUL);
            return a.deleteFileEndpoint && this.setDeleteFileEndpoint(a.deleteFileEndpoint, b), a.deleteFileParams && this.setDeleteFileParams(a.deleteFileParams, b), a.thumbnailUrl && (this._thumbnailUrls[b] = a.thumbnailUrl), this._netUploaded++, this._netUploadedOrQueued++, b
        },
        _handleNewFile: function (a, b) {
            var c = this,
                d = qq.getUniqueId(),
                e = -1,
                f = qq.getFilename(a),
                g = a.blob || a,
                h = this._customNewFileHandler ? this._customNewFileHandler : qq.bind(c._handleNewFileGeneric, c);
            g.size >= 0 && (e = g.size), h(g, f, d, e, b, this._options.request.uuidName, {
                uploadData: c._uploadData,
                paramsStore: c._paramsStore,
                addFileToHandler: function (a, b) {
                    c._handler.add(a, b), c._netUploadedOrQueued++, c._trackButton(a)
                }
            })
        },
        _handleNewFileGeneric: function (a, b, c, d, e) {
            var f = this._uploadData.addFile(c, b, d);
            this._handler.add(f, a), this._trackButton(f), this._netUploadedOrQueued++, e.push({
                id: f,
                file: a
            })
        },
        _trackButton: function (a) {
            var b;
            b = qq.supportedFeatures.ajaxUploading ? this._handler.getFile(a).qqButtonId : this._getButtonId(this._handler.getInput(a)), b && (this._buttonIdsForFileIds[a] = b)
        },
        _generateExtraButtonSpecs: function () {
            var a = this;
            this._extraButtonSpecs = {}, qq.each(this._options.extraButtons, function (b, c) {
                var d = c.multiple,
                    e = qq.extend({}, a._options.validation, !0),
                    f = qq.extend({}, c);
                void 0 === d && (d = a._options.multiple), f.validation && qq.extend(e, c.validation, !0), qq.extend(f, {
                    multiple: d,
                    validation: e
                }, !0), a._initExtraButton(f)
            })
        },
        _initExtraButton: function (a) {
            var b = this._createUploadButton({
                element: a.element,
                multiple: a.multiple,
                accept: a.validation.acceptFiles,
                folders: a.folders,
                allowedExtensions: a.validation.allowedExtensions
            });
            this._extraButtonSpecs[b.getButtonId()] = a
        },
        _getButtonId: function (a) {
            var b, c, d = a;
            if (d instanceof qq.BlobProxy && (d = d.referenceBlob), d && !qq.isBlob(d)) {
                if (qq.isFile(d)) return d.qqButtonId;
                if ("input" === d.tagName.toLowerCase() && "file" === d.type.toLowerCase()) return d.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                if (b = d.getElementsByTagName("input"), qq.each(b, function (a, b) {
                    return "file" === b.getAttribute("type") ? (c = b, !1) : void 0
                }), c) return c.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME)
            }
        },
        _annotateWithButtonId: function (a, b) {
            qq.isFile(a) && (a.qqButtonId = this._getButtonId(b))
        },
        _getButton: function (a) {
            var b = this._extraButtonSpecs[a];
            return b ? b.element : a === this._defaultButtonId ? this._options.button : void 0
        },
        _handleCheckedCallback: function (a) {
            var b = this,
                c = a.callback();
            return c instanceof qq.Promise ? (this.log(a.name + " - waiting for " + a.name + " promise to be fulfilled for " + a.identifier), c.then(function (c) {
                b.log(a.name + " promise success for " + a.identifier), a.onSuccess(c)
            }, function () {
                a.onFailure ? (b.log(a.name + " promise failure for " + a.identifier), a.onFailure()) : b.log(a.name + " promise failure for " + a.identifier)
            })) : (c !== !1 ? a.onSuccess(c) : a.onFailure ? (this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Invoking failure callback."), a.onFailure()) : this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Will not proceed."), c)
        },
        _createUploadButton: function (a) {
            function b() {
                return qq.supportedFeatures.ajaxUploading ? qq.ios7() && c._isAllowedExtension(e, ".mov") ? !1 : void 0 === a.multiple ? c._options.multiple : a.multiple : !1
            }
            var c = this,
                d = a.accept || this._options.validation.acceptFiles,
                e = a.allowedExtensions || this._options.validation.allowedExtensions,
                f = new qq.UploadButton({
                    element: a.element,
                    folders: a.folders,
                    name: this._options.request.inputName,
                    multiple: b(),
                    acceptFiles: d,
                    onChange: function (a) {
                        c._onInputChange(a)
                    },
                    hoverClass: this._options.classes.buttonHover,
                    focusClass: this._options.classes.buttonFocus
                });
            return this._disposeSupport.addDisposer(function () {
                f.dispose()
            }), c._buttons.push(f), f
        },
        _createUploadHandler: function (a, b) {
            var c = this,
                d = {
                    debug: this._options.debug,
                    maxConnections: this._options.maxConnections,
                    cors: this._options.cors,
                    demoMode: this._options.demoMode,
                    paramsStore: this._paramsStore,
                    endpointStore: this._endpointStore,
                    chunking: this._options.chunking,
                    resume: this._options.resume,
                    blobs: this._options.blobs,
                    log: qq.bind(c.log, c),
                    preventRetryParam: this._options.retry.preventRetryResponseProperty,
                    onProgress: function (a, b, d, e) {
                        c._onProgress(a, b, d, e), c._options.callbacks.onProgress(a, b, d, e)
                    },
                    onComplete: function (a, b, d, e) {
                        var f = c.getUploads({
                            id: a
                        }).status;
                        if (f !== qq.status.UPLOAD_SUCCESSFUL && f !== qq.status.UPLOAD_FAILED) {
                            var g = c._onComplete(a, b, d, e);
                            g instanceof qq.Promise ? g.done(function () {
                                c._options.callbacks.onComplete(a, b, d, e)
                            }) : c._options.callbacks.onComplete(a, b, d, e)
                        }
                    },
                    onCancel: function (a, b) {
                        return c._handleCheckedCallback({
                            name: "onCancel",
                            callback: qq.bind(c._options.callbacks.onCancel, c, a, b),
                            onSuccess: qq.bind(c._onCancel, c, a, b),
                            identifier: a
                        })
                    },
                    onUploadPrep: qq.bind(this._onUploadPrep, this),
                    onUpload: function (a, b) {
                        c._onUpload(a, b), c._options.callbacks.onUpload(a, b)
                    },
                    onUploadChunk: function (a, b, d) {
                        c._onUploadChunk(a, d), c._options.callbacks.onUploadChunk(a, b, d)
                    },
                    onUploadChunkSuccess: function () {
                        c._options.callbacks.onUploadChunkSuccess.apply(c, arguments)
                    },
                    onResume: function (a, b, d) {
                        return c._options.callbacks.onResume(a, b, d)
                    },
                    onAutoRetry: function () {
                        return c._onAutoRetry.apply(c, arguments)
                    },
                    onUuidChanged: function (a, b) {
                        c.log("Server requested UUID change from '" + c.getUuid(a) + "' to '" + b + "'"), c.setUuid(a, b)
                    },
                    getName: qq.bind(c.getName, c),
                    getUuid: qq.bind(c.getUuid, c),
                    getSize: qq.bind(c.getSize, c),
                    setSize: qq.bind(c._setSize, c),
                    getDataByUuid: function (a) {
                        return c.getUploads({
                            uuid: a
                        })
                    },
                    isQueued: function (a) {
                        var b = c.getUploads({
                            id: a
                        }).status;
                        return b === qq.status.QUEUED || b === qq.status.SUBMITTED || b === qq.status.UPLOAD_RETRYING || b === qq.status.PAUSED
                    },
                    getIdsInGroup: function (a) {
                        return c.getUploads({
                            id: a
                        }).groupIds
                    }
                };
            return qq.each(this._options.request, function (a, b) {
                d[a] = b
            }), a && qq.each(a, function (a, b) {
                d[a] = b
            }), new qq.UploadHandler(d, b)
        },
        _createDeleteHandler: function () {
            var a = this;
            return new qq.DeleteFileAjaxRequester({
                method: this._options.deleteFile.method.toUpperCase(),
                maxConnections: this._options.maxConnections,
                uuidParamName: this._options.request.uuidName,
                customHeaders: this._options.deleteFile.customHeaders,
                paramsStore: this._deleteFileParamsStore,
                endpointStore: this._deleteFileEndpointStore,
                demoMode: this._options.demoMode,
                cors: this._options.cors,
                log: qq.bind(a.log, a),
                onDelete: function (b) {
                    a._onDelete(b), a._options.callbacks.onDelete(b)
                },
                onDeleteComplete: function (b, c, d) {
                    a._onDeleteComplete(b, c, d), a._options.callbacks.onDeleteComplete(b, c, d)
                }
            })
        },
        _createPasteHandler: function () {
            var a = this;
            return new qq.PasteSupport({
                targetElement: this._options.paste.targetElement,
                callbacks: {
                    log: qq.bind(a.log, a),
                    pasteReceived: function (b) {
                        a._handleCheckedCallback({
                            name: "onPasteReceived",
                            callback: qq.bind(a._options.callbacks.onPasteReceived, a, b),
                            onSuccess: qq.bind(a._handlePasteSuccess, a, b),
                            identifier: "pasted image"
                        })
                    }
                }
            })
        },
        _createUploadDataTracker: function () {
            var a = this;
            return new qq.UploadData({
                getName: function (b) {
                    return a.getName(b)
                },
                getUuid: function (b) {
                    return a.getUuid(b)
                },
                getSize: function (b) {
                    return a.getSize(b)
                },
                onStatusChange: function (b, c, d) {
                    a._onUploadStatusChange(b, c, d), a._options.callbacks.onStatusChange(b, c, d), a._maybeAllComplete(b, d), a._totalProgress && setTimeout(function () {
                        a._totalProgress.onStatusChange(b, c, d)
                    }, 0)
                }
            })
        },
        _onUploadStatusChange: function (a, b, c) {
            c === qq.status.PAUSED && clearTimeout(this._retryTimeouts[a])
        },
        _handlePasteSuccess: function (a, b) {
            var c = a.type.split("/")[1],
                d = b;
            null == d && (d = this._options.paste.defaultName), d += "." + c, this.addBlobs({
                name: d,
                blob: a
            })
        },
        _preventLeaveInProgress: function () {
            var a = this;
            this._disposeSupport.attach(window, "beforeunload", function (b) {
                return a.getInProgress() ? (b = b || window.event, b.returnValue = a._options.messages.onLeave, a._options.messages.onLeave) : void 0
            })
        },
        _onSubmit: function () {},
        _onProgress: function (a, b, c, d) {
            this._totalProgress && this._totalProgress.onIndividualProgress(a, c, d)
        },
        _onTotalProgress: function (a, b) {
            this._options.callbacks.onTotalProgress(a, b)
        },
        _onComplete: function (a, b, c, d) {
            return c.success ? (c.thumbnailUrl && (this._thumbnailUrls[a] = c.thumbnailUrl), this._netUploaded++, this._uploadData.setStatus(a, qq.status.UPLOAD_SUCCESSFUL)) : (this._netUploadedOrQueued--, this._uploadData.setStatus(a, qq.status.UPLOAD_FAILED), c[this._options.retry.preventRetryResponseProperty] === !0 && (this._preventRetries[a] = !0)), this._maybeParseAndSendUploadError(a, b, c, d), c.success ? !0 : !1
        },
        _maybeAllComplete: function (a, b) {
            var c = this,
                d = this._getNotFinished();
            b === qq.status.UPLOAD_SUCCESSFUL ? this._succeededSinceLastAllComplete.push(a) : b === qq.status.UPLOAD_FAILED && this._failedSinceLastAllComplete.push(a), 0 === d && (this._succeededSinceLastAllComplete.length || this._failedSinceLastAllComplete.length) && setTimeout(function () {
                c._onAllComplete(c._succeededSinceLastAllComplete, c._failedSinceLastAllComplete)
            }, 0)
        },
        _getNotFinished: function () {
            return this._uploadData.retrieve({
                status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED, qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED]
            }).length
        },
        _onAllComplete: function (a, b) {
            this._totalProgress && this._totalProgress.onAllComplete(a, b, this._preventRetries), this._options.callbacks.onAllComplete(qq.extend([], a), qq.extend([], b)), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = []
        },
        _onCancel: function (a) {
            this._netUploadedOrQueued--, clearTimeout(this._retryTimeouts[a]);
            var b = qq.indexOf(this._storedIds, a);
            !this._options.autoUpload && b >= 0 && this._storedIds.splice(b, 1), this._uploadData.setStatus(a, qq.status.CANCELED)
        },
        _isDeletePossible: function () {
            return qq.DeleteFileAjaxRequester && this._options.deleteFile.enabled ? this._options.cors.expected ? qq.supportedFeatures.deleteFileCorsXhr ? !0 : qq.supportedFeatures.deleteFileCorsXdr && this._options.cors.allowXdr ? !0 : !1 : !0 : !1
        },
        _onSubmitDelete: function (a, b, c) {
            var d, e = this.getUuid(a);
            return b && (d = qq.bind(b, this, a, e, c)), this._isDeletePossible() ? (this._handleCheckedCallback({
                name: "onSubmitDelete",
                callback: qq.bind(this._options.callbacks.onSubmitDelete, this, a),
                onSuccess: d || qq.bind(this._deleteHandler.sendDelete, this, a, e, c),
                identifier: a
            }), !0) : (this.log("Delete request ignored for ID " + a + ", delete feature is disabled or request not possible " + "due to CORS on a user agent that does not support pre-flighting.", "warn"), !1)
        },
        _onDelete: function (a) {
            this._uploadData.setStatus(a, qq.status.DELETING)
        },
        _onDeleteComplete: function (a, b, c) {
            var d = this.getName(a);
            c ? (this._uploadData.setStatus(a, qq.status.DELETE_FAILED), this.log("Delete request for '" + d + "' has failed.", "error"), void 0 === b.withCredentials ? this._options.callbacks.onError(a, d, "Delete request failed", b) : this._options.callbacks.onError(a, d, "Delete request failed with response code " + b.status, b)) : (this._netUploadedOrQueued--, this._netUploaded--, this._handler.expunge(a), this._uploadData.setStatus(a, qq.status.DELETED), this.log("Delete request for '" + d + "' has succeeded."))
        },
        _onUploadPrep: function () {},
        _onUpload: function (a) {
            this._uploadData.setStatus(a, qq.status.UPLOADING)
        },
        _onUploadChunk: function () {},
        _onInputChange: function (a) {
            var b;
            if (qq.supportedFeatures.ajaxUploading) {
                for (b = 0; b < a.files.length; b++) this._annotateWithButtonId(a.files[b], a);
                this.addFiles(a.files)
            } else a.value.length > 0 && this.addFiles(a);
            qq.each(this._buttons, function (a, b) {
                b.reset()
            })
        },
        _onBeforeAutoRetry: function (a, b) {
            this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + b + "...")
        },
        _onAutoRetry: function (a, b, c, d, e) {
            var f = this;
            return f._preventRetries[a] = c[f._options.retry.preventRetryResponseProperty], f._shouldAutoRetry(a, b, c) ? (f._maybeParseAndSendUploadError.apply(f, arguments), f._options.callbacks.onAutoRetry(a, b, f._autoRetries[a] + 1), f._onBeforeAutoRetry(a, b), f._retryTimeouts[a] = setTimeout(function () {
                f.log("Retrying " + b + "..."), f._autoRetries[a]++, f._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), e ? e(a) : f._handler.retry(a)
            }, 1e3 * f._options.retry.autoAttemptDelay), !0) : void 0
        },
        _shouldAutoRetry: function (a) {
            var b = this._uploadData.retrieve({
                id: a
            });
            return !this._preventRetries[a] && this._options.retry.enableAuto && b.status !== qq.status.PAUSED ? (void 0 === this._autoRetries[a] && (this._autoRetries[a] = 0), this._autoRetries[a] < this._options.retry.maxAutoAttempts) : !1
        },
        _onBeforeManualRetry: function (a) {
            var b = this._options.validation.itemLimit;
            if (this._preventRetries[a]) return this.log("Retries are forbidden for id " + a, "warn"), !1;
            if (this._handler.isValid(a)) {
                var c = this.getName(a);
                return this._options.callbacks.onManualRetry(a, c) === !1 ? !1 : b > 0 && this._netUploadedOrQueued + 1 > b ? (this._itemError("retryFailTooManyItems"), !1) : (this.log("Retrying upload for '" + c + "' (id: " + a + ")..."), !0)
            }
            return this.log("'" + a + "' is not a valid file ID", "error"), !1
        },
        _manualRetry: function (a, b) {
            return this._onBeforeManualRetry(a) ? (this._netUploadedOrQueued++, this._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), b ? b(a) : this._handler.retry(a), !0) : void 0
        },
        _maybeParseAndSendUploadError: function (a, b, c, d) {
            if (!c.success)
                if (d && 200 !== d.status && !c.error) this._options.callbacks.onError(a, b, "XHR returned response code " + d.status, d);
                else {
                    var e = c.error ? c.error : this._options.text.defaultResponseError;
                    this._options.callbacks.onError(a, b, e, d)
                }
        },
        _prepareItemsForUpload: function (a, b, c) {
            if (0 === a.length) return this._itemError("noFilesError"), void 0;
            var d = this._getValidationDescriptors(a),
                e = this._getButtonId(a[0].file),
                f = this._getButton(e);
            this._handleCheckedCallback({
                name: "onValidateBatch",
                callback: qq.bind(this._options.callbacks.onValidateBatch, this, d, f),
                onSuccess: qq.bind(this._onValidateBatchCallbackSuccess, this, d, a, b, c, f),
                onFailure: qq.bind(this._onValidateBatchCallbackFailure, this, a),
                identifier: "batch validation"
            })
        },
        _upload: function (a, b, c) {
            var d = this.getName(a);
            b && this.setParams(b, a), c && this.setEndpoint(c, a), this._handleCheckedCallback({
                name: "onSubmit",
                callback: qq.bind(this._options.callbacks.onSubmit, this, a, d),
                onSuccess: qq.bind(this._onSubmitCallbackSuccess, this, a, d),
                onFailure: qq.bind(this._fileOrBlobRejected, this, a, d),
                identifier: a
            })
        },
        _onSubmitCallbackSuccess: function (a) {
            this._onSubmit.apply(this, arguments), this._uploadData.setStatus(a, qq.status.SUBMITTED), this._onSubmitted.apply(this, arguments), this._options.callbacks.onSubmitted.apply(this, arguments), this._options.autoUpload ? this._uploadFile(a) : this._storeForLater(a)
        },
        _onSubmitted: function () {},
        _storeForLater: function (a) {
            this._storedIds.push(a)
        },
        _onValidateBatchCallbackSuccess: function (a, b, c, d, e) {
            var f, g = this._options.validation.itemLimit,
                h = this._netUploadedOrQueued;
            0 === g || g >= h ? b.length > 0 ? this._handleCheckedCallback({
                name: "onValidate",
                callback: qq.bind(this._options.callbacks.onValidate, this, a[0], e),
                onSuccess: qq.bind(this._onValidateCallbackSuccess, this, b, 0, c, d),
                onFailure: qq.bind(this._onValidateCallbackFailure, this, b, 0, c, d),
                identifier: "Item '" + b[0].file.name + "', size: " + b[0].file.size
            }) : this._itemError("noFilesError") : (this._onValidateBatchCallbackFailure(b), f = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, h).replace(/\{itemLimit\}/g, g), this._batchError(f))
        },
        _onValidateBatchCallbackFailure: function (a) {
            var b = this;
            qq.each(a, function (a, c) {
                b._fileOrBlobRejected(c.id)
            })
        },
        _onValidateCallbackSuccess: function (a, b, c, d) {
            var e = this,
                f = b + 1,
                g = this._getValidationDescriptor(a[b]);
            this._validateFileOrBlobData(a[b], g).then(function () {
                e._upload(a[b].id, c, d), e._maybeProcessNextItemAfterOnValidateCallback(!0, a, f, c, d)
            }, function () {
                e._maybeProcessNextItemAfterOnValidateCallback(!1, a, f, c, d)
            })
        },
        _onValidateCallbackFailure: function (a, b, c, d) {
            var e = b + 1;
            this._fileOrBlobRejected(a[0].id, a[0].file.name), this._maybeProcessNextItemAfterOnValidateCallback(!1, a, e, c, d)
        },
        _maybeProcessNextItemAfterOnValidateCallback: function (a, b, c, d, e) {
            var f = this;
            if (b.length > c)
                if (a || !this._options.validation.stopOnFirstInvalidFile) setTimeout(function () {
                    var a = f._getValidationDescriptor(b[c]);
                    f._handleCheckedCallback({
                        name: "onValidate",
                        callback: qq.bind(f._options.callbacks.onValidate, f, b[c].file),
                        onSuccess: qq.bind(f._onValidateCallbackSuccess, f, b, c, d, e),
                        onFailure: qq.bind(f._onValidateCallbackFailure, f, b, c, d, e),
                        identifier: "Item '" + a.name + "', size: " + a.size
                    })
                }, 0);
                else if (!a)
                for (; c < b.length; c++) f._fileOrBlobRejected(b[c].id)
        },
        _validateFileOrBlobData: function (a, b) {
            var c = this,
                d = function () {
                    return a.file instanceof qq.BlobProxy ? a.file.referenceBlob : a.file
                }(),
                e = b.name,
                f = b.size,
                g = this._getButtonId(a.file),
                h = this._getValidationBase(g),
                i = new qq.Promise;
            return i.then(function () {}, function () {
                c._fileOrBlobRejected(a.id, e)
            }), qq.isFileOrInput(d) && !this._isAllowedExtension(h.allowedExtensions, e) ? (this._itemError("typeError", e, d), i.failure()) : 0 === f ? (this._itemError("emptyError", e, d), i.failure()) : f && h.sizeLimit && f > h.sizeLimit ? (this._itemError("sizeError", e, d), i.failure()) : f && f < h.minSizeLimit ? (this._itemError("minSizeError", e, d), i.failure()) : (qq.ImageValidation && qq.supportedFeatures.imagePreviews && qq.isFile(d) ? new qq.ImageValidation(d, qq.bind(c.log, c)).validate(h.image).then(i.success, function (a) {
                c._itemError(a + "ImageError", e, d), i.failure()
            }) : i.success(), i)
        },
        _fileOrBlobRejected: function (a) {
            this._netUploadedOrQueued--, this._uploadData.setStatus(a, qq.status.REJECTED)
        },
        _itemError: function (a, b, c) {
            function d(a, b) {
                g = g.replace(a, b)
            }
            var e, f, g = this._options.messages[a],
                h = [],
                i = [].concat(b),
                j = i[0],
                k = this._getButtonId(c),
                l = this._getValidationBase(k);
            return qq.each(l.allowedExtensions, function (a, b) {
                qq.isString(b) && h.push(b)
            }), e = h.join(", ").toLowerCase(), d("{file}", this._options.formatFileName(j)), d("{extensions}", e), d("{sizeLimit}", this._formatSize(l.sizeLimit)), d("{minSizeLimit}", this._formatSize(l.minSizeLimit)), f = g.match(/(\{\w+\})/g), null !== f && qq.each(f, function (a, b) {
                d(b, i[a])
            }), this._options.callbacks.onError(null, j, g, void 0), g
        },
        _batchError: function (a) {
            this._options.callbacks.onError(null, null, a, void 0)
        },
        _isAllowedExtension: function (a, b) {
            var c = !1;
            return a.length ? (qq.each(a, function (a, d) {
                if (qq.isString(d)) {
                    var e = new RegExp("\\." + d + "$", "i");
                    if (null != b.match(e)) return c = !0, !1
                }
            }), c) : !0
        },
        _formatSize: function (a) {
            var b = -1;
            do a /= 1e3, b++; while (a > 999);
            return Math.max(a, .1).toFixed(1) + this._options.text.sizeSymbols[b]
        },
        _wrapCallbacks: function () {
            var a, b;
            a = this, b = function (b, c, d) {
                var e;
                try {
                    return c.apply(a, d)
                } catch (f) {
                    e = f.message || f.toString(), a.log("Caught exception in '" + b + "' callback - " + e, "error")
                }
            };
            for (var c in this._options.callbacks)! function () {
                var d, e;
                d = c, e = a._options.callbacks[d], a._options.callbacks[d] = function () {
                    return b(d, e, arguments)
                }
            }()
        },
        _getValidationDescriptors: function (a) {
            var b = this,
                c = [];
            return qq.each(a, function (a, d) {
                c.push(b._getValidationDescriptor(d))
            }), c
        },
        _getValidationDescriptor: function (a) {
            return a.file instanceof qq.BlobProxy ? {
                name: qq.getFilename(a.file.referenceBlob),
                size: a.file.referenceBlob.size
            } : {
                name: this.getUploads({
                    id: a.id
                }).name,
                size: this.getUploads({
                    id: a.id
                }).size
            }
        },
        _createStore: function (a, b) {
            var c = {}, d = a,
                e = {}, f = function (a) {
                    return qq.isObject(a) ? qq.extend({}, a) : a
                }, g = function () {
                    return qq.isFunction(b) ? b() : b
                }, h = function (a, c) {
                    b && qq.isObject(c) && qq.extend(c, g()), e[a] && qq.extend(c, e[a])
                };
            return {
                set: function (a, b) {
                    null == b ? (c = {}, d = f(a)) : c[b] = f(a)
                },
                get: function (a) {
                    var b;
                    return b = null != a && c[a] ? c[a] : f(d), h(a, b), f(b)
                },
                addReadOnly: function (a, b) {
                    qq.isObject(c) && (e[a] = e[a] || {}, qq.extend(e[a], b))
                },
                remove: function (a) {
                    return delete c[a]
                },
                reset: function () {
                    c = {}, e = {}, d = a
                }
            }
        },
        _handleCameraAccess: function () {
            if (this._options.camera.ios && qq.ios()) {
                var a = "image/*;capture=camera",
                    b = this._options.camera.button,
                    c = b ? this._getButtonId(b) : this._defaultButtonId,
                    d = this._options;
                c && c !== this._defaultButtonId && (d = this._extraButtonSpecs[c]), d.multiple = !1, null === d.validation.acceptFiles ? d.validation.acceptFiles = a : d.validation.acceptFiles += "," + a, qq.each(this._buttons, function (a, b) {
                    return b.getButtonId() === c ? (b.setMultiple(d.multiple), b.setAcceptFiles(d.acceptFiles), !1) : void 0
                })
            }
        },
        _getValidationBase: function (a) {
            var b = this._extraButtonSpecs[a];
            return b ? b.validation : this._options.validation
        },
        _setSize: function (a, b) {
            this._uploadData.updateSize(a, b), this._totalProgress && this._totalProgress.onNewSize(a)
        }
    }
}(),
function () {
    "use strict";
    qq.FineUploaderBasic = function (a) {
        var b = this;
        this._options = {
            debug: !1,
            button: null,
            multiple: !0,
            maxConnections: 3,
            disableCancelForFormUploads: !1,
            autoUpload: !0,
            request: {
                endpoint: "/server/upload",
                params: {},
                paramsInBody: !0,
                customHeaders: {},
                forceMultipart: !0,
                inputName: "qqfile",
                uuidName: "qquuid",
                totalFileSizeName: "qqtotalfilesize",
                filenameParam: "qqfilename"
            },
            validation: {
                allowedExtensions: [],
                sizeLimit: 0,
                minSizeLimit: 0,
                itemLimit: 0,
                stopOnFirstInvalidFile: !0,
                acceptFiles: null,
                image: {
                    maxHeight: 0,
                    maxWidth: 0,
                    minHeight: 0,
                    minWidth: 0
                }
            },
            callbacks: {
                onSubmit: function () {},
                onSubmitted: function () {},
                onComplete: function () {},
                onAllComplete: function () {},
                onCancel: function () {},
                onUpload: function () {},
                onUploadChunk: function () {},
                onUploadChunkSuccess: function () {},
                onResume: function () {},
                onProgress: function () {},
                onTotalProgress: function () {},
                onError: function () {},
                onAutoRetry: function () {},
                onManualRetry: function () {},
                onValidateBatch: function () {},
                onValidate: function () {},
                onSubmitDelete: function () {},
                onDelete: function () {},
                onDeleteComplete: function () {},
                onPasteReceived: function () {},
                onStatusChange: function () {},
                onSessionRequestComplete: function () {}
            },
            messages: {
                typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
                sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
                minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
                emptyError: "{file} is empty, please select files again without it.",
                noFilesError: "No files to upload.",
                tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
                maxHeightImageError: "Image is too tall.",
                maxWidthImageError: "Image is too wide.",
                minHeightImageError: "Image is not tall enough.",
                minWidthImageError: "Image is not wide enough.",
                retryFailTooManyItems: "Retry failed - you have reached your file limit.",
                onLeave: "The files are being uploaded, if you leave now the upload will be canceled."
            },
            retry: {
                enableAuto: !1,
                maxAutoAttempts: 3,
                autoAttemptDelay: 5,
                preventRetryResponseProperty: "preventRetry"
            },
            classes: {
                buttonHover: "qq-upload-button-hover",
                buttonFocus: "qq-upload-button-focus"
            },
            chunking: {
                enabled: !1,
                partSize: 2e6,
                paramNames: {
                    partIndex: "qqpartindex",
                    partByteOffset: "qqpartbyteoffset",
                    chunkSize: "qqchunksize",
                    totalFileSize: "qqtotalfilesize",
                    totalParts: "qqtotalparts"
                }
            },
            resume: {
                enabled: !1,
                id: null,
                cookiesExpireIn: 7,
                paramNames: {
                    resuming: "qqresume"
                }
            },
            formatFileName: function (a) {
                return void 0 !== a && a.length > 33 && (a = a.slice(0, 19) + "..." + a.slice(-14)), a
            },
            text: {
                defaultResponseError: "Upload failure reason unknown",
                sizeSymbols: ["kB", "MB", "GB", "TB", "PB", "EB"]
            },
            deleteFile: {
                enabled: !1,
                method: "DELETE",
                endpoint: "/server/upload",
                customHeaders: {},
                params: {}
            },
            cors: {
                expected: !1,
                sendCredentials: !1,
                allowXdr: !1
            },
            blobs: {
                defaultName: "misc_data"
            },
            paste: {
                targetElement: null,
                defaultName: "pasted_image"
            },
            camera: {
                ios: !1,
                button: null
            },
            extraButtons: [],
            session: {
                endpoint: null,
                params: {},
                customHeaders: {},
                refreshOnReset: !0
            },
            form: {
                element: "qq-form",
                autoUpload: !1,
                interceptSubmit: !0
            },
            scaling: {
                sendOriginal: !0,
                orient: !0,
                defaultType: null,
                defaultQuality: 80,
                failureText: "Failed to scale",
                includeExif: !1,
                sizes: []
            }
        }, qq.extend(this._options, a, !0), this._buttons = [], this._extraButtonSpecs = {}, this._buttonIdsForFileIds = [], this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport, this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData = this._createUploadDataTracker(), this._initFormSupportAndParams(), this._deleteFileParamsStore = this._createStore(this._options.deleteFile.params), this._endpointStore = this._createStore(this._options.request.endpoint), this._deleteFileEndpointStore = this._createStore(this._options.deleteFile.endpoint), this._handler = this._createUploadHandler(), this._deleteHandler = qq.DeleteFileAjaxRequester && this._createDeleteHandler(), this._options.button && (this._defaultButtonId = this._createUploadButton({
            element: this._options.button
        }).getButtonId()), this._generateExtraButtonSpecs(), this._handleCameraAccess(), this._options.paste.targetElement && (qq.PasteSupport ? this._pasteHandler = this._createPasteHandler() : qq.log("Paste support module not found", "info")), this._preventLeaveInProgress(), this._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(this.log, this)), this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._scaler = qq.Scaler && new qq.Scaler(this._options.scaling, qq.bind(this.log, this)) || {}, this._scaler.enabled && (this._customNewFileHandler = qq.bind(this._scaler.handleNewFile, this._scaler)), qq.TotalProgress && qq.supportedFeatures.progressBar && (this._totalProgress = new qq.TotalProgress(qq.bind(this._onTotalProgress, this), function (a) {
            var c = b._uploadData.retrieve({
                id: a
            });
            return c && c.size || 0
        }))
    }, qq.FineUploaderBasic.prototype = qq.basePublicApi, qq.extend(qq.FineUploaderBasic.prototype, qq.basePrivateApi)
}(), qq.AjaxRequester = function (a) {
    "use strict";

    function b() {
        return qq.indexOf(["GET", "POST", "HEAD"], w.method) >= 0
    }

    function c() {
        var a = !1;
        return qq.each(a, function (b, c) {
            return qq.indexOf(["Accept", "Accept-Language", "Content-Language", "Content-Type"], c) < 0 ? (a = !0, !1) : void 0
        }), a
    }

    function d(a) {
        return w.cors.expected && void 0 === a.withCredentials
    }

    function e() {
        var a;
        return (window.XMLHttpRequest || window.ActiveXObject) && (a = qq.createXhrInstance(), void 0 === a.withCredentials && (a = new XDomainRequest)), a
    }

    function f(a, b) {
        var c = v[a].xhr;
        return c || b || (c = w.cors.expected ? e() : qq.createXhrInstance(), v[a].xhr = c), c
    }

    function g(a) {
        var b, c = qq.indexOf(u, a),
            d = w.maxConnections;
        delete v[a], u.splice(c, 1), u.length >= d && d > c && (b = u[d - 1], j(b))
    }

    function h(a, b) {
        var c = f(a),
            e = w.method,
            h = b === !0;
        g(a), h ? s(e + " request for " + a + " has failed", "error") : d(c) || q(c.status) || (h = !0, s(e + " request for " + a + " has failed - response code " + c.status, "error")), w.onComplete(a, c, h)
    }

    function i(a) {
        var b, c = v[a].additionalParams,
            d = w.mandatedParams;
        return w.paramsStore.get && (b = w.paramsStore.get(a)), c && qq.each(c, function (a, c) {
            b = b || {}, b[a] = c
        }), d && qq.each(d, function (a, c) {
            b = b || {}, b[a] = c
        }), b
    }

    function j(a) {
        var b, c = f(a),
            e = w.method,
            g = i(a),
            h = v[a].payload;
        return w.onSend(a), b = k(a, g), d(c) ? (c.onload = n(a), c.onerror = o(a)) : c.onreadystatechange = l(a), m(a), c.open(e, b, !0), w.cors.expected && w.cors.sendCredentials && !d(c) && (c.withCredentials = !0), p(a), s("Sending " + e + " request for " + a), h ? c.send(h) : t || !g ? c.send() : g && w.contentType && w.contentType.toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0 ? c.send(qq.obj2url(g, "")) : g && w.contentType && w.contentType.toLowerCase().indexOf("application/json") >= 0 ? c.send(JSON.stringify(g)) : c.send(g), c
    }

    function k(a, b) {
        var c = w.endpointStore.get(a),
            d = v[a].addToPath;
        return void 0 != d && (c += "/" + d), t && b ? qq.obj2url(b, c) : c
    }

    function l(a) {
        return function () {
            4 === f(a).readyState && h(a)
        }
    }

    function m(a) {
        var b = w.onProgress;
        b && (f(a).upload.onprogress = function (c) {
            c.lengthComputable && b(a, c.loaded, c.total)
        })
    }

    function n(a) {
        return function () {
            h(a)
        }
    }

    function o(a) {
        return function () {
            h(a, !0)
        }
    }

    function p(a) {
        var e = f(a),
            g = w.customHeaders,
            h = v[a].additionalHeaders || {}, i = w.method,
            j = {};
        d(e) || (w.allowXRequestedWithAndCacheControl && (w.cors.expected && b() && !c(g) || (e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.setRequestHeader("Cache-Control", "no-cache"))), !w.contentType || "POST" !== i && "PUT" !== i || e.setRequestHeader("Content-Type", w.contentType), qq.extend(j, qq.isFunction(g) ? g(a) : g), qq.extend(j, h), qq.each(j, function (a, b) {
            e.setRequestHeader(a, b)
        }))
    }

    function q(a) {
        return qq.indexOf(w.successfulResponseCodes[w.method], a) >= 0
    }

    function r(a, b, c, d, e) {
        v[a] = {
            addToPath: b,
            additionalParams: c,
            additionalHeaders: d,
            payload: e
        };
        var f = u.push(a);
        return f <= w.maxConnections ? j(a) : void 0
    }
    var s, t, u = [],
        v = {}, w = {
            validMethods: ["POST"],
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            maxConnections: 3,
            customHeaders: {},
            endpointStore: {},
            paramsStore: {},
            mandatedParams: {},
            allowXRequestedWithAndCacheControl: !0,
            successfulResponseCodes: {
                DELETE: [200, 202, 204],
                POST: [200, 204],
                GET: [200]
            },
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function () {},
            onSend: function () {},
            onComplete: function () {},
            onProgress: null
        };
    if (qq.extend(w, a), s = w.log, qq.indexOf(w.validMethods, w.method) < 0) throw new Error("'" + w.method + "' is not a supported method for this type of request!");
    t = "GET" === w.method || "DELETE" === w.method, qq.extend(this, {
        initTransport: function (a) {
            var b, c, d, e, f;
            return {
                withPath: function (a) {
                    return b = a, this
                },
                withParams: function (a) {
                    return c = a, this
                },
                withHeaders: function (a) {
                    return d = a, this
                },
                withPayload: function (a) {
                    return e = a, this
                },
                withCacheBuster: function () {
                    return f = !0, this
                },
                send: function () {
                    return f && qq.indexOf(["GET", "DELETE"], w.method) >= 0 && (c.qqtimestamp = (new Date).getTime()), r(a, b, c, d, e)
                }
            }
        },
        canceled: function (a) {
            g(a)
        }
    })
}, qq.UploadHandler = function (a, b) {
    "use strict";

    function c(a) {
        return o.getProxy && o.getProxy(a) || o.getFile && o.getFile(a)
    }

    function d(a) {
        return !!o.getFile(a)
    }

    function e(a) {
        return m.isQueued(a)
    }

    function f(a) {
        var b = m.getIdsInGroup(a),
            c = !1;
        return b && b.length ? (n("Maybe ready to upload grouped file " + a), qq.each(b, function (b, f) {
            if (e(f) && d(f)) c = f === a, o.upload(f);
            else if (e(f)) return !1
        })) : (c = !0, o.upload(a)), c
    }

    function g(a, b) {
        return b && !o.getFile(a) && b instanceof qq.BlobProxy ? (m.onUploadPrep(a), n("Attempting to generate a blob on-demand for " + a), b.create().then(function (b) {
            n("Generated an on-demand blob for " + a), o.updateBlob(a, b), m.setSize(a, b.size), o.reevaluateChunking(a), f(a)
        }, function (b) {
            var c = {};
            b && (c.error = b), n(qq.format("Failed to generate scaled version for ID {}.  Error message: {}.", a, b), "error"), m.onComplete(a, m.getName(a), qq.extend(c, l), null), f(a), i(a)
        }), !1) : f(a)
    }

    function h(a) {
        var b = c(a);
        return b ? g(a, b) : (o.upload(a), !0)
    }

    function i(a) {
        var b, d = qq.indexOf(p, a),
            e = m.maxConnections;
        c(a) instanceof qq.BlobProxy && (n("Generated blob upload has ended for " + a + ", disposing generated blob."), delete o._getFileState(a).file), d >= 0 && (p.splice(d, 1), p.length >= e && e > d && (b = p[e - 1], h(b)))
    }

    function j(a) {
        n("Cancelling " + a), m.paramsStore.remove(a), i(a)
    }

    function k() {
        var a = b ? qq[b] : qq,
            c = qq.supportedFeatures.ajaxUploading ? "Xhr" : "Form";
        o = new a["UploadHandler" + c](m, {
            onUploadComplete: i,
            onUuidChanged: m.onUuidChanged,
            getName: m.getName,
            getUuid: m.getUuid,
            getSize: m.getSize,
            getDataByUuid: m.getDataByUuid,
            log: n
        })
    }
    var l, m, n, o, p = [];
    m = {
        debug: !1,
        forceMultipart: !0,
        paramsInBody: !1,
        paramsStore: {},
        endpointStore: {},
        filenameParam: "qqfilename",
        cors: {
            expected: !1,
            sendCredentials: !1
        },
        maxConnections: 3,
        uuidName: "qquuid",
        totalFileSizeName: "qqtotalfilesize",
        chunking: {
            enabled: !1,
            partSize: 2e6,
            paramNames: {
                partIndex: "qqpartindex",
                partByteOffset: "qqpartbyteoffset",
                chunkSize: "qqchunksize",
                totalParts: "qqtotalparts",
                filename: "qqfilename"
            }
        },
        resume: {
            enabled: !1,
            id: null,
            cookiesExpireIn: 7,
            paramNames: {
                resuming: "qqresume"
            }
        },
        log: function () {},
        onProgress: function () {},
        onComplete: function () {},
        onCancel: function () {},
        onUploadPrep: function () {},
        onUpload: function () {},
        onUploadChunk: function () {},
        onUploadChunkSuccess: function () {},
        onAutoRetry: function () {},
        onResume: function () {},
        onUuidChanged: function () {},
        getName: function () {},
        setSize: function () {},
        isQueued: function () {},
        getIdsInGroup: function () {}
    }, qq.extend(m, a), l = function () {
        var a = {};
        return a[m.preventRetryParam] = !0, a
    }(), n = m.log, qq.extend(this, {
        add: function () {
            return o.add.apply(this, arguments)
        },
        upload: function (a) {
            var b = p.push(a);
            return b <= m.maxConnections ? h(a) : !1
        },
        retry: function (a) {
            var b = qq.indexOf(p, a),
                d = c(a),
                e = d && d instanceof qq.BlobProxy;
            return b >= 0 ? e ? h(a) : o.upload(a, !0) : this.upload(a)
        },
        cancel: function (a) {
            var b = o.cancel(a);
            b instanceof qq.Promise ? b.then(function () {
                j(a)
            }) : b !== !1 && j(a)
        },
        cancelAll: function () {
            var a = this,
                b = [];
            qq.extend(b, p), qq.each(b, function (b, c) {
                a.cancel(c)
            }), p = []
        },
        getFile: function (a) {
            return o.getProxy && o.getProxy(a) ? o.getProxy(a).referenceBlob : o.getFile && o.getFile(a)
        },
        isProxied: function (a) {
            return !(!o.getProxy || !o.getProxy(a))
        },
        getInput: function (a) {
            return o.getInput ? o.getInput(a) : void 0
        },
        reset: function () {
            n("Resetting upload handler"), this.cancelAll(), p = [], o.reset()
        },
        expunge: function (a) {
            return this.isValid(a) ? o.expunge(a) : void 0
        },
        isValid: function (a) {
            return o.isValid(a)
        },
        getResumableFilesData: function () {
            return o.getResumableFilesData ? o.getResumableFilesData() : []
        },
        getThirdPartyFileId: function (a) {
            return o.getThirdPartyFileId && this.isValid(a) ? o.getThirdPartyFileId(a) : void 0
        },
        pause: function (a) {
            return this.isResumable(a) && o.pause && this.isValid(a) && o.pause(a) ? (i(a), !0) : void 0
        },
        isResumable: function (a) {
            return !!o.isResumable && o.isResumable(a)
        }
    }), k()
}, qq.AbstractUploadHandlerForm = function (a) {
    "use strict";

    function b(a) {
        delete k[a], delete n[a], m && (clearTimeout(l[a]), delete l[a], u.stopReceivingMessages(a));
        var b = document.getElementById(g._getIframeName(a));
        b && (b.setAttribute("src", "java" + String.fromCharCode(115) + "cript:false;"), qq(b).remove())
    }

    function c(a, b) {
        var c = a.id,
            d = e(c),
            f = s(d);
        j[f] = b, k[d] = qq(a).attach("load", function () {
            n[d].input && (t("Received iframe load event for CORS upload request (iframe name " + c + ")"), l[c] = setTimeout(function () {
                var a = "No valid message received from loaded iframe for iframe name " + c;
                t(a, "error"), b({
                    error: a
                })
            }, 1e3))
        }), u.receiveMessage(c, function (a) {
            t("Received the following window message: '" + a + "'");
            var b, d = e(c),
                f = g._parseJsonResponse(d, a),
                h = f.uuid;
            h && j[h] ? (t("Handling response for iframe name " + c), clearTimeout(l[c]), delete l[c], g._detachLoadEvent(c), b = j[h], delete j[h], u.stopReceivingMessages(c), b(f)) : h || t("'" + a + "' does not contain a UUID - ignoring.")
        })
    }

    function d(a) {
        var b = qq.toElement("<iframe src='javascript:false;' name='" + a + "' />");
        return b.setAttribute("id", a), b.style.display = "none", document.body.appendChild(b), b
    }

    function e(a) {
        return a.split("_")[0]
    }
    var f = a.options,
        g = this,
        h = a.proxy,
        i = qq.getUniqueId(),
        j = {}, k = {}, l = {}, m = f.isCors,
        n = {}, o = f.inputName,
        p = h.onCancel,
        q = h.onUuidChanged,
        r = h.getName,
        s = h.getUuid,
        t = h.log,
        u = new qq.WindowReceiveMessage({
            log: t
        });
    qq.extend(this, {
        add: function (a, b) {
            n[a] = {
                input: b
            }, b.setAttribute("name", o), b.parentNode && qq(b).remove()
        },
        getInput: function (a) {
            return n[a].input
        },
        isValid: function (a) {
            return void 0 !== n[a] && void 0 !== n[a].input
        },
        reset: function () {
            n.length = 0
        },
        expunge: function (a) {
            return b(a)
        },
        cancel: function (a) {
            var b = p(a, r(a));
            return b instanceof qq.Promise ? b.then(function () {
                this.expunge(a)
            }) : b !== !1 ? (this.expunge(a), !0) : !1
        },
        upload: function () {},
        _getIframeName: function (a) {
            return a + "_" + i
        },
        _createIframe: function (a) {
            var b = g._getIframeName(a);
            return d(b)
        },
        _parseJsonResponse: function (a, b) {
            var c;
            try {
                c = qq.parseJson(b), void 0 !== c.newUuid && q(a, c.newUuid)
            } catch (d) {
                t("Error when attempting to parse iframe upload response (" + d.message + ")", "error"), c = {}
            }
            return c
        },
        _initFormForUpload: function (a) {
            var b = a.method,
                c = a.endpoint,
                d = a.params,
                e = a.paramsInBody,
                f = a.targetName,
                g = qq.toElement("<form method='" + b + "' enctype='multipart/form-data'></form>"),
                h = c;
            return e ? qq.obj2Inputs(d, g) : h = qq.obj2url(d, c), g.setAttribute("action", h), g.setAttribute("target", f), g.style.display = "none", document.body.appendChild(g), g
        },
        _attachLoadEvent: function (a, b) {
            var d;
            m ? c(a, b) : k[a.id] = qq(a).attach("load", function () {
                if (t("Received response for " + a.id), a.parentNode) {
                    try {
                        if (a.contentDocument && a.contentDocument.body && "false" == a.contentDocument.body.innerHTML) return
                    } catch (c) {
                        t("Error when attempting to access iframe during handling of upload response (" + c.message + ")", "error"), d = {
                            success: !1
                        }
                    }
                    b(d)
                }
            })
        },
        _detachLoadEvent: function (a) {
            void 0 !== k[a] && (k[a](), delete k[a])
        },
        _getFileState: function (a) {
            return n[a]
        }
    })
}, qq.AbstractUploadHandlerXhr = function (a) {
    "use strict";

    function b(a) {
        var b = f[a].xhr,
            c = f[a].currentAjaxRequester;
        b.onreadystatechange = null, b.upload.onprogress = null, b.abort(), c && c.canceled && c.canceled(a)
    }
    var c = this,
        d = a.options,
        e = a.proxy,
        f = {}, g = d.chunking,
        h = e.onUpload,
        i = e.onCancel,
        j = e.getName,
        k = e.getSize,
        l = e.log;
    qq.extend(this, {
        add: function (a, b) {
            if (qq.isFile(b) || qq.isBlob(b)) f[a] = {
                file: b
            };
            else {
                if (!(b instanceof qq.BlobProxy)) throw new Error("Passed obj is not a File, Blob, or proxy");
                f[a] = {
                    proxy: b
                }
            }
        },
        getFile: function (a) {
            return this.isValid(a) && f[a].file
        },
        getProxy: function (a) {
            return this.isValid(a) && f[a].proxy
        },
        isValid: function (a) {
            return void 0 !== f[a]
        },
        reset: function () {
            f.length = 0
        },
        expunge: function (a) {
            var c = f[a].xhr;
            c && b(a), delete f[a]
        },
        upload: function (a, b) {
            return f[a] && delete f[a].paused, h(a, b)
        },
        cancel: function (a) {
            var b = i(a, j(a));
            return b instanceof qq.Promise ? b.then(function () {
                f[a].canceled = !0, this.expunge(a)
            }) : b !== !1 ? (f[a].canceled = !0, this.expunge(a), !0) : !1
        },
        pause: function (a) {
            var c = f[a].xhr;
            return c ? (l(qq.format("Aborting XHR upload for {} '{}' due to pause instruction.", a, j(a))), f[a].paused = !0, b(a), !0) : void 0
        },
        updateBlob: function (a, b) {
            this.isValid(a) && (f[a].file = b)
        },
        reevaluateChunking: function (a) {
            g && this.isValid(a) && delete f[a].chunking
        },
        isResumable: function (a) {
            return !!g && this.isValid(a) && !f[a].notResumable
        },
        _createXhr: function (a) {
            return this._registerXhr(a, qq.createXhrInstance())
        },
        _registerXhr: function (a, b, c) {
            return f[a].xhr = b, f[a].currentAjaxRequester = c, b
        },
        _getMimeType: function (a) {
            return c.getFile(a).type
        },
        _getTotalChunks: function (a) {
            if (g) {
                var b = k(a),
                    c = g.partSize;
                return Math.ceil(b / c)
            }
        },
        _getChunkData: function (a, b) {
            var d = g.partSize,
                e = k(a),
                f = c.getFile(a),
                h = d * b,
                i = h + d >= e ? e : h + d,
                j = this._getTotalChunks(a);
            return {
                part: b,
                start: h,
                end: i,
                count: j,
                blob: qq.sliceBlob(f, h, i),
                size: i - h
            }
        },
        _getChunkDataForCallback: function (a) {
            return {
                partIndex: a.part,
                startByte: a.start + 1,
                endByte: a.end,
                totalParts: a.count
            }
        },
        _getFileState: function (a) {
            return f[a]
        },
        _markNotResumable: function (a) {
            f[a].notResumable = !0
        }
    })
}, qq.WindowReceiveMessage = function (a) {
    "use strict";
    var b = {
        log: function () {}
    }, c = {};
    qq.extend(b, a), qq.extend(this, {
        receiveMessage: function (a, b) {
            var d = function (a) {
                b(a.data)
            };
            window.postMessage ? c[a] = qq(window).attach("message", d) : log("iframe message passing not supported in this browser!", "error")
        },
        stopReceivingMessages: function (a) {
            if (window.postMessage) {
                var b = c[a];
                b && b()
            }
        }
    })
},
function () {
    "use strict";
    qq.uiPublicApi = {
        clearStoredFiles: function () {
            this._parent.prototype.clearStoredFiles.apply(this, arguments), this._templating.clearFiles()
        },
        addExtraDropzone: function (a) {
            this._dnd && this._dnd.setupExtraDropzone(a)
        },
        removeExtraDropzone: function (a) {
            return this._dnd ? this._dnd.removeDropzone(a) : void 0
        },
        getItemByFileId: function (a) {
            return this._templating.getFileContainer(a)
        },
        reset: function () {
            this._parent.prototype.reset.apply(this, arguments), this._templating.reset(), !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
                element: this._templating.getButton()
            }).getButtonId()), this._dnd && (this._dnd.dispose(), this._dnd = this._setupDragAndDrop()), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0, this._setupClickAndEditEventHandlers()
        },
        setName: function (a, b) {
            var c = this._options.formatFileName(b);
            this._parent.prototype.setName.apply(this, arguments), this._templating.updateFilename(a, c)
        },
        pauseUpload: function (a) {
            var b = this._parent.prototype.pauseUpload.apply(this, arguments);
            return b && this._templating.uploadPaused(a), b
        },
        continueUpload: function (a) {
            var b = this._parent.prototype.continueUpload.apply(this, arguments);
            return b && this._templating.uploadContinued(a), b
        },
        getId: function (a) {
            return this._templating.getFileId(a)
        },
        getDropTarget: function (a) {
            var b = this.getFile(a);
            return b.qqDropTarget
        }
    }, qq.uiPrivateApi = {
        _getButton: function (a) {
            var b = this._parent.prototype._getButton.apply(this, arguments);
            return b || a === this._defaultButtonId && (b = this._templating.getButton()), b
        },
        _removeFileItem: function (a) {
            this._templating.removeFile(a)
        },
        _setupClickAndEditEventHandlers: function () {
            this._fileButtonsClickHandler = qq.FileButtonsClickHandler && this._bindFileButtonsClickEvent(), this._focusinEventSupported = !qq.firefox(), this._isEditFilenameEnabled() && (this._filenameClickHandler = this._bindFilenameClickEvent(), this._filenameInputFocusInHandler = this._bindFilenameInputFocusInEvent(), this._filenameInputFocusHandler = this._bindFilenameInputFocusEvent())
        },
        _setupDragAndDrop: function () {
            var a = this,
                b = this._options.dragAndDrop.extraDropzones,
                c = this._templating,
                d = c.getDropZone();
            return d && b.push(d), new qq.DragAndDrop({
                dropZoneElements: b,
                allowMultipleItems: this._options.multiple,
                classes: {
                    dropActive: this._options.classes.dropActive
                },
                callbacks: {
                    processingDroppedFiles: function () {
                        c.showDropProcessing()
                    },
                    processingDroppedFilesComplete: function (b, d) {
                        c.hideDropProcessing(), qq.each(b, function (a, b) {
                            b.qqDropTarget = d
                        }), b.length && a.addFiles(b, null, null)
                    },
                    dropError: function (b, c) {
                        a._itemError(b, c)
                    },
                    dropLog: function (b, c) {
                        a.log(b, c)
                    }
                }
            })
        },
        _bindFileButtonsClickEvent: function () {
            var a = this;
            return new qq.FileButtonsClickHandler({
                templating: this._templating,
                log: function (b, c) {
                    a.log(b, c)
                },
                onDeleteFile: function (b) {
                    a.deleteFile(b)
                },
                onCancel: function (b) {
                    a.cancel(b)
                },
                onRetry: function (b) {
                    qq(a._templating.getFileContainer(b)).removeClass(a._classes.retryable), a.retry(b)
                },
                onPause: function (b) {
                    a.pauseUpload(b)
                },
                onContinue: function (b) {
                    a.continueUpload(b)
                },
                onGetName: function (b) {
                    return a.getName(b)
                }
            })
        },
        _isEditFilenameEnabled: function () {
            return this._templating.isEditFilenamePossible() && !this._options.autoUpload && qq.FilenameClickHandler && qq.FilenameInputFocusHandler && qq.FilenameInputFocusHandler
        },
        _filenameEditHandler: function () {
            var a = this,
                b = this._templating;
            return {
                templating: b,
                log: function (b, c) {
                    a.log(b, c)
                },
                onGetUploadStatus: function (b) {
                    return a.getUploads({
                        id: b
                    }).status
                },
                onGetName: function (b) {
                    return a.getName(b)
                },
                onSetName: function (b, c) {
                    a.setName(b, c)
                },
                onEditingStatusChange: function (a, c) {
                    var d = qq(b.getEditInput(a)),
                        e = qq(b.getFileContainer(a));
                    c ? (d.addClass("qq-editing"), b.hideFilename(a), b.hideEditIcon(a)) : (d.removeClass("qq-editing"), b.showFilename(a), b.showEditIcon(a)), e.addClass("qq-temp").removeClass("qq-temp")
                }
            }
        },
        _onUploadStatusChange: function (a, b, c) {
            this._parent.prototype._onUploadStatusChange.apply(this, arguments), this._isEditFilenameEnabled() && this._templating.getFileContainer(a) && c !== qq.status.SUBMITTED && (this._templating.markFilenameEditable(a), this._templating.hideEditIcon(a))
        },
        _bindFilenameInputFocusInEvent: function () {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameInputFocusInHandler(a)
        },
        _bindFilenameInputFocusEvent: function () {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameInputFocusHandler(a)
        },
        _bindFilenameClickEvent: function () {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameClickHandler(a)
        },
        _storeForLater: function (a) {
            this._parent.prototype._storeForLater.apply(this, arguments), this._templating.hideSpinner(a)
        },
        _onAllComplete: function () {
            this._parent.prototype._onAllComplete.apply(this, arguments), this._templating.resetTotalProgress()
        },
        _onSubmit: function (a, b) {
            var c = this.getFile(a);
            c && c.qqPath && this._options.dragAndDrop.reportDirectoryPaths && this._paramsStore.addReadOnly(a, {
                qqpath: c.qqPath
            }), this._parent.prototype._onSubmit.apply(this, arguments), this._addToList(a, b)
        },
        _onSubmitted: function (a) {
            this._isEditFilenameEnabled() && (this._templating.markFilenameEditable(a), this._templating.showEditIcon(a), this._focusinEventSupported || this._filenameInputFocusHandler.addHandler(this._templating.getEditInput(a)))
        },
        _onProgress: function (a, b, c, d) {
            this._parent.prototype._onProgress.apply(this, arguments), this._templating.updateProgress(a, c, d), c === d ? (this._templating.hideCancel(a), this._templating.hidePause(a), this._templating.setStatusText(a, this._options.text.waitingForResponse), this._displayFileSize(a)) : this._displayFileSize(a, c, d)
        },
        _onTotalProgress: function (a, b) {
            this._parent.prototype._onTotalProgress.apply(this, arguments), this._templating.updateTotalProgress(a, b)
        },
        _onComplete: function (a, b, c) {
            function d(b) {
                g && (f.setStatusText(a), qq(g).removeClass(h._classes.retrying), f.hideProgress(a), (!h._options.disableCancelForFormUploads || qq.supportedFeatures.ajaxUploading) && f.hideCancel(a), f.hideSpinner(a), b.success ? h._markFileAsSuccessful(a) : (qq(g).addClass(h._classes.fail), h._templating.isRetryPossible() && !h._preventRetries[a] && qq(g).addClass(h._classes.retryable), h._controlFailureTextDisplay(a, b)))
            }
            var e = this._parent.prototype._onComplete.apply(this, arguments),
                f = this._templating,
                g = f.getFileContainer(a),
                h = this;
            return e instanceof qq.Promise ? e.done(function (a) {
                d(a)
            }) : d(c), e
        },
        _markFileAsSuccessful: function (a) {
            var b = this._templating;
            this._isDeletePossible() && b.showDeleteButton(a), qq(b.getFileContainer(a)).addClass(this._classes.success), this._maybeUpdateThumbnail(a)
        },
        _onUploadPrep: function (a) {
            this._parent.prototype._onUploadPrep.apply(this, arguments), this._templating.showSpinner(a)
        },
        _onUpload: function (a) {
            var b = this._parent.prototype._onUpload.apply(this, arguments);
            return this._templating.showSpinner(a), b
        },
        _onUploadChunk: function (a, b) {
            this._parent.prototype._onUploadChunk.apply(this, arguments), b.partIndex > 0 && this._handler.isResumable(a) && this._templating.allowPause(a)
        },
        _onCancel: function (a) {
            this._parent.prototype._onCancel.apply(this, arguments), this._removeFileItem(a), 0 === this._getNotFinished() && this._templating.resetTotalProgress()
        },
        _onBeforeAutoRetry: function (a) {
            var b, c, d;
            this._parent.prototype._onBeforeAutoRetry.apply(this, arguments), this._showCancelLink(a), this._options.retry.showAutoRetryNote && (b = this._autoRetries[a] + 1, c = this._options.retry.maxAutoAttempts, d = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, b), d = d.replace(/\{maxAuto\}/g, c), this._templating.setStatusText(a, d), qq(this._templating.getFileContainer(a)).addClass(this._classes.retrying))
        },
        _onBeforeManualRetry: function (a) {
            return this._parent.prototype._onBeforeManualRetry.apply(this, arguments) ? (this._templating.resetProgress(a), qq(this._templating.getFileContainer(a)).removeClass(this._classes.fail), this._templating.setStatusText(a), this._templating.showSpinner(a), this._showCancelLink(a), !0) : (qq(this._templating.getFileContainer(a)).addClass(this._classes.retryable), !1)
        },
        _onSubmitDelete: function (a) {
            var b = qq.bind(this._onSubmitDeleteSuccess, this);
            this._parent.prototype._onSubmitDelete.call(this, a, b)
        },
        _onSubmitDeleteSuccess: function () {
            this._options.deleteFile.forceConfirm ? this._showDeleteConfirm.apply(this, arguments) : this._sendDeleteRequest.apply(this, arguments)
        },
        _onDeleteComplete: function (a, b, c) {
            this._parent.prototype._onDeleteComplete.apply(this, arguments), this._templating.hideSpinner(a), c ? (this._templating.setStatusText(a, this._options.deleteFile.deletingFailedText), this._templating.showDeleteButton(a)) : this._removeFileItem(a)
        },
        _sendDeleteRequest: function (a) {
            this._templating.hideDeleteButton(a), this._templating.showSpinner(a), this._templating.setStatusText(a, this._options.deleteFile.deletingStatusText), this._deleteHandler.sendDelete.apply(this, arguments)
        },
        _showDeleteConfirm: function (a) {
            var b, c = this.getName(a),
                d = this._options.deleteFile.confirmMessage.replace(/\{filename\}/g, c),
                e = (this.getUuid(a), arguments),
                f = this;
            b = this._options.showConfirm(d), b instanceof qq.Promise ? b.then(function () {
                f._sendDeleteRequest.apply(f, e)
            }) : b !== !1 && f._sendDeleteRequest.apply(f, e)
        },
        _addToList: function (a, b, c) {
            var d, e = 0,
                f = this._handler.isProxied(a) && this._options.scaling.hideScaled;
            f || (this._options.display.prependFiles && (this._totalFilesInBatch > 1 && this._filesInBatchAddedToUi > 0 && (e = this._filesInBatchAddedToUi - 1), d = {
                index: e
            }), c || (this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading && this._templating.disableCancel(), this._options.multiple || (this._handler.cancelAll(), this._clearList())), this._templating.addFile(a, this._options.formatFileName(b), d), c ? this._thumbnailUrls[a] && this._templating.updateThumbnail(a, this._thumbnailUrls[a], !0) : this._templating.generatePreview(a, this.getFile(a)), this._filesInBatchAddedToUi += 1, (c || this._options.display.fileSizeOnSubmit && qq.supportedFeatures.ajaxUploading) && this._displayFileSize(a))
        },
        _clearList: function () {
            this._templating.clearFiles(), this.clearStoredFiles()
        },
        _displayFileSize: function (a, b, c) {
            var d = this.getSize(a),
                e = this._formatSize(d);
            d >= 0 && (void 0 !== b && void 0 !== c && (e = this._formatProgress(b, c)), this._templating.updateSize(a, e))
        },
        _formatProgress: function (a, b) {
            function c(a, b) {
                d = d.replace(a, b)
            }
            var d = this._options.text.formatProgress;
            return c("{percent}", Math.round(100 * (a / b))), c("{total_size}", this._formatSize(b)), d
        },
        _controlFailureTextDisplay: function (a, b) {
            var c, d, e, f, g;
            c = this._options.failedUploadTextDisplay.mode, d = this._options.failedUploadTextDisplay.maxChars, e = this._options.failedUploadTextDisplay.responseProperty, "custom" === c ? (f = b[e], f ? f.length > d && (g = f.substring(0, d) + "...") : f = this._options.text.failUpload, this._templating.setStatusText(a, g || f), this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(a, f)) : "default" === c ? this._templating.setStatusText(a, this._options.text.failUpload) : "none" !== c && this.log("failedUploadTextDisplay.mode value of '" + c + "' is not valid", "warn")
        },
        _showTooltip: function (a, b) {
            this._templating.getFileContainer(a).title = b
        },
        _showCancelLink: function (a) {
            (!this._options.disableCancelForFormUploads || qq.supportedFeatures.ajaxUploading) && this._templating.showCancel(a)
        },
        _itemError: function () {
            var a = this._parent.prototype._itemError.apply(this, arguments);
            this._options.showMessage(a)
        },
        _batchError: function (a) {
            this._parent.prototype._batchError.apply(this, arguments), this._options.showMessage(a)
        },
        _setupPastePrompt: function () {
            var a = this;
            this._options.callbacks.onPasteReceived = function () {
                var b = a._options.paste.namePromptMessage,
                    c = a._options.paste.defaultName;
                return a._options.showPrompt(b, c)
            }
        },
        _fileOrBlobRejected: function () {
            this._totalFilesInBatch -= 1, this._parent.prototype._fileOrBlobRejected.apply(this, arguments)
        },
        _prepareItemsForUpload: function (a) {
            this._totalFilesInBatch = a.length, this._filesInBatchAddedToUi = 0, this._parent.prototype._prepareItemsForUpload.apply(this, arguments)
        },
        _maybeUpdateThumbnail: function (a) {
            var b = this._thumbnailUrls[a];
            this._templating.updateThumbnail(a, b)
        },
        _addCannedFile: function () {
            var a = this._parent.prototype._addCannedFile.apply(this, arguments);
            return this._addToList(a, this.getName(a), !0), this._templating.hideSpinner(a), this._templating.hideCancel(a), this._markFileAsSuccessful(a), a
        },
        _setSize: function (a, b) {
            this._parent.prototype._setSize.apply(this, arguments), this._templating.updateSize(a, this._formatSize(b))
        }
    }
}(), qq.FineUploader = function (a, b) {
    "use strict";
    this._parent = b ? qq[b].FineUploaderBasic : qq.FineUploaderBasic, this._parent.apply(this, arguments), qq.extend(this._options, {
        element: null,
        button: null,
        listElement: null,
        dragAndDrop: {
            extraDropzones: [],
            reportDirectoryPaths: !1
        },
        text: {
            formatProgress: "{percent}% of {total_size}",
            failUpload: "Upload failed",
            waitingForResponse: "Processing...",
            paused: "Paused"
        },
        template: "qq-template",
        classes: {
            retrying: "qq-upload-retrying",
            retryable: "qq-upload-retryable",
            success: "qq-upload-success",
            fail: "qq-upload-fail",
            editable: "qq-editable",
            hide: "qq-hide",
            dropActive: "qq-upload-drop-area-active"
        },
        failedUploadTextDisplay: {
            mode: "default",
            maxChars: 50,
            responseProperty: "error",
            enableTooltip: !0
        },
        messages: {
            tooManyFilesError: "You may only drop one file",
            unsupportedBrowser: "Unrecoverable error - this browser does not permit file uploading of any kind."
        },
        retry: {
            showAutoRetryNote: !0,
            autoRetryNote: "Retrying {retryNum}/{maxAuto}..."
        },
        deleteFile: {
            forceConfirm: !1,
            confirmMessage: "Are you sure you want to delete {filename}?",
            deletingStatusText: "Deleting...",
            deletingFailedText: "Delete failed"
        },
        display: {
            fileSizeOnSubmit: !1,
            prependFiles: !1
        },
        paste: {
            promptForName: !1,
            namePromptMessage: "Please name this image"
        },
        thumbnails: {
            placeholders: {
                waitUntilResponse: !1,
                notAvailablePath: null,
                waitingPath: null
            }
        },
        scaling: {
            hideScaled: !1
        },
        showMessage: function (a) {
            setTimeout(function () {
                window.alert(a)
            }, 0)
        },
        showConfirm: function (a) {
            return window.confirm(a)
        },
        showPrompt: function (a, b) {
            return window.prompt(a, b)
        }
    }, !0), qq.extend(this._options, a, !0), this._templating = new qq.Templating({
        log: qq.bind(this.log, this),
        templateIdOrEl: this._options.template,
        containerEl: this._options.element,
        fileContainerEl: this._options.listElement,
        button: this._options.button,
        imageGenerator: this._imageGenerator,
        classes: {
            hide: this._options.classes.hide,
            editable: this._options.classes.editable
        },
        placeholders: {
            waitUntilUpdate: this._options.thumbnails.placeholders.waitUntilResponse,
            thumbnailNotAvailable: this._options.thumbnails.placeholders.notAvailablePath,
            waitingForThumbnail: this._options.thumbnails.placeholders.waitingPath
        },
        text: this._options.text
    }), !qq.supportedFeatures.uploading || this._options.cors.expected && !qq.supportedFeatures.uploadCors ? this._templating.renderFailure(this._options.messages.unsupportedBrowser) : (this._wrapCallbacks(), this._templating.render(), this._classes = this._options.classes, !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
        element: this._templating.getButton()
    }).getButtonId()), this._setupClickAndEditEventHandlers(), qq.DragAndDrop && qq.supportedFeatures.fileDrop && (this._dnd = this._setupDragAndDrop()), this._options.paste.targetElement && this._options.paste.promptForName && (qq.PasteSupport ? this._setupPastePrompt() : qq.log("Paste support module not found.", "info")), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0)
}, qq.extend(qq.FineUploader.prototype, qq.basePublicApi), qq.extend(qq.FineUploader.prototype, qq.basePrivateApi), qq.extend(qq.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.FineUploader.prototype, qq.uiPrivateApi), qq.Templating = function (a) {
    "use strict";

    function b() {
        var a, b, c, d, e, f, g, h, i;
        if (A("Parsing template"), null == P.templateIdOrEl) throw new Error("You MUST specify either a template element or ID!");
        if (qq.isString(P.templateIdOrEl)) {
            if (a = document.getElementById(P.templateIdOrEl), null === a) throw new Error(qq.format("Cannot find template script at ID '{}'!", P.templateIdOrEl));
            b = a.innerHTML
        } else {
            if (void 0 === P.templateIdOrEl.innerHTML) throw new Error("You have specified an invalid value for the template option!  It must be an ID or an Element.");
            b = P.templateIdOrEl.innerHTML
        } if (b = qq.trimStr(b), d = document.createElement("div"), d.appendChild(qq.toElement(b)), P.button && (f = qq(d).getByClass(Q.button)[0], f && qq(f).remove()), qq.DragAndDrop && qq.supportedFeatures.fileDrop || (i = qq(d).getByClass(Q.dropProcessing)[0], i && qq(i).remove()), g = qq(d).getByClass(Q.drop)[0], g && !qq.DragAndDrop && (A("DnD module unavailable.", "info"), qq(g).remove()), g && !qq.supportedFeatures.fileDrop && qq(g).hasAttribute(M) && qq(g).css({
            display: "none"
        }), h = qq(d).getByClass(Q.thumbnail)[0], G ? h && (O = parseInt(h.getAttribute(K)), O = O > 0 ? O : null, H = qq(h).hasAttribute(L)) : h && qq(h).remove(), G = G && h, B = qq(d).getByClass(Q.editFilenameInput).length > 0, C = qq(d).getByClass(Q.retry).length > 0, c = qq(d).getByClass(Q.list)[0], null == c) throw new Error("Could not find the file list container in the template!");
        return e = c.innerHTML, c.innerHTML = "", A("Template parsing complete"), {
            template: qq.trimStr(d.innerHTML),
            fileTemplate: qq.trimStr(e)
        }
    }

    function c(a) {
        return qq(F).getByClass(J + a)[0]
    }

    function d(a, b) {
        return a && qq(a).getByClass(b)[0]
    }

    function e(a, b) {
        var c = F,
            d = c.firstChild;
        b > 0 && (d = qq(c).children()[b].nextSibling), c.insertBefore(a, d)
    }

    function f(a) {
        return d(c(a), Q.cancel)
    }

    function g(a) {
        return d(c(a), Q.pause)
    }

    function h(a) {
        return d(c(a), Q.continueButton)
    }

    function i(a) {
        return null == a ? d(E, Q.totalProgressBarContainer) || d(E, Q.totalProgressBar) : d(c(a), Q.progressBarContainer) || d(c(a), Q.progressBar)
    }

    function j(a) {
        return d(c(a), Q.spinner)
    }

    function k(a) {
        return d(c(a), Q.editNameIcon)
    }

    function l(a) {
        return d(c(a), Q.size)
    }

    function m(a) {
        return d(c(a), Q.deleteButton)
    }

    function n(a) {
        return d(c(a), Q.retry)
    }

    function o(a) {
        return d(c(a), Q.file)
    }

    function p() {
        return d(E, Q.dropProcessing)
    }

    function q(a) {
        return G && d(c(a), Q.thumbnail)
    }

    function r(a) {
        a && qq(a).addClass(P.classes.hide)
    }

    function s(a) {
        a && qq(a).removeClass(P.classes.hide)
    }

    function t(a, b) {
        var c = i(a),
            d = null == a ? Q.totalProgressBar : Q.progressBar;
        c && !qq(c).hasClass(d) && (c = qq(c).getByClass(d)[0]), c && qq(c).css({
            width: b + "%"
        })
    }

    function u() {
        var a = P.placeholders.thumbnailNotAvailable,
            b = P.placeholders.waitingForThumbnail,
            c = {
                maxSize: O,
                scale: H
            };
        G && (a ? P.imageGenerator.generate(a, new Image, c).then(function (a) {
            S.success(a)
        }, function () {
            S.failure(), A("Problem loading 'not available' placeholder image at " + a, "error")
        }) : S.failure(), b ? P.imageGenerator.generate(b, new Image, c).then(function (a) {
            T.success(a)
        }, function () {
            T.failure(), A("Problem loading 'waiting for thumbnail' placeholder image at " + b, "error")
        }) : T.failure())
    }

    function v(a) {
        var b = new qq.Promise;
        return T.then(function (c) {
            x(c, a), a.src ? b.success() : (a.src = c.src, a.onload = function () {
                s(a), b.success()
            })
        }, function () {
            r(a), b.success()
        }), b
    }

    function w(a, b) {
        var c = R[a] || (new qq.Promise).failure(),
            d = new qq.Promise;
        return S.then(function (a) {
            c.then(function () {
                d.success()
            }, function () {
                x(a, b), b.onload = function () {
                    d.success()
                }, b.src = a.src, s(b)
            })
        }), d
    }

    function x(a, b) {
        var c = a.style.maxWidth,
            d = a.style.maxHeight;
        d && c && !b.style.maxWidth && !b.style.maxHeight && qq(b).css({
            maxWidth: c,
            maxHeight: d
        })
    }

    function y(a, b) {
        var c = q(a),
            d = q(b);
        A(qq.format("ID {} is the same file as ID {}.  Will use generated thumbnail from ID {} instead.", a, b, b)), R[b].then(function () {
            R[a].success(), A(qq.format("Now using previously generated thumbnail created for ID {} on ID {}.", b, a)), c.src = d.src, s(c)
        }, function () {
            R[a].failure(), P.placeholders.waitUntilUpdate || w(a, c)
        })
    }

    function z(a, b, c) {
        var d = q(a);
        return A("Generating new thumbnail for " + a), b.qqThumbnailId = a, P.imageGenerator.generate(b, d, c).then(function () {
            s(d), R[a].success()
        }, function () {
            R[a].failure(), P.placeholders.waitUntilUpdate || w(a, d)
        })
    }
    var A, B, C, D, E, F, G, H, I = "qq-file-id",
        J = "qq-file-id-",
        K = "qq-max-size",
        L = "qq-server-scale",
        M = "qq-hide-dropzone",
        N = !1,
        O = -1,
        P = {
            log: null,
            templateIdOrEl: "qq-template",
            containerEl: null,
            fileContainerEl: null,
            button: null,
            imageGenerator: null,
            classes: {
                hide: "qq-hide",
                editable: "qq-editable"
            },
            placeholders: {
                waitUntilUpdate: !1,
                thumbnailNotAvailable: null,
                waitingForThumbnail: null
            },
            text: {
                paused: "Paused"
            }
        }, Q = {
            button: "qq-upload-button-selector",
            drop: "qq-upload-drop-area-selector",
            list: "qq-upload-list-selector",
            progressBarContainer: "qq-progress-bar-container-selector",
            progressBar: "qq-progress-bar-selector",
            totalProgressBarContainer: "qq-total-progress-bar-container-selector",
            totalProgressBar: "qq-total-progress-bar-selector",
            file: "qq-upload-file-selector",
            spinner: "qq-upload-spinner-selector",
            size: "qq-upload-size-selector",
            cancel: "qq-upload-cancel-selector",
            pause: "qq-upload-pause-selector",
            continueButton: "qq-upload-continue-selector",
            deleteButton: "qq-upload-delete-selector",
            retry: "qq-upload-retry-selector",
            statusText: "qq-upload-status-text-selector",
            editFilenameInput: "qq-edit-filename-selector",
            editNameIcon: "qq-edit-filename-icon-selector",
            dropProcessing: "qq-drop-processing-selector",
            dropProcessingSpinner: "qq-drop-processing-spinner-selector",
            thumbnail: "qq-thumbnail-selector"
        }, R = {}, S = new qq.Promise,
        T = new qq.Promise;
    qq.extend(P, a), A = P.log, E = P.containerEl, G = void 0 !== P.imageGenerator, D = b(), u(), qq.extend(this, {
        render: function () {
            A("Rendering template in DOM."), E.innerHTML = D.template, r(p()), this.hideTotalProgress(), F = P.fileContainerEl || d(E, Q.list), A("Template rendering complete")
        },
        renderFailure: function (a) {
            var b = qq.toElement(a);
            E.innerHTML = "", E.appendChild(b)
        },
        reset: function () {
            this.render()
        },
        clearFiles: function () {
            F.innerHTML = ""
        },
        disableCancel: function () {
            N = !0
        },
        addFile: function (a, b, c) {
            var f = qq.toElement(D.fileTemplate),
                j = d(f, Q.file);
            qq(f).addClass(J + a), j && qq(j).setText(b), f.setAttribute(I, a), c ? e(f, c.index) : F.appendChild(f), r(i(a)), r(l(a)), r(m(a)), r(n(a)), r(g(a)), r(h(a)), N && this.hideCancel(a)
        },
        removeFile: function (a) {
            qq(c(a)).remove()
        },
        getFileId: function (a) {
            var b = a;
            if (b) {
                for (; null == b.getAttribute(I);) b = b.parentNode;
                return parseInt(b.getAttribute(I))
            }
        },
        getFileList: function () {
            return F
        },
        markFilenameEditable: function (a) {
            var b = o(a);
            b && qq(b).addClass(P.classes.editable)
        },
        updateFilename: function (a, b) {
            var c = o(a);
            c && qq(c).setText(b)
        },
        hideFilename: function (a) {
            r(o(a))
        },
        showFilename: function (a) {
            s(o(a))
        },
        isFileName: function (a) {
            return qq(a).hasClass(Q.file)
        },
        getButton: function () {
            return P.button || d(E, Q.button)
        },
        hideDropProcessing: function () {
            r(p())
        },
        showDropProcessing: function () {
            s(p())
        },
        getDropZone: function () {
            return d(E, Q.drop)
        },
        isEditFilenamePossible: function () {
            return B
        },
        isRetryPossible: function () {
            return C
        },
        getFileContainer: function (a) {
            return c(a)
        },
        showEditIcon: function (a) {
            var b = k(a);
            b && qq(b).addClass(P.classes.editable)
        },
        hideEditIcon: function (a) {
            var b = k(a);
            b && qq(b).removeClass(P.classes.editable)
        },
        isEditIcon: function (a) {
            return qq(a).hasClass(Q.editNameIcon)
        },
        getEditInput: function (a) {
            return d(c(a), Q.editFilenameInput)
        },
        isEditInput: function (a) {
            return qq(a).hasClass(Q.editFilenameInput)
        },
        updateProgress: function (a, b, c) {
            var d, e = i(a);
            e && (d = Math.round(100 * (b / c)), b === c ? r(e) : s(e), t(a, d))
        },
        updateTotalProgress: function (a, b) {
            this.updateProgress(null, a, b)
        },
        hideProgress: function (a) {
            var b = i(a);
            b && r(b)
        },
        hideTotalProgress: function () {
            this.hideProgress()
        },
        resetProgress: function (a) {
            t(a, 0)
        },
        resetTotalProgress: function () {
            this.resetProgress()
        },
        showCancel: function (a) {
            if (!N) {
                var b = f(a);
                b && qq(b).removeClass(P.classes.hide)
            }
        },
        hideCancel: function (a) {
            r(f(a))
        },
        isCancel: function (a) {
            return qq(a).hasClass(Q.cancel)
        },
        allowPause: function (a) {
            s(g(a)), r(h(a))
        },
        uploadPaused: function (a) {
            this.setStatusText(a, P.text.paused), this.allowContinueButton(a), r(j(a))
        },
        hidePause: function (a) {
            r(g(a))
        },
        isPause: function (a) {
            return qq(a).hasClass(Q.pause)
        },
        isContinueButton: function (a) {
            return qq(a).hasClass(Q.continueButton)
        },
        allowContinueButton: function (a) {
            s(h(a)), r(g(a))
        },
        uploadContinued: function (a) {
            this.setStatusText(a, ""), this.allowPause(a), s(j(a))
        },
        showDeleteButton: function (a) {
            s(m(a))
        },
        hideDeleteButton: function (a) {
            r(m(a))
        },
        isDeleteButton: function (a) {
            return qq(a).hasClass(Q.deleteButton)
        },
        isRetry: function (a) {
            return qq(a).hasClass(Q.retry)
        },
        updateSize: function (a, b) {
            var c = l(a);
            c && (s(c), qq(c).setText(b))
        },
        setStatusText: function (a, b) {
            var e = d(c(a), Q.statusText);
            e && (null == b ? qq(e).clearText() : qq(e).setText(b))
        },
        hideSpinner: function (a) {
            r(j(a))
        },
        showSpinner: function (a) {
            s(j(a))
        },
        generatePreview: function (a, b) {
            var c = b && b.qqThumbnailId,
                d = q(a),
                e = {
                    maxSize: O,
                    scale: !0,
                    orient: !0
                };
            qq.supportedFeatures.imagePreviews ? d && v(d).done(function () {
                R[a] = new qq.Promise, null != c ? y(a, c) : z(a, b, e)
            }) : d && v(d)
        },
        updateThumbnail: function (a, b, c) {
            var d = q(a),
                e = {
                    maxSize: O,
                    scale: H
                };
            if (d) {
                if (b) return c && v(d), P.imageGenerator.generate(b, d, e).then(function () {
                    s(d)
                }, function () {
                    w(a, d)
                });
                w(a, d)
            }
        }
    })
}, qq.UploadHandlerForm = function (a, b) {
    "use strict";

    function c(a, b) {
        var c;
        try {
            var d = b.contentDocument || b.contentWindow.document,
                f = d.body.innerHTML;
            k("converting iframe's innerHTML to JSON"), k("innerHTML = " + f), f && f.match(/^<pre/i) && (f = d.body.firstChild.firstChild.nodeValue), c = e._parseJsonResponse(a, f)
        } catch (g) {
            k("Error when attempting to parse form upload response (" + g.message + ")", "error"), c = {
                success: !1
            }
        }
        return c
    }

    function d(b, c) {
        var d = a.paramsStore.get(b),
            f = a.demoMode ? "GET" : "POST",
            g = a.endpointStore.get(b),
            j = h(b);
        return d[a.uuidName] = i(b), d[a.filenameParam] = j, e._initFormForUpload({
            method: f,
            endpoint: g,
            params: d,
            paramsInBody: a.paramsInBody,
            targetName: c.name
        })
    }
    var e = this,
        f = b.onUploadComplete,
        g = b.onUuidChanged,
        h = b.getName,
        i = b.getUuid,
        j = f,
        k = b.log;
    qq.extend(this, new qq.AbstractUploadHandlerForm({
        options: {
            isCors: a.cors.expected,
            inputName: a.inputName
        },
        proxy: {
            onCancel: a.onCancel,
            onUuidChanged: g,
            getName: h,
            getUuid: i,
            log: k
        }
    })), qq.extend(this, {
        upload: function (b) {
            var f, g = e._getFileState(b).input,
                i = h(b),
                l = e._createIframe(b);
            if (!g) throw new Error("file with passed id was not added, or already uploaded or canceled");
            a.onUpload(b, h(b)), f = d(b, l), f.appendChild(g), e._attachLoadEvent(l, function (d) {
                k("iframe loaded");
                var f = d ? d : c(b, l);
                e._detachLoadEvent(b), a.cors.expected || qq(l).remove(), (f.success || !a.onAutoRetry(b, i, f)) && (a.onComplete(b, i, f), j(b))
            }), k("Sending upload request for " + b), f.submit(), qq(f).remove()
        }
    })
}, qq.UploadHandlerXhr = function (a, b) {
    "use strict";

    function c() {
        return null === a.resume.id || void 0 === a.resume.id || qq.isFunction(a.resume.id) || qq.isObject(a.resume.id) ? void 0 : a.resume.id
    }

    function d(b, c, d) {
        var e = K(b),
            f = I(b);
        c[a.chunking.paramNames.partIndex] = d.part, c[a.chunking.paramNames.partByteOffset] = d.start, c[a.chunking.paramNames.chunkSize] = d.size, c[a.chunking.paramNames.totalParts] = d.count, c[a.totalFileSizeName] = e, Q && (c[a.filenameParam] = f)
    }

    function e(b) {
        b[a.resume.paramNames.resuming] = !0
    }

    function f(b, c, d, e) {
        var f = new FormData,
            g = a.demoMode ? "GET" : "POST",
            h = a.endpointStore.get(e),
            i = h,
            j = I(e),
            k = K(e);
        return b[a.uuidName] = J(e), b[a.filenameParam] = j, Q && (b[a.totalFileSizeName] = k), a.paramsInBody || (Q || (b[a.inputName] = j), i = qq.obj2url(b, h)), c.open(g, i, !0), a.cors.expected && a.cors.sendCredentials && (c.withCredentials = !0), Q ? (a.paramsInBody && qq.obj2FormData(b, f), f.append(a.inputName, d), f) : d
    }

    function g(b, c) {
        var d = a.customHeaders,
            e = R.getFile(b);
        c.setRequestHeader("X-Requested-With", "XMLHttpRequest"), c.setRequestHeader("Cache-Control", "no-cache"), Q || (c.setRequestHeader("Content-Type", "application/octet-stream"), c.setRequestHeader("X-Mime-Type", e.type)), qq.each(d, function (a, b) {
            c.setRequestHeader(a, b)
        })
    }

    function h(b, c, d) {
        var e = I(b),
            f = K(b);
        R._getFileState(b).attemptingResume = !1, a.onProgress(b, e, f, f), a.onComplete(b, e, c, d), R._getFileState(b) && delete R._getFileState(b).xhr, G(b)
    }

    function i(b) {
        var c, h, i = R._getFileState(b).remainingChunkIdxs[0],
            k = R._getChunkData(b, i),
            l = R._createXhr(b),
            m = K(b),
            n = I(b);
        void 0 === R._getFileState(b).loaded && (R._getFileState(b).loaded = 0), P && R.getFile(b) && t(b, k), l.onreadystatechange = s(b, l), l.upload.onprogress = function (c) {
            if (c.lengthComputable) {
                var d = c.loaded + R._getFileState(b).loaded,
                    e = j(b, i, c.total);
                a.onProgress(b, n, d, e)
            }
        }, a.onUploadChunk(b, n, R._getChunkDataForCallback(k)), h = a.paramsStore.get(b), d(b, h, k), R._getFileState(b).attemptingResume && e(h), c = f(h, l, k.blob, b), g(b, l), M("Sending chunked upload request for item " + b + ": bytes " + (k.start + 1) + "-" + k.end + " of " + m), l.send(c)
    }

    function j(a, b, c) {
        var d = R._getChunkData(a, b),
            e = d.size,
            f = c - e,
            g = K(a),
            h = d.count,
            i = R._getFileState(a).initialRequestOverhead,
            j = f - i;
        return R._getFileState(a).lastRequestOverhead = f, 0 === b ? (R._getFileState(a).lastChunkIdxProgress = 0, R._getFileState(a).initialRequestOverhead = f, R._getFileState(a).estTotalRequestsSize = g + h * f) : R._getFileState(a).lastChunkIdxProgress !== b && (R._getFileState(a).lastChunkIdxProgress = b, R._getFileState(a).estTotalRequestsSize += j), R._getFileState(a).estTotalRequestsSize
    }

    function k(a) {
        return Q ? R._getFileState(a).lastRequestOverhead : 0
    }

    function l(b, c, d) {
        var e = R._getFileState(b).remainingChunkIdxs.shift(),
            f = R._getChunkData(b, e);
        R._getFileState(b).attemptingResume = !1, R._getFileState(b).loaded += f.size + k(b), a.onUploadChunkSuccess(b, R._getChunkDataForCallback(f), c, d), R._getFileState(b).remainingChunkIdxs.length > 0 ? i(b) : (P && u(b), h(b, c, d))
    }

    function m(a, b) {
        return 200 !== a.status || !b.success || b.reset
    }

    function n(a, b) {
        var c;
        try {
            M(qq.format("Received response status {} with body: {}", b.status, b.responseText)), c = qq.parseJson(b.responseText), void 0 !== c.newUuid && H(a, c.newUuid)
        } catch (d) {
            M("Error when attempting to parse xhr response text (" + d.message + ")", "error"), c = {}
        }
        return c
    }

    function o(a) {
        M("Server has ordered chunking effort to be restarted on next attempt for item ID " + a, "error"), P && (u(a), R._getFileState(a).attemptingResume = !1), R._getFileState(a).remainingChunkIdxs = [], delete R._getFileState(a).loaded, delete R._getFileState(a).estTotalRequestsSize, delete R._getFileState(a).initialRequestOverhead
    }

    function p(a) {
        R._getFileState(a).attemptingResume = !1, M("Server has declared that it cannot handle resume for item ID " + a + " - starting from the first chunk", "error"), o(a), R.upload(a, !0)
    }

    function q(b, c, d) {
        var e = I(b);
        a.onAutoRetry(b, e, c, d) || (200 !== d.status && (c.success = !1), h(b, c, d))
    }

    function r(a, b) {
        var c, d = R._getFileState(a),
            e = d && d.attemptingResume,
            f = d && d.paused;
        d && !f && (M("xhr - server response received for " + a), M("responseText = " + b.responseText), c = n(a, b), m(b, c) ? (c.reset && o(a), e && c.reset ? p(a) : q(a, c, b)) : O ? l(a, c, b) : h(a, c, b))
    }

    function s(a, b) {
        return function () {
            4 === b.readyState && r(a, b)
        }
    }

    function t(b, c) {
        if (R.isResumable(b)) {
            var d = J(b),
                e = R._getFileState(b).loaded,
                f = R._getFileState(b).initialRequestOverhead,
                g = R._getFileState(b).estTotalRequestsSize,
                h = w(b),
                i = d + N + c.part + N + e + N + f + N + g,
                j = a.resume.cookiesExpireIn;
            qq.setCookie(h, i, j)
        }
    }

    function u(a) {
        if (R.isResumable(a) && R.getFile(a)) {
            var b = w(a);
            qq.deleteCookie(b)
        }
    }

    function v(a) {
        var b, c, d, e, f, g, h = qq.getCookie(w(a)),
            i = I(a);
        if (h) {
            if (b = h.split(N), 5 === b.length) return c = b[0], d = parseInt(b[1], 10), e = parseInt(b[2], 10), f = parseInt(b[3], 10), g = parseInt(b[4], 10), {
                uuid: c,
                part: d,
                lastByteSent: e,
                initialRequestOverhead: f,
                estTotalRequestsSize: g
            };
            M("Ignoring previously stored resume/chunk cookie for " + i + " - old cookie format", "warn")
        }
    }

    function w(b) {
        var c, d = I(b),
            e = K(b),
            f = a.chunking.partSize;
        return c = "qqfilechunk" + N + encodeURIComponent(d) + N + e + N + f, void 0 !== F && (c += N + F), c
    }

    function x(a, b) {
        var c;
        for (c = R._getTotalChunks(a) - 1; c >= b; c -= 1) R._getFileState(a).remainingChunkIdxs.unshift(c);
        i(a)
    }

    function y(a, b, c, d) {
        c = d.part, R._getFileState(a).loaded = d.lastByteSent, R._getFileState(a).estTotalRequestsSize = d.estTotalRequestsSize, R._getFileState(a).initialRequestOverhead = d.initialRequestOverhead, R._getFileState(a).attemptingResume = !0, M("Resuming " + b + " at partition index " + c), x(a, c)
    }

    function z(b, c, d) {
        var e, f = I(b),
            g = R._getChunkData(b, c.part);
        e = a.onResume(b, f, R._getChunkDataForCallback(g)), e instanceof qq.Promise ? (M("Waiting for onResume promise to be fulfilled for " + b), e.then(function () {
            y(b, f, d, c)
        }, function () {
            M("onResume promise fulfilled - failure indicated.  Will not resume."), x(b, d)
        })) : e !== !1 ? y(b, f, d, c) : (M("onResume callback returned false.  Will not resume."), x(b, d))
    }

    function A(a, b) {
        R._getFileState(a).remainingChunkIdxs && 0 !== R._getFileState(a).remainingChunkIdxs.length ? i(a) : B(a, b)
    }

    function B(a, b) {
        R._getFileState(a).remainingChunkIdxs = [], P && !b && R.getFile(a) && R.isResumable(a) ? C(a) : x(a, 0)
    }

    function C(a) {
        var b = v(a);
        b ? z(a, b, 0) : x(a, 0)
    }

    function D(b) {
        var c, d, e, h = R.getFile(b),
            i = I(b);
        R._getFileState(b).loaded = 0, c = R._createXhr(b), c.upload.onprogress = function (c) {
            c.lengthComputable && (R._getFileState(b).loaded = c.loaded, a.onProgress(b, i, c.loaded, c.total))
        }, c.onreadystatechange = s(b, c), d = a.paramsStore.get(b), e = f(d, c, h, b), g(b, c), M("Sending upload request for " + b), c.send(e)
    }

    function E(b, c) {
        var d = I(b);
        R.isValid(b) && (a.onUpload(b, d), O ? A(b, c) : D(b))
    }
    var F, G = b.onUploadComplete,
        H = b.onUuidChanged,
        I = b.getName,
        J = b.getUuid,
        K = b.getSize,
        L = b.getDataByUuid,
        M = b.log,
        N = "|",
        O = a.chunking.enabled && qq.supportedFeatures.chunking,
        P = a.resume.enabled && O && qq.supportedFeatures.resume,
        Q = a.forceMultipart || a.paramsInBody,
        R = this;
    F = c(), qq.extend(this, new qq.AbstractUploadHandlerXhr({
        options: {
            chunking: O ? a.chunking : null
        },
        proxy: {
            onUpload: E,
            onCancel: a.onCancel,
            onUuidChanged: H,
            getName: I,
            getSize: K,
            getUuid: J,
            log: M
        }
    })), qq.override(this, function (b) {
        return {
            add: function (a) {
                var c;
                return b.add.apply(this, arguments), P && (c = v(a), c && (L(c.uuid) ? R._markNotResumable(a) : H(a, c.uuid))), a
            },
            getResumableFilesData: function () {
                var b = [],
                    c = [];
                return O && P ? (b = void 0 === F ? qq.getCookieNames(new RegExp("^qqfilechunk\\" + N + ".+\\" + N + "\\d+\\" + N + a.chunking.partSize + "=")) : qq.getCookieNames(new RegExp("^qqfilechunk\\" + N + ".+\\" + N + "\\d+\\" + N + a.chunking.partSize + "\\" + N + F + "=")), qq.each(b, function (a, b) {
                    var d = b.split(N),
                        e = qq.getCookie(b).split(N);
                    c.push({
                        name: decodeURIComponent(d[1]),
                        size: d[2],
                        uuid: e[0],
                        partIdx: e[1]
                    })
                }), c) : []
            },
            expunge: function (a) {
                P && u(a), b.expunge(a)
            }
        }
    })
}, qq.PasteSupport = function (a) {
    "use strict";

    function b(a) {
        return a.type && 0 === a.type.indexOf("image/")
    }

    function c() {
        qq(e.targetElement).attach("paste", function (a) {
            var c = a.clipboardData;
            c && qq.each(c.items, function (a, c) {
                if (b(c)) {
                    var d = c.getAsFile();
                    e.callbacks.pasteReceived(d)
                }
            })
        })
    }

    function d() {
        f && f()
    }
    var e, f;
    e = {
        targetElement: null,
        callbacks: {
            log: function () {},
            pasteReceived: function () {}
        }
    }, qq.extend(e, a), c(), qq.extend(this, {
        reset: function () {
            d()
        }
    })
}, qq.DragAndDrop = function (a) {
    "use strict";

    function b(a, b) {
        var c = Array.prototype.slice.call(a);
        i.callbacks.dropLog("Grabbed " + a.length + " dropped files."), b.dropDisabled(!1), i.callbacks.processingDroppedFilesComplete(c, b.getElement())
    }

    function c(a) {
        var b, d = new qq.Promise;
        return a.isFile ? a.file(function (b) {
            var c = a.name,
                e = a.fullPath,
                f = e.indexOf(c);
            e = e.substr(0, f), "/" === e.charAt(0) && (e = e.substr(1)), b.qqPath = e, m.push(b), d.success()
        }, function (b) {
            i.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + b.code + ".", "error"), d.failure()
        }) : a.isDirectory && (b = a.createReader(), b.readEntries(function (a) {
            var b = a.length;
            qq.each(a, function (a, e) {
                c(e).done(function () {
                    b -= 1, 0 === b && d.success()
                })
            }), a.length || d.success()
        }, function (b) {
            i.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + b.code + ".", "error"), d.failure()
        })), d
    }

    function d(a, b) {
        var d = [],
            e = new qq.Promise;
        return i.callbacks.processingDroppedFiles(), b.dropDisabled(!0), a.files.length > 1 && !i.allowMultipleItems ? (i.callbacks.processingDroppedFilesComplete([]), i.callbacks.dropError("tooManyFilesError", ""), b.dropDisabled(!1), e.failure()) : (m = [], qq.isFolderDropSupported(a) ? qq.each(a.items, function (a, b) {
            var f = b.webkitGetAsEntry();
            f && (f.isFile ? m.push(b.getAsFile()) : d.push(c(f).done(function () {
                d.pop(), 0 === d.length && e.success()
            })))
        }) : m = a.files, 0 === d.length && e.success()), e
    }

    function e(a) {
        var c = new qq.UploadDropZone({
            HIDE_ZONES_EVENT_NAME: j,
            element: a,
            onEnter: function (b) {
                qq(a).addClass(i.classes.dropActive), b.stopPropagation()
            },
            onLeaveNotDescendants: function () {
                qq(a).removeClass(i.classes.dropActive)
            },
            onDrop: function (a) {
                d(a.dataTransfer, c).then(function () {
                    b(m, c)
                }, function () {
                    i.callbacks.dropLog("Drop event DataTransfer parsing failed.  No files will be uploaded.", "error")
                })
            }
        });
        return n.addDisposer(function () {
            c.dispose()
        }), qq(a).hasAttribute(k) && qq(a).hide(), l.push(c), c
    }

    function f(a) {
        var b;
        return qq.each(a.dataTransfer.types, function (a, c) {
            return "Files" === c ? (b = !0, !1) : void 0
        }), b
    }

    function g(a) {
        return qq.firefox() ? !a.relatedTarget : qq.safari() ? a.x < 0 || a.y < 0 : 0 === a.x && 0 === a.y
    }

    function h() {
        var a = i.dropZoneElements,
            b = function () {
                setTimeout(function () {
                    qq.each(a, function (a, b) {
                        qq(b).hasAttribute(k) && qq(b).hide(), qq(b).removeClass(i.classes.dropActive)
                    })
                }, 10)
            };
        qq.each(a, function (b, c) {
            var d = e(c);
            !a.length || qq.ie() && !qq.ie10() || n.attach(document, "dragenter", function (b) {
                !d.dropDisabled() && f(b) && qq.each(a, function (a, b) {
                    b instanceof HTMLElement && qq(b).css({
                        display: "block"
                    })
                })
            })
        }), n.attach(document, "dragleave", function (a) {
            g(a) && b()
        }), n.attach(qq(document).children()[0], "mouseenter", function () {
            b()
        }), n.attach(document, "drop", function (a) {
            a.preventDefault(), b()
        }), n.attach(document, j, b)
    }
    var i, j = "qq-hidezones",
        k = "qq-hide-dropzone",
        l = [],
        m = [],
        n = new qq.DisposeSupport;
    i = {
        dropZoneElements: [],
        allowMultipleItems: !0,
        classes: {
            dropActive: null
        },
        callbacks: new qq.DragAndDrop.callbacks
    }, qq.extend(i, a, !0), h(), qq.extend(this, {
        setupExtraDropzone: function (a) {
            i.dropZoneElements.push(a), e(a)
        },
        removeDropzone: function (a) {
            var b, c = i.dropZoneElements;
            for (b in c)
                if (c[b] === a) return c.splice(b, 1)
        },
        dispose: function () {
            n.dispose(), qq.each(l, function (a, b) {
                b.dispose()
            })
        }
    })
}, qq.DragAndDrop.callbacks = function () {
    "use strict";
    return {
        processingDroppedFiles: function () {},
        processingDroppedFilesComplete: function () {},
        dropError: function (a, b) {
            qq.log("Drag & drop error code '" + a + " with these specifics: '" + b + "'", "error")
        },
        dropLog: function (a, b) {
            qq.log(a, b)
        }
    }
}, qq.UploadDropZone = function (a) {
    "use strict";

    function b() {
        return qq.safari() || qq.firefox() && qq.windows()
    }

    function c() {
        k || (b ? l.attach(document, "dragover", function (a) {
            a.preventDefault()
        }) : l.attach(document, "dragover", function (a) {
            a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.preventDefault())
        }), k = !0)
    }

    function d(a) {
        if (qq.ie() && !qq.ie10()) return !1;
        var b, c = a.dataTransfer,
            d = qq.safari();
        return b = qq.ie10() || qq.ie11() ? !0 : "none" !== c.effectAllowed, c && b && (c.files || !d && c.types.contains && c.types.contains("Files"))
    }

    function e(a) {
        return void 0 !== a && (j = a), j
    }

    function f() {
        function a() {
            b = document.createEvent("Event"), b.initEvent(h.HIDE_ZONES_EVENT_NAME, !0, !0)
        }
        var b;
        if (window.CustomEvent) try {
            b = new CustomEvent(h.HIDE_ZONES_EVENT_NAME)
        } catch (c) {
            a()
        } else a();
        document.dispatchEvent(b)
    }

    function g() {
        l.attach(i, "dragover", function (a) {
            if (d(a)) {
                var b = qq.ie() || qq.ie11() ? null : a.dataTransfer.effectAllowed;
                a.dataTransfer.dropEffect = "move" === b || "linkMove" === b ? "move" : "copy", a.stopPropagation(), a.preventDefault()
            }
        }), l.attach(i, "dragenter", function (a) {
            if (!e()) {
                if (!d(a)) return;
                h.onEnter(a)
            }
        }), l.attach(i, "dragleave", function (a) {
            if (d(a)) {
                h.onLeave(a);
                var b = document.elementFromPoint(a.clientX, a.clientY);
                qq(this).contains(b) || h.onLeaveNotDescendants(a)
            }
        }), l.attach(i, "drop", function (a) {
            if (!e()) {
                if (!d(a)) return;
                a.preventDefault(), a.stopPropagation(), h.onDrop(a), f()
            }
        })
    }
    var h, i, j, k, l = new qq.DisposeSupport;
    h = {
        element: null,
        onEnter: function () {},
        onLeave: function () {},
        onLeaveNotDescendants: function () {},
        onDrop: function () {}
    }, qq.extend(h, a), i = h.element, c(), g(), qq.extend(this, {
        dropDisabled: function (a) {
            return e(a)
        },
        dispose: function () {
            l.dispose()
        },
        getElement: function () {
            return i
        }
    })
}, qq.DeleteFileAjaxRequester = function (a) {
    "use strict";

    function b() {
        return "POST" === d.method.toUpperCase() ? {
            _method: "DELETE"
        } : {}
    }
    var c, d = {
            method: "DELETE",
            uuidParamName: "qquuid",
            endpointStore: {},
            maxConnections: 3,
            customHeaders: {},
            paramsStore: {},
            demoMode: !1,
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function () {},
            onDelete: function () {},
            onDeleteComplete: function () {}
        };
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({
        validMethods: ["POST", "DELETE"],
        method: d.method,
        endpointStore: d.endpointStore,
        paramsStore: d.paramsStore,
        mandatedParams: b(),
        maxConnections: d.maxConnections,
        customHeaders: d.customHeaders,
        demoMode: d.demoMode,
        log: d.log,
        onSend: d.onDelete,
        onComplete: d.onDeleteComplete,
        cors: d.cors
    })), qq.extend(this, {
        sendDelete: function (a, b, e) {
            var f = e || {};
            d.log("Submitting delete file request for " + a), "DELETE" === d.method ? c.initTransport(a).withPath(b).withParams(f).send() : (f[d.uuidParamName] = b, c.initTransport(a).withParams(f).send())
        }
    })
},
function () {
    function a(a) {
        var b = a.naturalWidth,
            c = a.naturalHeight;
        if (b * c > 1048576) {
            var d = document.createElement("canvas");
            d.width = d.height = 1;
            var e = d.getContext("2d");
            return e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3]
        }
        return !1
    }

    function b(a, b, c) {
        var d = document.createElement("canvas");
        d.width = 1, d.height = c;
        var e = d.getContext("2d");
        e.drawImage(a, 0, 0);
        for (var f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g;) {
            var j = f[4 * (i - 1) + 3];
            0 === j ? h = i : g = i, i = h + g >> 1
        }
        var k = i / c;
        return 0 === k ? 1 : k
    }

    function c(a, b, c) {
        var e = document.createElement("canvas"),
            f = b.mime || "image/jpeg";
        return d(a, e, b, c), e.toDataURL(f, b.quality || .8)
    }

    function d(c, d, f, g) {
        var h = c.naturalWidth,
            i = c.naturalHeight,
            j = f.width,
            k = f.height,
            l = d.getContext("2d");
        if (l.save(), e(d, j, k, f.orientation), qq.ios()) {
            var m = a(c);
            m && (h /= 2, i /= 2);
            var n = 1024,
                o = document.createElement("canvas");
            o.width = o.height = n;
            for (var p = o.getContext("2d"), q = g ? b(c, h, i) : 1, r = Math.ceil(n * j / h), s = Math.ceil(n * k / i / q), t = 0, u = 0; i > t;) {
                for (var v = 0, w = 0; h > v;) p.clearRect(0, 0, n, n), p.drawImage(c, -v, -t), l.drawImage(o, 0, 0, n, n, w, u, r, s), v += n, w += r;
                t += n, u += s
            }
            l.restore(), o = p = null
        } else l.drawImage(c, 0, 0, j, k);
        d.qqImageRendered && d.qqImageRendered()
    }

    function e(a, b, c, d) {
        switch (d) {
        case 5:
        case 6:
        case 7:
        case 8:
            a.width = c, a.height = b;
            break;
        default:
            a.width = b, a.height = c
        }
        var e = a.getContext("2d");
        switch (d) {
        case 2:
            e.translate(b, 0), e.scale(-1, 1);
            break;
        case 3:
            e.translate(b, c), e.rotate(Math.PI);
            break;
        case 4:
            e.translate(0, c), e.scale(1, -1);
            break;
        case 5:
            e.rotate(.5 * Math.PI), e.scale(1, -1);
            break;
        case 6:
            e.rotate(.5 * Math.PI), e.translate(0, -c);
            break;
        case 7:
            e.rotate(.5 * Math.PI), e.translate(b, -c), e.scale(-1, 1);
            break;
        case 8:
            e.rotate(-.5 * Math.PI), e.translate(-b, 0)
        }
    }

    function f(a, b) {
        if (window.Blob && a instanceof Blob) {
            var c = new Image,
                d = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
            if (!d) throw Error("No createObjectURL function found to create blob url");
            c.src = d.createObjectURL(a), this.blob = a, a = c
        }
        if (!a.naturalWidth && !a.naturalHeight) {
            var e = this;
            a.onload = function () {
                var a = e.imageLoadListeners;
                a && (e.imageLoadListeners = null, setTimeout(function () {
                    for (var b = 0, c = a.length; c > b; b++) a[b]()
                }, 0))
            }, a.onerror = b, this.imageLoadListeners = []
        }
        this.srcImage = a
    }
    f.prototype.render = function (a, b) {
        if (this.imageLoadListeners) {
            var e = this;
            return this.imageLoadListeners.push(function () {
                e.render(a, b)
            }), void 0
        }
        b = b || {};
        var f = this.srcImage.naturalWidth,
            g = this.srcImage.naturalHeight,
            h = b.width,
            i = b.height,
            j = b.maxWidth,
            k = b.maxHeight,
            l = !this.blob || "image/jpeg" === this.blob.type;
        h && !i ? i = g * h / f << 0 : i && !h ? h = f * i / g << 0 : (h = f, i = g), j && h > j && (h = j, i = g * h / f << 0), k && i > k && (i = k, h = f * i / g << 0);
        var m = {
            width: h,
            height: i
        };
        for (var n in b) m[n] = b[n];
        var o = a.tagName.toLowerCase();
        "img" === o ? a.src = c(this.srcImage, m, l) : "canvas" === o && d(this.srcImage, a, m, l), "function" == typeof this.onrender && this.onrender(a)
    }, "function" == typeof define && define.amd ? define([], function () {
        return f
    }) : this.MegaPixImage = f
}(), qq.ImageGenerator = function (a) {
    "use strict";

    function b(a) {
        return "img" === a.tagName.toLowerCase()
    }

    function c(a) {
        return "canvas" === a.tagName.toLowerCase()
    }

    function d() {
        return void 0 !== (new Image).crossOrigin
    }

    function e() {
        var a = document.createElement("canvas");
        return a.getContext && a.getContext("2d")
    }

    function f(a) {
        var b = a.split("/"),
            c = b[b.length - 1],
            d = qq.getExtension(c);
        switch (d = d && d.toLowerCase()) {
        case "jpeg":
        case "jpg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "bmp":
            return "image/bmp";
        case "gif":
            return "image/gif";
        case "tiff":
        case "tif":
            return "image/tiff"
        }
    }

    function g(a) {
        var b, c, d, e = document.createElement("a");
        return e.href = a, b = e.protocol, d = e.port, c = e.hostname, b.toLowerCase() !== window.location.protocol.toLowerCase() ? !0 : c.toLowerCase() !== window.location.hostname.toLowerCase() ? !0 : d === window.location.port || qq.ie() ? !1 : !0
    }

    function h(b, c) {
        b.onload = function () {
            b.onload = null, b.onerror = null, c.success(b)
        }, b.onerror = function () {
            b.onload = null, b.onerror = null, a("Problem drawing thumbnail!", "error"), c.failure(b, "Problem drawing thumbnail!")
        }
    }

    function i(a, b) {
        a.qqImageRendered = function () {
            b.success(a)
        }
    }

    function j(d, e) {
        var f = b(d) || c(d);
        return b(d) ? h(d, e) : c(d) ? i(d, e) : (e.failure(d), a(qq.format("Element container of type {} is not supported!", d.tagName), "error")), f
    }

    function k(b, c, d) {
        var e = new qq.Promise,
            f = new qq.Identify(b, a),
            g = d.maxSize,
            h = null == d.orient ? !0 : d.orient,
            i = function () {
                c.onerror = null, c.onload = null, a("Could not render preview, file may be too large!", "error"), e.failure(c, "Browser cannot render image!")
            };
        return f.isPreviewable().then(function (d) {
            var f = {
                parse: function () {
                    return (new qq.Promise).success()
                }
            }, k = h ? new qq.Exif(b, a) : f,
                l = new MegaPixImage(b, i);
            j(c, e) && k.parse().then(function (a) {
                var b = a && a.Orientation;
                l.render(c, {
                    maxWidth: g,
                    maxHeight: g,
                    orientation: b,
                    mime: d
                })
            }, function (b) {
                a(qq.format("EXIF data could not be parsed ({}).  Assuming orientation = 1.", b)), l.render(c, {
                    maxWidth: g,
                    maxHeight: g,
                    mime: d
                })
            })
        }, function () {
            a("Not previewable"), e.failure(c, "Not previewable")
        }), e
    }

    function l(a, b, c, d) {
        var e = new Image,
            h = new qq.Promise;
        j(e, h), g(a) && (e.crossOrigin = "anonymous"), e.src = a, h.then(function () {
            j(b, c);
            var g = new MegaPixImage(e);
            g.render(b, {
                maxWidth: d,
                maxHeight: d,
                mime: f(a)
            })
        })
    }

    function m(a, b, c, d) {
        j(b, c), qq(b).css({
            maxWidth: d + "px",
            maxHeight: d + "px"
        }), b.src = a
    }

    function n(a, f, h) {
        var i = new qq.Promise,
            k = h.scale,
            n = k ? h.maxSize : null;
        return k && b(f) ? e() ? g(a) && !d() ? m(a, f, i, n) : l(a, f, i, n) : m(a, f, i, n) : c(f) ? l(a, f, i, n) : j(f, i) && (f.src = a), i
    }
    qq.extend(this, {
        generate: function (b, c, d) {
            return qq.isString(b) ? (a("Attempting to update thumbnail based on server response."), n(b, c, d || {})) : (a("Attempting to draw client-side image preview."), k(b, c, d || {}))
        }
    }), this._testing = {}, this._testing.isImg = b, this._testing.isCanvas = c, this._testing.isCrossOrigin = g, this._testing.determineMimeOfFileName = f
}, qq.Exif = function (a, b) {
    "use strict";

    function c(a) {
        for (var b = 0, c = 0; a.length > 0;) b += parseInt(a.substring(0, 2), 16) * Math.pow(2, c), a = a.substring(2, a.length), c += 8;
        return b
    }

    function d(b, c) {
        var e = b,
            f = c;
        return void 0 === e && (e = 2, f = new qq.Promise), qq.readBlobToHex(a, e, 4).then(function (a) {
            var b = /^ffe([0-9])/.exec(a);
            if (b)
                if ("1" !== b[1]) {
                    var c = parseInt(a.slice(4, 8), 16);
                    d(e + c + 2, f)
                } else f.success(e);
                else f.failure("No EXIF header to be found!")
        }), f
    }

    function e() {
        var b = new qq.Promise;
        return qq.readBlobToHex(a, 0, 6).then(function (a) {
            0 !== a.indexOf("ffd8") ? b.failure("Not a valid JPEG!") : d().then(function (a) {
                b.success(a)
            }, function (a) {
                b.failure(a)
            })
        }), b
    }

    function f(b) {
        var c = new qq.Promise;
        return qq.readBlobToHex(a, b + 10, 2).then(function (a) {
            c.success("4949" === a)
        }), c
    }

    function g(b, d) {
        var e = new qq.Promise;
        return qq.readBlobToHex(a, b + 18, 2).then(function (a) {
            return d ? e.success(c(a)) : (e.success(parseInt(a, 16)), void 0)
        }), e
    }

    function h(b, c) {
        var d = b + 20,
            e = 12 * c;
        return qq.readBlobToHex(a, d, e)
    }

    function i(a) {
        for (var b = [], c = 0; c + 24 <= a.length;) b.push(a.slice(c, c + 24)), c += 24;
        return b
    }

    function j(a, b) {
        var d = 16,
            e = qq.extend([], k),
            f = {};
        return qq.each(b, function (b, g) {
            var h, i, j, k = g.slice(0, 4),
                m = a ? c(k) : parseInt(k, 16),
                n = e.indexOf(m);
            return n >= 0 && (i = l[m].name, j = l[m].bytes, h = g.slice(d, d + 2 * j), f[i] = a ? c(h) : parseInt(h, 16), e.splice(n, 1)), 0 === e.length ? !1 : void 0
        }), f
    }
    var k = [274],
        l = {
            274: {
                name: "Orientation",
                bytes: 2
            }
        };
    qq.extend(this, {
        parse: function () {
            var c = new qq.Promise,
                d = function (a) {
                    b(qq.format("EXIF header parse failed: '{}' ", a)), c.failure(a)
                };
            return e().then(function (e) {
                b(qq.format("Moving forward with EXIF header parsing for '{}'", void 0 === a.name ? "blob" : a.name)), f(e).then(function (a) {
                    b(qq.format("EXIF Byte order is {} endian", a ? "little" : "big")), g(e, a).then(function (f) {
                        b(qq.format("Found {} APP1 directory entries", f)), h(e, f).then(function (d) {
                            var e = i(d),
                                f = j(a, e);
                            b("Successfully parsed some EXIF tags"), c.success(f)
                        }, d)
                    }, d)
                }, d)
            }, d), c
        }
    }), this._testing = {}, this._testing.parseLittleEndian = c
}, qq.Identify = function (a, b) {
    "use strict";

    function c(a, b) {
        var c = !1,
            d = [].concat(a);
        return qq.each(d, function (a, d) {
            return 0 === b.indexOf(d) ? (c = !0, !1) : void 0
        }), c
    }
    qq.extend(this, {
        isPreviewable: function () {
            var d = this,
                e = new qq.Promise,
                f = !1,
                g = void 0 === a.name ? "blob" : a.name;
            return b(qq.format("Attempting to determine if {} can be rendered in this browser", g)), b("First pass: check type attribute of blob object."), this.isPreviewableSync() ? (b("Second pass: check for magic bytes in file header."), qq.readBlobToHex(a, 0, 4).then(function (a) {
                qq.each(d.PREVIEWABLE_MIME_TYPES, function (b, d) {
                    return c(d, a) ? (("image/tiff" !== b || qq.supportedFeatures.tiffPreviews) && (f = !0, e.success(b)), !1) : void 0
                }), b(qq.format("'{}' is {} able to be rendered in this browser", g, f ? "" : "NOT")), f || e.failure()
            }, function () {
                b("Error reading file w/ name '" + a.name + "'.  Not able to be rendered in this browser."), e.failure()
            })) : e.failure(), e
        },
        isPreviewableSync: function () {
            var c = a.type,
                d = qq.indexOf(Object.keys(this.PREVIEWABLE_MIME_TYPES), c) >= 0,
                e = !1;
            return d && (e = "image/tiff" === c ? qq.supportedFeatures.tiffPreviews : !0), !e && b(a.name + " is not previewable in this browser per the blob's type attr"), e
        }
    })
}, qq.Identify.prototype.PREVIEWABLE_MIME_TYPES = {
    "image/jpeg": "ffd8ff",
    "image/gif": "474946",
    "image/png": "89504e",
    "image/bmp": "424d",
    "image/tiff": ["49492a00", "4d4d002a"]
}, qq.ImageValidation = function (a, b) {
    "use strict";

    function c(a) {
        var b = !1;
        return qq.each(a, function (a, c) {
            return c > 0 ? (b = !0, !1) : void 0
        }), b
    }

    function d() {
        var c = new qq.Promise;
        return new qq.Identify(a, b).isPreviewable().then(function () {
            var d = new Image,
                e = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
            e ? (d.onerror = function () {
                b("Cannot determine dimensions for image.  May be too large.", "error"), c.failure()
            }, d.onload = function () {
                c.success({
                    width: this.width,
                    height: this.height
                })
            }, d.src = e.createObjectURL(a)) : (b("No createObjectURL function available to generate image URL!", "error"), c.failure())
        }, c.failure), c
    }

    function e(a, b) {
        var c;
        return qq.each(a, function (a, d) {
            if (d > 0) {
                var e = /(max|min)(Width|Height)/.exec(a),
                    f = e[2].charAt(0).toLowerCase() + e[2].slice(1),
                    g = b[f];
                switch (e[1]) {
                case "min":
                    if (d > g) return c = a, !1;
                    break;
                case "max":
                    if (g > d) return c = a, !1
                }
            }
        }), c
    }
    this.validate = function (a) {
        var f = new qq.Promise;
        return b("Attempting to validate image."), c(a) ? d().then(function (b) {
            var c = e(a, b);
            c ? f.failure(c) : f.success()
        }, f.success) : f.success(), f
    }
}, qq.Session = function (a) {
    "use strict";

    function b(a) {
        return qq.isArray(a) ? !0 : (d.log("Session response is not an array.", "error"), void 0)
    }

    function c(a, c, e, f) {
        var g = !1;
        c = c && b(a), c && qq.each(a, function (a, b) {
            if (null == b.uuid) g = !0, d.log(qq.format("Session response item {} did not include a valid UUID - ignoring.", a), "error");
            else if (null == b.name) g = !0, d.log(qq.format("Session response item {} did not include a valid name - ignoring.", a), "error");
            else try {
                return d.addFileRecord(b), !0
            } catch (c) {
                g = !0, d.log(c.message, "error")
            }
            return !1
        }), f[c && !g ? "success" : "failure"](a, e)
    }
    var d = {
        endpoint: null,
        params: {},
        customHeaders: {},
        cors: {},
        addFileRecord: function () {},
        log: function () {}
    };
    qq.extend(d, a, !0), this.refresh = function () {
        var a = new qq.Promise,
            b = function (b, d, e) {
                c(b, d, e, a)
            }, e = qq.extend({}, d),
            f = new qq.SessionAjaxRequester(qq.extend(e, {
                onComplete: b
            }));
        return f.queryServer(), a
    }
}, qq.SessionAjaxRequester = function (a) {
    "use strict";

    function b(a, b, c) {
        var e = null;
        if (null != b.responseText) try {
            e = qq.parseJson(b.responseText)
        } catch (f) {
            d.log("Problem parsing session response: " + f.message, "error"), c = !0
        }
        d.onComplete(e, !c, b)
    }
    var c, d = {
            endpoint: null,
            customHeaders: {},
            params: {},
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            onComplete: function () {},
            log: function () {}
        };
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({
        validMethods: ["GET"],
        method: "GET",
        endpointStore: {
            get: function () {
                return d.endpoint
            }
        },
        customHeaders: d.customHeaders,
        log: d.log,
        onComplete: b,
        cors: d.cors
    })), qq.extend(this, {
        queryServer: function () {
            var a = qq.extend({}, d.params);
            d.log("Session query request."), c.initTransport("sessionRefresh").withParams(a).withCacheBuster().send()
        }
    })
}, qq.FormSupport = function (a, b, c) {
    "use strict";

    function d(a) {
        a.getAttribute("action") && (h.newEndpoint = a.getAttribute("action"))
    }

    function e(a, b) {
        return !a.checkValidity || a.checkValidity() ? !0 : (c("Form did not pass validation checks - will not upload.", "error"), b(), void 0)
    }

    function f(a) {
        var c = a.submit;
        qq(a).attach("submit", function (d) {
            d = d || window.event, d.preventDefault ? d.preventDefault() : d.returnValue = !1, e(a, c) && b()
        }), a.submit = function () {
            e(a, c) && b()
        }
    }

    function g(a) {
        return a && (qq.isString(a) && (a = document.getElementById(a)), a && (c("Attaching to form element."), d(a), i && f(a))), a
    }
    var h = this,
        i = a.interceptSubmit,
        j = a.element,
        k = a.autoUpload;
    qq.extend(this, {
        newEndpoint: null,
        newAutoUpload: k,
        attachedToForm: !1,
        getFormInputsAsObject: function () {
            return null == j ? null : h._form2Obj(j)
        }
    }), j = g(j), this.attachedToForm = !! j
}, qq.extend(qq.FormSupport.prototype, {
    _form2Obj: function (a) {
        "use strict";
        var b = {}, c = function (a) {
                var b = ["button", "image", "reset", "submit"];
                return qq.indexOf(b, a.toLowerCase()) < 0
            }, d = function (a) {
                return qq.indexOf(["checkbox", "radio"], a.toLowerCase()) >= 0
            }, e = function (a) {
                return d(a.type) && !a.checked ? !0 : a.disabled && "hidden" !== a.type.toLowerCase()
            }, f = function (a) {
                var b = null;
                return qq.each(qq(a).children(), function (a, c) {
                    return "option" === c.tagName.toLowerCase() && c.selected ? (b = c.value, !1) : void 0
                }), b
            };
        return qq.each(a.elements, function (a, d) {
            if (qq.isInput(d, !0) && c(d.type) && !e(d)) b[d.name] = d.value;
            else if ("select" === d.tagName.toLowerCase() && !e(d)) {
                var g = f(d);
                null !== g && (b[d.name] = g)
            }
        }), b
    }
}), qq.Scaler = function (a, b) {
    "use strict";
    var c = a.sendOriginal,
        d = a.orient,
        e = a.defaultType,
        f = a.defaultQuality / 100,
        g = a.failureText,
        h = a.includeExif,
        i = this._getSortedSizes(a.sizes);
    qq.extend(this, {
        enabled: qq.supportedFeatures.scaling && i.length > 0,
        getFileRecords: function (a, j, k) {
            var l = this,
                m = [],
                n = k.blob ? k.blob : k,
                o = new qq.Identify(n, b);
            return o.isPreviewableSync() && qq.each(i, function (a, c) {
                var i = l._determineOutputType({
                    defaultType: e,
                    requestedType: c.type,
                    refType: n.type
                });
                m.push({
                    uuid: qq.getUniqueId(),
                    name: l._getName(j, {
                        name: c.name,
                        type: i,
                        refType: n.type
                    }),
                    blob: new qq.BlobProxy(n, qq.bind(l._generateScaledImage, l, {
                        maxSize: c.maxSize,
                        orient: d,
                        type: i,
                        quality: f,
                        failedText: g,
                        includeExif: h,
                        log: b
                    }))
                })
            }), c && m.push({
                uuid: a,
                name: j,
                blob: n
            }), m
        },
        handleNewFile: function (a, b, c, d, e, f, g) {
            var h = this,
                i = (a.qqButtonId || a.blob && a.blob.qqButtonId, []),
                j = null,
                k = g.addFileToHandler,
                l = g.uploadData,
                m = g.paramsStore;
            qq.each(h.getFileRecords(c, b, a), function (b, c) {
                var f, g = a,
                    h = d;
                c.blob instanceof qq.BlobProxy && (g = c.blob, h = -1), f = l.addFile(c.uuid, c.name, h), c.blob instanceof qq.BlobProxy ? i.push(f) : j = f, k(f, g), e.push({
                    id: f,
                    file: g
                })
            }), i.length && (qq.each(i, function (a, b) {
                null === j ? l.setGroupIds(b, i) : l.setGroupIds(b, i.concat([j]))
            }), null !== j && l.setGroupIds(j, i.concat([j]))), null !== j && (qq.each(i, function (a, b) {
                var c = {
                    qqparentuuid: l.retrieve({
                        id: j
                    }).uuid,
                    qqparentsize: l.retrieve({
                        id: j
                    }).size
                };
                c[f] = l.retrieve({
                    id: b
                }).uuid, l.setParentId(b, j), m.addReadOnly(b, c)
            }), i.length && ! function () {
                var a = {};
                a[f] = l.retrieve({
                    id: j
                }).uuid, m.addReadOnly(j, a)
            }())
        }
    })
}, qq.extend(qq.Scaler.prototype, {
    scaleImage: function (a, b, c) {
        "use strict";
        if (!qq.supportedFeatures.scaling) throw new qq.Error("Scaling is not supported in this browser!");
        var d = new qq.Promise,
            e = c.log,
            f = c.getFile(a),
            g = c.uploadData.retrieve({
                id: a
            }),
            h = g && g.name,
            i = g && g.uuid,
            j = {
                sendOriginal: !1,
                orient: b.orient,
                defaultType: b.type || null,
                defaultQuality: b.quality,
                failedToScaleText: "Unable to scale",
                sizes: [{
                    name: "",
                    maxSize: b.maxSize
                }]
            }, k = new qq.Scaler(j, e);
        return qq.Scaler && qq.supportedFeatures.imagePreviews && f ? qq.bind(function () {
            var b;
            b = k.getFileRecords(i, h, f)[0], b ? b.blob.create().then(d.success, d.failure) : (e(a + " is not a scalable image!", "error"), d.failure())
        }, this)() : (d.failure(), e("Could not generate requested scaled image for " + a + ".  " + "Scaling is either not possible in this browser, or the file could not be located.", "error")), d
    },
    _determineOutputType: function (a) {
        "use strict";
        var b = a.requestedType,
            c = a.defaultType,
            d = a.refType;
        return c || b ? b ? qq.indexOf(Object.keys(qq.Identify.prototype.PREVIEWABLE_MIME_TYPES), b) >= 0 ? "image/tiff" === b ? qq.supportedFeatures.tiffPreviews ? b : c : b : c : c : "image/jpeg" !== d ? "image/png" : d
    },
    _getName: function (a, b) {
        "use strict";
        var c = a.lastIndexOf("."),
            d = " (" + b.name + ")",
            e = b.type || "image/png",
            f = b.refType,
            g = "",
            h = qq.getExtension(a);
        return c >= 0 ? (g = a.substr(0, c), f !== e && (h = e.split("/")[1]), g += d + "." + h) : g = a + d, g
    },
    _getSortedSizes: function (a) {
        "use strict";
        return a = qq.extend([], a), a.sort(function (a, b) {
            return a.maxSize > b.maxSize ? 1 : a.maxSize < b.maxSize ? -1 : 0
        })
    },
    _generateScaledImage: function (a, b) {
        "use strict";
        var c = this,
            d = a.log,
            e = a.maxSize,
            f = a.orient,
            g = a.type,
            h = a.quality,
            i = a.failedText,
            j = a.includeExif && "image/jpeg" === b.type && "image/jpeg" === g,
            k = new qq.Promise,
            l = new qq.ImageGenerator(d),
            m = document.createElement("canvas");
        return d("Attempting to generate scaled version for " + b.name), l.generate(b, m, {
            maxSize: e,
            orient: f
        }).then(function () {
            var a = m.toDataURL(g, h),
                e = function () {
                    d("Success generating scaled version for " + b.name);
                    var e = c._dataUriToBlob(a);
                    k.success(e)
                };
            j ? c._insertExifHeader(b, a, d).then(function (b) {
                a = b, e()
            }, function () {
                d("Problem inserting EXIF header into scaled image.  Using scaled image w/out EXIF data.", "error"), e()
            }) : e()
        }, function () {
            d("Failed attempt to generate scaled version for " + b.name, "error"), k.failure(i)
        }), k
    },
    _insertExifHeader: function (a, b, c) {
        "use strict";
        var d = new FileReader,
            e = new qq.Promise,
            f = "";
        return d.onload = function () {
            f = d.result, e.success(ExifRestorer.restore(f, b))
        }, d.onerror = function () {
            c("Problem reading " + a.name + " during attempt to transfer EXIF data to scaled version.", "error"), e.failure()
        }, d.readAsDataURL(a), e
    },
    _dataUriToBlob: function (a) {
        "use strict";
        var b, c, d, e;
        return b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURI(a.split(",")[1]), c = a.split(",")[0].split(":")[1].split(";")[0], d = new ArrayBuffer(b.length), e = new Uint8Array(d), qq.each(b, function (a, b) {
            e[a] = b.charCodeAt(0)
        }), this._createBlob(d, c)
    },
    _createBlob: function (a, b) {
        "use strict";
        var c = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
            d = c && new c;
        return d ? (d.append(a), d.getBlob(b)) : new Blob([a], {
            type: b
        })
    }
});
var ExifRestorer = function () {
    var a = {};
    return a.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.encode64 = function (a) {
        var b, c, d, e, f, g = "",
            h = "",
            i = "",
            j = 0;
        do b = a[j++], c = a[j++], h = a[j++], d = b >> 2, e = (3 & b) << 4 | c >> 4, f = (15 & c) << 2 | h >> 6, i = 63 & h, isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64), g = g + this.KEY_STR.charAt(d) + this.KEY_STR.charAt(e) + this.KEY_STR.charAt(f) + this.KEY_STR.charAt(i), b = c = h = "", d = e = f = i = ""; while (j < a.length);
        return g
    }, a.restore = function (a, b) {
        var c = "data:image/jpeg;base64,";
        if (!a.match(c)) return b;
        var d = this.decode64(a.replace(c, "")),
            e = this.slice2Segments(d),
            f = this.exifManipulation(b, e);
        return c + this.encode64(f)
    }, a.exifManipulation = function (a, b) {
        var c = this.getExifArray(b),
            d = this.insertExif(a, c),
            e = new Uint8Array(d);
        return e
    }, a.getExifArray = function (a) {
        for (var b, c = 0; c < a.length; c++)
            if (b = a[c], 255 == b[0] & 225 == b[1]) return b;
        return []
    }, a.insertExif = function (a, b) {
        var c = a.replace("data:image/jpeg;base64,", ""),
            d = this.decode64(c),
            e = d.indexOf(255, 3),
            f = d.slice(0, e),
            g = d.slice(e),
            h = f;
        return h = h.concat(b), h = h.concat(g)
    }, a.slice2Segments = function (a) {
        for (var b = 0, c = [];;) {
            if (255 == a[b] & 218 == a[b + 1]) break;
            if (255 == a[b] & 216 == a[b + 1]) b += 2;
            else {
                var d = 256 * a[b + 2] + a[b + 3],
                    e = b + d + 2,
                    f = a.slice(b, e);
                c.push(f), b = e
            } if (b > a.length) break
        }
        return c
    }, a.decode64 = function (a) {
        var b, c, d, e, f, g = "",
            h = "",
            i = 0,
            j = [],
            k = /[^A-Za-z0-9\+\/\=]/g;
        if (k.exec(a)) throw new Error("There were invalid base64 characters in the input text.  Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='");
        a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do d = this.KEY_STR.indexOf(a.charAt(i++)), e = this.KEY_STR.indexOf(a.charAt(i++)), f = this.KEY_STR.indexOf(a.charAt(i++)), h = this.KEY_STR.indexOf(a.charAt(i++)), b = d << 2 | e >> 4, c = (15 & e) << 4 | f >> 2, g = (3 & f) << 6 | h, j.push(b), 64 != f && j.push(c), 64 != h && j.push(g), b = c = g = "", d = e = f = h = ""; while (i < a.length);
        return j
    }, a
}();
qq.TotalProgress = function (a, b) {
    "use strict";
    var c = {}, d = 0,
        e = 0,
        f = function (a, b) {
            var c = !0;
            return qq.each(a, function (a, d) {
                return qq.indexOf(b, d) >= 0 ? (c = !1, !1) : void 0
            }), c
        }, g = function (a) {
            j(a, -1, -1), delete c[a]
        }, h = function (b, c, d) {
            (0 === c.length || f(c, d)) && (a(e, e), this.reset())
        }, i = function (a) {
            var d = b(a);
            d > 0 && (j(a, 0, d), c[a] = {
                loaded: 0,
                total: d
            })
        }, j = function (b, f, g) {
            var h = c[b] ? c[b].loaded : 0,
                i = c[b] ? c[b].total : 0; - 1 === f && -1 === g ? (d -= h, e -= i) : (f && (d += f - h), g && (e += g - i)), a(d, e)
        };
    qq.extend(this, {
        onAllComplete: h,
        onStatusChange: function (a, b, c) {
            c === qq.status.CANCELED ? g(a) : c === qq.status.SUBMITTED && i(a)
        },
        onIndividualProgress: function (a, b, d) {
            j(a, b, d), c[a] = {
                loaded: b,
                total: d
            }
        },
        onNewSize: function (a) {
            i(a)
        },
        reset: function () {
            c = {}, d = 0, e = 0
        }
    })
}, qq.UiEventHandler = function (a, b) {
    "use strict";

    function c(a) {
        d.attach(a, e.eventType, function (a) {
            a = a || window.event;
            var b = a.target || a.srcElement;
            e.onHandled(b, a)
        })
    }
    var d = new qq.DisposeSupport,
        e = {
            eventType: "click",
            attachTo: null,
            onHandled: function () {}
        };
    qq.extend(this, {
        addHandler: function (a) {
            c(a)
        },
        dispose: function () {
            d.dispose()
        }
    }), qq.extend(b, {
        getFileIdFromItem: function (a) {
            return a.qqFileId
        },
        getDisposeSupport: function () {
            return d
        }
    }), qq.extend(e, a), e.attachTo && c(e.attachTo)
}, qq.FileButtonsClickHandler = function (a) {
    "use strict";

    function b(a, b) {
        qq.each(e, function (c, e) {
            var f, g = c.charAt(0).toUpperCase() + c.slice(1);
            return d.templating["is" + g](a) ? (f = d.templating.getFileId(a), qq.preventDefault(b), d.log(qq.format("Detected valid file button click event on file '{}', ID: {}.", d.onGetName(f), f)), e(f), !1) : void 0
        })
    }
    var c = {}, d = {
            templating: null,
            log: function () {},
            onDeleteFile: function () {},
            onCancel: function () {},
            onRetry: function () {},
            onPause: function () {},
            onContinue: function () {},
            onGetName: function () {}
        }, e = {
            cancel: function (a) {
                d.onCancel(a)
            },
            retry: function (a) {
                d.onRetry(a)
            },
            deleteButton: function (a) {
                d.onDeleteFile(a)
            },
            pause: function (a) {
                d.onPause(a)
            },
            continueButton: function (a) {
                d.onContinue(a)
            }
        };
    qq.extend(d, a), d.eventType = "click", d.onHandled = b, d.attachTo = d.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(d, c))
}, qq.FilenameClickHandler = function (a) {
    "use strict";

    function b(a, b) {
        if (d.templating.isFileName(a) || d.templating.isEditIcon(a)) {
            var e = d.templating.getFileId(a),
                f = d.onGetUploadStatus(e);
            f === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename click event on file '{}', ID: {}.", d.onGetName(e), e)), qq.preventDefault(b), c.handleFilenameEdit(e, a, !0))
        }
    }
    var c = {}, d = {
            templating: null,
            log: function () {},
            classes: {
                file: "qq-upload-file",
                editNameIcon: "qq-edit-filename-icon"
            },
            onGetUploadStatus: function () {},
            onGetName: function () {}
        };
    qq.extend(d, a), d.eventType = "click", d.onHandled = b, qq.extend(this, new qq.FilenameEditHandler(d, c))
}, qq.FilenameInputFocusInHandler = function (a, b) {
    "use strict";

    function c(a) {
        if (d.templating.isEditInput(a)) {
            var c = d.templating.getFileId(a),
                e = d.onGetUploadStatus(c);
            e === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename input focus event on file '{}', ID: {}.", d.onGetName(c), c)), b.handleFilenameEdit(c, a))
        }
    }
    var d = {
        templating: null,
        onGetUploadStatus: function () {},
        log: function () {}
    };
    b || (b = {}), d.eventType = "focusin", d.onHandled = c, qq.extend(d, a), qq.extend(this, new qq.FilenameEditHandler(d, b))
}, qq.FilenameInputFocusHandler = function (a) {
    "use strict";
    a.eventType = "focus", a.attachTo = null, qq.extend(this, new qq.FilenameInputFocusInHandler(a, {}))
}, qq.FilenameEditHandler = function (a, b) {
    "use strict";

    function c(a) {
        var b = h.onGetName(a),
            c = b.lastIndexOf(".");
        return c > 0 && (b = b.substr(0, c)), b
    }

    function d(a) {
        var b = h.onGetName(a);
        return qq.getExtension(b)
    }

    function e(a, b) {
        var c, e = a.value;
        void 0 !== e && qq.trimStr(e).length > 0 && (c = d(b), void 0 !== c && (e = e + "." + c), h.onSetName(b, e)), h.onEditingStatusChange(b, !1)
    }

    function f(a, c) {
        b.getDisposeSupport().attach(a, "blur", function () {
            e(a, c)
        })
    }

    function g(a, c) {
        b.getDisposeSupport().attach(a, "keyup", function (b) {
            var d = b.keyCode || b.which;
            13 === d && e(a, c)
        })
    }
    var h = {
        templating: null,
        log: function () {},
        onGetUploadStatus: function () {},
        onGetName: function () {},
        onSetName: function () {},
        onEditingStatusChange: function () {}
    };
    qq.extend(h, a), h.attachTo = h.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(h, b)), qq.extend(b, {
        handleFilenameEdit: function (a, b, d) {
            var e = h.templating.getEditInput(a);
            h.onEditingStatusChange(a, !0), e.value = c(a), d && e.focus(), f(e, a), g(e, a)
        }
    })
},
function (a) {
    "use strict";

    function b(a) {
        var b = h(a || {}),
            d = c(b);
        return e(d), g(b, d), l
    }

    function c(a) {
        var b = f("uploaderType"),
            c = f("endpointType");
        return b ? (b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase(), c ? new qq[c]["FineUploader" + b](a) : new qq["FineUploader" + b](a)) : c ? new qq[c].FineUploader(a) : new qq.FineUploader(a)
    }

    function d(a, b) {
        var c = l.data("fineuploader");
        return b ? (void 0 === c && (c = {}), c[a] = b, l.data("fineuploader", c), void 0) : void 0 === c ? null : c[a]
    }

    function e(a) {
        return d("uploader", a)
    }

    function f(a, b) {
        return d(a, b)
    }

    function g(b, c) {
        var d = b.callbacks = {};
        a.each(c._options.callbacks, function (b, c) {
            var e, f;
            e = /^on(\w+)/.exec(b)[1], e = e.substring(0, 1).toLowerCase() + e.substring(1), f = l, d[b] = function () {
                var b, d, g = Array.prototype.slice.call(arguments),
                    h = [];
                a.each(g, function (a, b) {
                    h.push(k(b))
                }), b = c.apply(this, g);
                try {
                    d = f.triggerHandler(e, h)
                } catch (i) {
                    qq.log("Caught error in Fine Uploader jQuery event handler: " + i.message, "error")
                }
                return null != b ? b : d
            }
        }), c._options.callbacks = d
    }

    function h(b, c) {
        var d, e;
        return d = void 0 === c ? "basic" !== b.uploaderType ? {
            element: l[0]
        } : {} : c, a.each(b, function (b, c) {
            a.inArray(b, m) >= 0 ? f(b, c) : c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, h(c, d[b])) : a.isArray(c) ? (e = [], a.each(c, function (b, c) {
                var d = {};
                c instanceof a ? a.merge(e, c) : a.isPlainObject(c) ? (h(c, d), e.push(d)) : e.push(c)
            }), d[b] = e) : d[b] = c
        }), void 0 === c ? d : void 0
    }

    function i(b) {
        return "string" === a.type(b) && !b.match(/^_/) && void 0 !== e()[b]
    }

    function j(a) {
        var b, c = [],
            d = Array.prototype.slice.call(arguments, 1);
        return h(d, c), b = e()[a].apply(e(), c), k(b)
    }

    function k(b) {
        var c = b;
        return null == b || "object" != typeof b || 1 !== b.nodeType && 9 !== b.nodeType || !b.cloneNode || (c = a(b)), c
    }
    var l, m = ["uploaderType", "endpointType"];
    a.fn.fineUploader = function (c) {
        var d = this,
            f = arguments,
            g = [];
        return this.each(function (h, k) {
            if (l = a(k), e() && i(c)) {
                if (g.push(j.apply(d, f)), 1 === d.length) return !1
            } else "object" != typeof c && c ? a.error("Method " + c + " does not exist on jQuery.fineUploader") : b.apply(d, f)
        }), 1 === g.length ? g[0] : g.length > 1 ? g : this
    }
}(jQuery),
function (a) {
    "use strict";

    function b(a) {
        a || (a = {}), a.dropZoneElements = [i];
        var b = f(a);
        return e(b), d(new qq.DragAndDrop(b)), i
    }

    function c(a, b) {
        var c = i.data(j);
        return b ? (void 0 === c && (c = {}), c[a] = b, i.data(j, c), void 0) : void 0 === c ? null : c[a]
    }

    function d(a) {
        return c("dndInstance", a)
    }

    function e(b) {
        var c = b.callbacks = {};
        a.each(new qq.DragAndDrop.callbacks, function (a) {
            var b, d = a;
            b = i, c[a] = function () {
                var a = Array.prototype.slice.call(arguments),
                    c = b.triggerHandler(d, a);
                return c
            }
        })
    }

    function f(b, c) {
        var d, e;
        return d = void 0 === c ? {} : c, a.each(b, function (b, c) {
            c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, f(c, d[b])) : a.isArray(c) ? (e = [], a.each(c, function (b, c) {
                c instanceof a ? a.merge(e, c) : e.push(c)
            }), d[b] = e) : d[b] = c
        }), void 0 === c ? d : void 0
    }

    function g(b) {
        return "string" === a.type(b) && "dispose" === b && void 0 !== d()[b]
    }

    function h(a) {
        var b = [],
            c = Array.prototype.slice.call(arguments, 1);
        return f(c, b), d()[a].apply(d(), b)
    }
    var i, j = "fineUploaderDnd";
    a.fn.fineUploaderDnd = function (c) {
        var e = this,
            f = arguments,
            j = [];
        return this.each(function (k, l) {
            if (i = a(l), d() && g(c)) {
                if (j.push(h.apply(e, f)), 1 === e.length) return !1
            } else "object" != typeof c && c ? a.error("Method " + c + " does not exist in Fine Uploader's DnD module.") : b.apply(e, f)
        }), 1 === j.length ? j[0] : j.length > 1 ? j : this
    }
}(jQuery), qq.s3 = qq.s3 || {}, qq.s3.util = qq.s3.util || function () {
    "use strict";
    return {
        AWS_PARAM_PREFIX: "x-amz-meta-",
        SESSION_TOKEN_PARAM_NAME: "x-amz-security-token",
        REDUCED_REDUNDANCY_PARAM_NAME: "x-amz-storage-class",
        REDUCED_REDUNDANCY_PARAM_VALUE: "REDUCED_REDUNDANCY",
        SERVER_SIDE_ENCRYPTION_PARAM_NAME: "x-amz-server-side-encryption",
        SERVER_SIDE_ENCRYPTION_PARAM_VALUE: "AES256",
        getBucket: function (a) {
            var b, c = [/^(?:https?:\/\/)?([a-z0-9.\-_]+)\.s3(?:-[a-z0-9\-]+)?\.amazonaws\.com/i, /^(?:https?:\/\/)?s3(?:-[a-z0-9\-]+)?\.amazonaws\.com\/([a-z0-9.\-_]+)/i, /^(?:https?:\/\/)?([a-z0-9.\-_]+)/i];
            return qq.each(c, function (c, d) {
                var e = d.exec(a);
                return e ? (b = e[1], !1) : void 0
            }), b
        },
        getPolicy: function (a) {
            var b = {}, c = [],
                d = qq.s3.util.getBucket(a.endpoint),
                e = a.key,
                f = a.acl,
                g = a.type,
                h = new Date,
                i = a.expectedStatus,
                j = a.sessionToken,
                k = a.params,
                l = qq.s3.util.getSuccessRedirectAbsoluteUrl(a.successRedirectUrl),
                m = a.minFileSize,
                n = a.maxFileSize,
                o = a.reducedRedundancy,
                p = a.serverSideEncryption;
            return b.expiration = qq.s3.util.getPolicyExpirationDate(h), c.push({
                acl: f
            }), c.push({
                bucket: d
            }), g && c.push({
                "Content-Type": g
            }), i && c.push({
                success_action_status: i.toString()
            }), l && c.push({
                success_action_redirect: l
            }), o && (c.push({}), c[c.length - 1][qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), j && (c.push({}), c[c.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = j), p && (c.push({}), c[c.length - 1][qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), c.push({
                key: e
            }), qq.each(k, function (a, b) {
                var d = qq.s3.util.AWS_PARAM_PREFIX + a,
                    e = {};
                e[d] = encodeURIComponent(b), c.push(e)
            }), b.conditions = c, qq.s3.util.enforceSizeLimits(b, m, n), b
        },
        refreshPolicyCredentials: function (a, b) {
            var c = !1;
            qq.each(a.conditions, function (a, d) {
                qq.each(d, function (a) {
                    a === qq.s3.util.SESSION_TOKEN_PARAM_NAME && (d[a] = b, c = !0)
                })
            }), c || (a.conditions.push({}), a.conditions[a.conditions.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = b)
        },
        generateAwsParams: function (a, b) {
            var c = {}, d = a.params,
                e = new qq.Promise,
                f = qq.s3.util.getPolicy(a),
                g = a.sessionToken,
                h = a.type,
                i = a.key,
                j = a.accessKey,
                k = a.acl,
                l = a.expectedStatus,
                m = qq.s3.util.getSuccessRedirectAbsoluteUrl(a.successRedirectUrl),
                n = a.reducedRedundancy,
                o = a.serverSideEncryption,
                p = a.log;
            return c.key = i, c.AWSAccessKeyId = j, h && (c["Content-Type"] = h), l && (c.success_action_status = l), m && (c.success_action_redirect = m), n && (c[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), o && (c[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), g && (c[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = g), c.acl = k, qq.each(d, function (a, b) {
                var d = qq.s3.util.AWS_PARAM_PREFIX + a;
                c[d] = encodeURIComponent(b)
            }), b(f).then(function (a, b, d) {
                c.policy = a.policy, c.signature = a.signature, b && (c.AWSAccessKeyId = b), d && (c[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = d), e.success(c)
            }, function (a) {
                a = a || "Can't continue further with request to S3 as we did not receive a valid signature and policy from the server.", p("Policy signing failed.  " + a, "error"), e.failure(a)
            }), e
        },
        enforceSizeLimits: function (a, b, c) {
            var d = 0 > b ? 0 : b,
                e = 0 >= c ? 9007199254740992 : c;
            (b > 0 || c > 0) && a.conditions.push(["content-length-range", d.toString(), e.toString()])
        },
        getPolicyExpirationDate: function (a) {
            if (a.setMinutes(a.getMinutes() + 5), Date.prototype.toISOString) return a.toISOString();
            var b = function (a) {
                var b = String(a);
                return 1 === b.length && (b = "0" + b), b
            };
            return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
        },
        parseIframeResponse: function (a) {
            var b = a.contentDocument || a.contentWindow.document,
                c = b.location.search,
                d = /bucket=(.+)&key=(.+)&etag=(.+)/.exec(c);
            return d ? {
                bucket: d[1],
                key: d[2],
                etag: d[3].replace(/%22/g, "")
            } : void 0
        },
        getSuccessRedirectAbsoluteUrl: function (a) {
            if (a) {
                var b, c = document.createElement("div");
                return qq.ie7() ? (c.innerHTML = "<a href='" + a + "'></a>", b = c.firstChild, b.href) : (b = document.createElement("a"), b.href = a, b.href = b.href, b.href)
            }
        },
        encodeQueryStringParam: function (a) {
            var b = encodeURIComponent(a);
            return b = b.replace(/[!'()]/g, escape), b = b.replace(/\*/g, "%2A"), b.replace(/%20/g, "+")
        }
    }
}(), qq.AbstractNonTraditionalUploadHandlerXhr = function (a) {
    "use strict";
    var b = this,
        c = a.options,
        d = a.proxy,
        e = c.chunking,
        f = c.resume,
        g = c.namespace,
        h = d.onUuidChanged,
        i = c.resumeEnabled,
        j = d.getEndpoint,
        k = d.getName,
        l = d.getSize,
        m = d.getUuid,
        n = d.getDataByUuid,
        o = d.log,
        p = new qq.AbstractUploadHandlerXhr(a);
    qq.extend(this, p), qq.extend(this, {
        getResumableFilesData: function () {
            return b._getResumableFilesData()
        },
        getThirdPartyFileId: function (a) {
            return b._getFileState(a).key
        },
        _shouldChunkThisFile: function (a) {
            var c, d = b._getFileState(a);
            return d.chunking || (d.chunking = {}, c = b._getTotalChunks(a), c > 1 ? (d.chunking.enabled = !0, d.chunking.parts = c) : d.chunking.enabled = !1), d.chunking.enabled
        },
        _maybePrepareForResume: function (a) {
            var c, d, e = b._getFileState(a);
            i && void 0 === e.key && (c = b._getLocalStorageId(a), d = localStorage.getItem(c), d && (d = JSON.parse(d), n(d.uuid) ? b._markNotResumable(a) : (o(qq.format("Identified file with ID {} and name of {} as resumable.", a, k(a))), h(a, d.uuid), e.key = d.key, e.loaded = d.loaded, e.chunking = d.chunking)))
        },
        _isUploading: function () {},
        _maybePersistChunkedState: function (a) {
            var c, d, e = b._getFileState(a);
            i && b.isResumable(a) && (c = b._getLocalStorageId(a), d = {
                name: k(a),
                size: l(a),
                uuid: m(a),
                key: e.key,
                loaded: e.loaded,
                chunking: e.chunking,
                lastUpdated: Date.now()
            }, localStorage.setItem(c, JSON.stringify(d)))
        },
        _maybeDeletePersistedChunkData: function (a) {
            var c;
            return i && b.isResumable(a) && (c = b._getLocalStorageId(a), c && localStorage.getItem(c)) ? (localStorage.removeItem(c), !0) : !1
        },
        _iterateResumeRecords: function (a) {
            i && qq.each(localStorage, function (b, c) {
                if (0 === b.indexOf(qq.format("qq{}resume-", g))) {
                    var d = JSON.parse(c);
                    a(b, d)
                }
            })
        },
        _getResumableFilesData: function () {
            var a = [];
            return b._iterateResumeRecords(function (b, c) {
                a.push({
                    name: c.name,
                    size: c.size,
                    uuid: c.uuid,
                    partIdx: c.chunking.lastSent + 1,
                    key: c.key
                })
            }), a
        },
        _removeExpiredChunkingRecords: function () {
            var a = f.recordsExpireIn;
            b._iterateResumeRecords(function (b, c) {
                var d = new Date(c.lastUpdated);
                d.setDate(d.getDate() + a), d.getTime() <= Date.now() && (o("Removing expired resume record with key " + b), localStorage.removeItem(b))
            })
        },
        _getLocalStorageId: function (a) {
            var b = k(a),
                c = l(a),
                d = e.partSize,
                f = j(a);
            return qq.format("qq{}resume-{}-{}-{}-{}", g, b, c, d, f)
        }
    }), qq.override(this, function (a) {
        return {
            add: function (c) {
                a.add.apply(this, arguments), i && b._maybePrepareForResume(c)
            }
        }
    })
},
function () {
    "use strict";
    qq.nonTraditionalBasePublicApi = {
        setUploadSuccessParams: function (a, b) {
            this._uploadSuccessParamsStore.set(a, b)
        }
    }, qq.nonTraditionalBasePrivateApi = {
        _onComplete: function (a, b, c, d) {
            var e, f, g = c.success ? !0 : !1,
                h = this,
                i = arguments,
                j = this._options.uploadSuccess.endpoint,
                k = this._options.uploadSuccess.customHeaders,
                l = this._options.cors,
                m = new qq.Promise,
                n = this._uploadSuccessParamsStore.get(a),
                o = function (b) {
                    delete h._failedSuccessRequestCallbacks[a], qq.extend(c, b), qq.FineUploaderBasic.prototype._onComplete.apply(h, i), m.success(b)
                }, p = function (f) {
                    var g = e;
                    qq.extend(c, f), c && c.reset && (g = null), g ? h._failedSuccessRequestCallbacks[a] = g : delete h._failedSuccessRequestCallbacks[a], h._onAutoRetry(a, b, c, d, g) || (qq.FineUploaderBasic.prototype._onComplete.apply(h, i), m.failure(f))
                };
            return g && j ? (f = new qq.UploadSuccessAjaxRequester({
                endpoint: j,
                customHeaders: k,
                cors: l,
                log: qq.bind(this.log, this)
            }), qq.extend(n, h._getEndpointSpecificParams(a, c, d), !0), e = qq.bind(function () {
                f.sendSuccessRequest(a, n).then(o, p)
            }, h), e(), m) : qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments)
        },
        _manualRetry: function (a) {
            var b = this._failedSuccessRequestCallbacks[a];
            return qq.FineUploaderBasic.prototype._manualRetry.call(this, a, b)
        }
    }
}(),
function () {
    "use strict";
    qq.s3.FineUploaderBasic = function (a) {
        var b = {
            request: {
                accessKey: null
            },
            objectProperties: {
                acl: "private",
                key: "uuid",
                reducedRedundancy: !1,
                serverSideEncryption: !1
            },
            credentials: {
                accessKey: null,
                secretKey: null,
                expiration: null,
                sessionToken: null
            },
            signature: {
                endpoint: null,
                customHeaders: {}
            },
            uploadSuccess: {
                endpoint: null,
                params: {},
                customHeaders: {}
            },
            iframeSupport: {
                localBlankPagePath: null
            },
            chunking: {
                partSize: 5242880
            },
            resume: {
                recordsExpireIn: 7
            },
            cors: {
                allowXdr: !0
            },
            callbacks: {
                onCredentialsExpired: function () {}
            }
        };
        qq.extend(b, a, !0), this.setCredentials(b.credentials, !0) || (this._currentCredentials.accessKey = b.request.accessKey), this._aclStore = this._createStore(b.objectProperties.acl), qq.FineUploaderBasic.call(this, b), this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params), this._failedSuccessRequestCallbacks = {}, this._cannedKeys = {}
    }, qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePublicApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePrivateApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi), qq.extend(qq.s3.FineUploaderBasic.prototype, {
        getKey: function (a) {
            return null == this._cannedKeys[a] ? this._handler.getThirdPartyFileId(a) : this._cannedKeys[a]
        },
        reset: function () {
            qq.FineUploaderBasic.prototype.reset.call(this), this._failedSuccessRequestCallbacks = []
        },
        setUploadSuccessParams: function (a, b) {
            this._uploadSuccessParamsStore.set(a, b)
        },
        setCredentials: function (a, b) {
            if (a && a.secretKey) {
                if (!a.accessKey) throw new qq.Error("Invalid credentials: no accessKey");
                if (!a.expiration) throw new qq.Error("Invalid credentials: no expiration");
                return this._currentCredentials = qq.extend({}, a), qq.isString(a.expiration) && (this._currentCredentials.expiration = new Date(a.expiration)), !0
            }
            if (!b) throw new qq.Error("Invalid credentials parameter!");
            this._currentCredentials = {}
        },
        setAcl: function (a, b) {
            this._aclStore.set(a, b)
        },
        _createUploadHandler: function () {
            var a = this,
                b = {
                    objectProperties: this._options.objectProperties,
                    aclStore: this._aclStore,
                    signature: this._options.signature,
                    iframeSupport: this._options.iframeSupport,
                    getKeyName: qq.bind(this._determineKeyName, this),
                    validation: {
                        minSizeLimit: this._options.validation.minSizeLimit,
                        maxSizeLimit: this._options.validation.sizeLimit
                    }
                };
            return qq.override(this._endpointStore, function (a) {
                return {
                    get: function (b) {
                        var c = a.get(b);
                        return c.indexOf("http") < 0 ? "http://" + c : c
                    }
                }
            }), qq.override(this._paramsStore, function (a) {
                return {
                    get: function (b) {
                        var c = a.get(b),
                            d = {};
                        return qq.each(c, function (a, b) {
                            d[a.toLowerCase()] = qq.isFunction(b) ? b() : b
                        }), d
                    }
                }
            }), b.signature.credentialsProvider = {
                get: function () {
                    return a._currentCredentials
                },
                onExpired: function () {
                    var b = new qq.Promise,
                        c = a._options.callbacks.onCredentialsExpired();
                    return c instanceof qq.Promise ? c.then(function (c) {
                        try {
                            a.setCredentials(c), b.success()
                        } catch (d) {
                            a.log("Invalid credentials returned from onCredentialsExpired callback! (" + d.message + ")", "error"), b.failure("onCredentialsExpired did not return valid credentials.")
                        }
                    }, function (c) {
                        a.log("onCredentialsExpired callback indicated failure! (" + c + ")", "error"), b.failure("onCredentialsExpired callback failed.")
                    }) : (a.log("onCredentialsExpired callback did not return a promise!", "error"), b.failure("Unexpected return value for onCredentialsExpired.")), b
                }
            }, qq.FineUploaderBasic.prototype._createUploadHandler.call(this, b, "s3")
        },
        _determineKeyName: function (a, b) {
            var c = new qq.Promise,
                d = this._options.objectProperties.key,
                e = qq.getExtension(b),
                f = c.failure,
                g = function (a, b) {
                    var d = a;
                    void 0 !== b && (d += "." + b), c.success(d)
                };
            switch (d) {
            case "uuid":
                g(this.getUuid(a), e);
                break;
            case "filename":
                g(b);
                break;
            default:
                qq.isFunction(d) ? this._handleKeynameFunction(d, a, g, f) : (this.log(d + " is not a valid value for the s3.keyname option!", "error"), f())
            }
            return c
        },
        _handleKeynameFunction: function (a, b, c, d) {
            var e = this,
                f = function (a) {
                    c(a)
                }, g = function (a) {
                    e.log(qq.format("Failed to retrieve key name for {}.  Reason: {}", b, a || "null"), "error"), d(a)
                }, h = a.call(this, b);
            h instanceof qq.Promise ? h.then(f, g) : null == h ? g() : f(h)
        },
        _getEndpointSpecificParams: function (a, b, c) {
            var d = {
                key: this.getKey(a),
                uuid: this.getUuid(a),
                name: this.getName(a),
                bucket: qq.s3.util.getBucket(this._endpointStore.get(a))
            };
            return c && c.getResponseHeader("ETag") ? d.etag = c.getResponseHeader("ETag") : b.etag && (d.etag = b.etag), d
        },
        _onSubmitDelete: function (a, b) {
            var c = {
                key: this.getKey(a),
                bucket: qq.s3.util.getBucket(this._endpointStore.get(a))
            };
            return qq.FineUploaderBasic.prototype._onSubmitDelete.call(this, a, b, c)
        },
        _addCannedFile: function (a) {
            var b;
            if (null == a.s3Key) throw new qq.Error("Did not find s3Key property in server session response.  This is required!");
            return b = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments), this._cannedKeys[b] = a.s3Key, b
        }
    })
}(), qq.s3.RequestSigner = function (a) {
    "use strict";

    function b(a, b, c) {
        var d, e, f = b.responseText,
            g = j[a],
            h = g.promise;
        if (delete j[a], f) try {
            e = qq.parseJson(f)
        } catch (i) {
            k.log("Error attempting to parse signature response: " + i, "error")
        }
        e && e.invalid ? (c = !0, d = "Invalid policy document or request headers!") : e ? k.expectingPolicy && !e.policy ? (c = !0, d = "Response does not include the base64 encoded policy!") : e.signature || (c = !0, d = "Response does not include the signature!") : (c = !0, d = "Received an empty or invalid response from the server!"), c ? (d && k.log(d, "error"), h.failure(d)) : h.success(e)
    }

    function c(a, b, c, d, e, f, g) {
        var h, j = "POST",
            k = [],
            l = "";
        switch (a) {
        case i.REQUEST_TYPE.MULTIPART_ABORT:
            j = "DELETE", h = qq.format("uploadId={}", f);
            break;
        case i.REQUEST_TYPE.MULTIPART_INITIATE:
            h = "uploads";
            break;
        case i.REQUEST_TYPE.MULTIPART_COMPLETE:
            h = qq.format("uploadId={}", f);
            break;
        case i.REQUEST_TYPE.MULTIPART_UPLOAD:
            j = "PUT", h = qq.format("partNumber={}&uploadId={}", g, f)
        }
        return h = c + "?" + h, qq.each(e, function (a) {
            k.push(a)
        }), k.sort(), qq.each(k, function (a, b) {
            l += b + ":" + e[b] + "\n"
        }), {
            toSign: qq.format("{}\n\n{}\n\n{}/{}/{}", j, d || "", l || "\n", b, h),
            endOfUrl: h
        }
    }

    function d(a, b, c, d) {
        var g;
        a.signatureConstructor ? (d && (g = a.signatureConstructor.getHeaders(), g[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = d, a.signatureConstructor.withHeaders(g)), f(a.signatureConstructor.getToSign().stringToSign, b)) : (d && qq.s3.util.refreshPolicyCredentials(a, d), e(a, b, c, d))
    }

    function e(a, b, c, d) {
        var e = JSON.stringify(a),
            f = CryptoJS.enc.Utf8.parse(e),
            g = CryptoJS.enc.Base64.stringify(f),
            i = CryptoJS.HmacSHA1(g, h.get().secretKey),
            j = CryptoJS.enc.Base64.stringify(i);
        b.success({
            policy: g,
            signature: j
        }, c, d)
    }

    function f(a, b) {
        var c = CryptoJS.enc.Utf8.parse(a),
            d = CryptoJS.HmacSHA1(c, h.get().secretKey),
            e = CryptoJS.enc.Base64.stringify(d);
        b.success({
            signature: e
        })
    }
    var g, h, i = this,
        j = {}, k = {
            expectingPolicy: !1,
            method: "POST",
            signatureSpec: {
                credentialsProvider: {},
                endpoint: null,
                customHeaders: {}
            },
            maxConnections: 3,
            paramsStore: {},
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function () {}
        };
    qq.extend(k, a, !0), h = k.signatureSpec.credentialsProvider, g = qq.extend(this, new qq.AjaxRequester({
        method: k.method,
        contentType: "application/json; charset=utf-8",
        endpointStore: {
            get: function () {
                return k.signatureSpec.endpoint
            }
        },
        paramsStore: k.paramsStore,
        maxConnections: k.maxConnections,
        customHeaders: k.signatureSpec.customHeaders,
        log: k.log,
        onComplete: b,
        cors: k.cors,
        successfulResponseCodes: {
            POST: [200]
        }
    })), qq.extend(this, {
        getSignature: function (a, b) {
            var c = b,
                e = new qq.Promise;
            return h.get().secretKey && window.CryptoJS ? h.get().expiration.getTime() > Date.now() ? d(b, e) : h.onExpired().then(function () {
                d(b, e, h.get().accessKey, h.get().sessionToken)
            }, function () {
                k.log("Attempt to update expired credentials apparently failed! Unable to sign request.  ", "error"), e.failure("Unable to sign request - expired credentials.")
            }) : (k.log("Submitting S3 signature request for " + a), c.signatureConstructor && (c = {
                headers: c.signatureConstructor.getToSign().stringToSign
            }), g.initTransport(a).withParams(c).send(), j[a] = {
                promise: e
            }), e
        },
        constructStringToSign: function (a, b, d) {
            var e, f, g, i, j = {};
            return {
                withHeaders: function (a) {
                    return j = a, this
                },
                withUploadId: function (a) {
                    return e = a, this
                },
                withContentType: function (a) {
                    return f = a, this
                },
                withPartNum: function (a) {
                    return g = a, this
                },
                getToSign: function () {
                    var k = h.get().sessionToken;
                    return j["x-amz-date"] = (new Date).toUTCString(), k && (j[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = k), i = c(a, b, d, f, j, e, g), {
                        headers: function () {
                            return f && (j["Content-Type"] = f), j
                        }(),
                        endOfUrl: i.endOfUrl,
                        stringToSign: i.toSign
                    }
                },
                getHeaders: function () {
                    return qq.extend({}, j)
                },
                getEndOfUrl: function () {
                    return i && i.endOfUrl
                }
            }
        }
    })
}, qq.s3.RequestSigner.prototype.REQUEST_TYPE = {
    MULTIPART_INITIATE: "multipart_initiate",
    MULTIPART_COMPLETE: "multipart_complete",
    MULTIPART_ABORT: "multipart_abort",
    MULTIPART_UPLOAD: "multipart_upload"
}, qq.UploadSuccessAjaxRequester = function (a) {
    "use strict";

    function b(a, b, c) {
        var f, g = d[a],
            h = b.responseText,
            i = {
                success: !0
            }, j = {
                success: !1
            };
        delete d[a], e.log(qq.format("Received the following response body to an upload success request for id {}: {}", a, h));
        try {
            f = qq.parseJson(h), c || f && (f.error || f.success === !1) ? (e.log("Upload success request was rejected by the server.", "error"), g.failure(qq.extend(f, j))) : (e.log("Upload success was acknowledged by the server."), g.success(qq.extend(f, i)))
        } catch (k) {
            c ? (e.log(qq.format("Your server indicated failure in its upload success request response for id {}!", a), "error"), g.failure(j)) : (e.log("Upload success was acknowledged by the server."), g.success(i))
        }
    }
    var c, d = [],
        e = {
            method: "POST",
            endpoint: null,
            maxConnections: 3,
            customHeaders: {},
            paramsStore: {},
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function () {}
        };
    qq.extend(e, a), c = qq.extend(this, new qq.AjaxRequester({
        method: e.method,
        endpointStore: {
            get: function () {
                return e.endpoint
            }
        },
        paramsStore: e.paramsStore,
        maxConnections: e.maxConnections,
        customHeaders: e.customHeaders,
        log: e.log,
        onComplete: b,
        cors: e.cors,
        successfulResponseCodes: {
            POST: [200]
        }
    })), qq.extend(this, {
        sendSuccessRequest: function (a, b) {
            var f = new qq.Promise;
            return e.log("Submitting upload success request/notification for " + a), c.initTransport(a).withParams(b).send(), d[a] = f, f
        }
    })
}, qq.s3.InitiateMultipartAjaxRequester = function (a) {
    "use strict";

    function b(a) {
        var b, c = qq.s3.util.getBucket(g.endpointStore.get(a)),
            d = {}, f = new qq.Promise,
            h = g.getKey(a);
        return d["x-amz-acl"] = g.aclStore.get(a), g.reducedRedundancy && (d[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), g.serverSideEncryption && (d[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), d[qq.s3.util.AWS_PARAM_PREFIX + g.filenameParam] = encodeURIComponent(g.getName(a)), qq.each(g.paramsStore.get(a), function (a, b) {
            d[qq.s3.util.AWS_PARAM_PREFIX + a] = encodeURIComponent(b)
        }), b = e.constructStringToSign(e.REQUEST_TYPE.MULTIPART_INITIATE, c, h).withContentType(g.getContentType(a)).withHeaders(d), e.getSignature(a, {
            signatureConstructor: b
        }).then(function (a) {
            d = b.getHeaders(), d.Authorization = "AWS " + g.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, f.success(d, b.getEndOfUrl())
        }, f.failure), f
    }

    function c(a, b, c) {
        var d, e, h, i, j, k = f[a],
            l = new DOMParser,
            m = l.parseFromString(b.responseText, "application/xml");
        delete f[a], c ? (j = b.status, e = m.getElementsByTagName("Message"), e.length > 0 && (i = e[0].textContent)) : (d = m.getElementsByTagName("UploadId"), d.length > 0 ? h = d[0].textContent : i = "Upload ID missing from request"), void 0 === h ? (i ? g.log(qq.format("Specific problem detected initiating multipart upload request for {}: '{}'.", a, i), "error") : g.log(qq.format("Unexplained error with initiate multipart upload request for {}.  Status code {}.", a, j), "error"), k.failure("Problem initiating upload request with Amazon.", b)) : (g.log(qq.format("Initiate multipart upload request successful for {}.  Upload ID is {}", a, h)), k.success(h, b))
    }
    var d, e, f = {}, g = {
            filenameParam: "qqfilename",
            method: "POST",
            endpointStore: null,
            paramsStore: null,
            signatureSpec: null,
            aclStore: null,
            reducedRedundancy: !1,
            serverSideEncryption: !1,
            maxConnections: 3,
            getContentType: function () {},
            getKey: function () {},
            getName: function () {},
            log: function () {}
        };
    qq.extend(g, a), e = new qq.s3.RequestSigner({
        signatureSpec: g.signatureSpec,
        cors: g.cors,
        log: g.log
    }), d = qq.extend(this, new qq.AjaxRequester({
        method: g.method,
        contentType: null,
        endpointStore: g.endpointStore,
        maxConnections: g.maxConnections,
        allowXRequestedWithAndCacheControl: !1,
        log: g.log,
        onComplete: c,
        successfulResponseCodes: {
            POST: [200]
        }
    })), qq.extend(this, {
        send: function (a) {
            var c = new qq.Promise;
            return b(a).then(function (b, e) {
                g.log("Submitting S3 initiate multipart upload request for " + a), f[a] = c, d.initTransport(a).withPath(e).withHeaders(b).send()
            }, c.failure), c
        }
    })
}, qq.s3.CompleteMultipartAjaxRequester = function (a) {
    "use strict";

    function b(a, b) {
        var c = {}, d = new qq.Promise,
            e = h.endpointStore.get(a),
            g = qq.s3.util.getBucket(e),
            i = f.constructStringToSign(f.REQUEST_TYPE.MULTIPART_COMPLETE, g, h.getKey(a)).withUploadId(b).withContentType("application/xml; charset=UTF-8");
        return f.getSignature(a, {
            signatureConstructor: i
        }).then(function (a) {
            c = i.getHeaders(), c.Authorization = "AWS " + h.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, d.success(c, i.getEndOfUrl())
        }, d.failure), d
    }

    function c(a, b, c) {
        var d = g[a],
            e = new DOMParser,
            f = h.endpointStore.get(a),
            i = qq.s3.util.getBucket(f),
            j = (h.getKey(a), e.parseFromString(b.responseText, "application/xml")),
            k = j.getElementsByTagName("Bucket"),
            l = j.getElementsByTagName("Key");
        delete g[a], h.log(qq.format("Complete response status {}, body = {}", b.status, b.responseText)), c ? h.log(qq.format("Complete Multipart Upload request for {} failed with status {}.", a, b.status), "error") : k.length && l.length ? k[0].textContent !== i && (c = !0, h.log(qq.format("Wrong bucket in response to Complete Multipart Upload request for {}.", a), "error")) : (c = !0, h.log(qq.format("Missing bucket and/or key in response to Complete Multipart Upload request for {}.", a), "error")), c ? d.failure("Problem asking Amazon to combine the parts!", b) : d.success(b)
    }

    function d(a) {
        var b = document.implementation.createDocument(null, "CompleteMultipartUpload", null);
        return qq.each(a, function (a, c) {
            var d = c.part,
                e = c.etag,
                f = b.createElement("Part"),
                g = b.createElement("PartNumber"),
                h = b.createTextNode(d),
                i = b.createTextNode(e),
                j = b.createElement("ETag");
            j.appendChild(i), g.appendChild(h), f.appendChild(g), f.appendChild(j), qq(b).children()[0].appendChild(f)
        }), (new XMLSerializer).serializeToString(b)
    }
    var e, f, g = {}, h = {
            method: "POST",
            contentType: "text/xml",
            endpointStore: null,
            signatureSpec: null,
            maxConnections: 3,
            getKey: function () {},
            log: function () {}
        };
    qq.extend(h, a), f = new qq.s3.RequestSigner({
        signatureSpec: h.signatureSpec,
        cors: h.cors,
        log: h.log
    }), e = qq.extend(this, new qq.AjaxRequester({
        method: h.method,
        contentType: "application/xml; charset=UTF-8",
        endpointStore: h.endpointStore,
        maxConnections: h.maxConnections,
        allowXRequestedWithAndCacheControl: !1,
        log: h.log,
        onComplete: c,
        successfulResponseCodes: {
            POST: [200]
        }
    })), qq.extend(this, {
        send: function (a, c, f) {
            var i = new qq.Promise;
            return b(a, c).then(function (b, c) {
                var j = d(f);
                h.log("Submitting S3 complete multipart upload request for " + a), g[a] = i, delete b["Content-Type"], e.initTransport(a).withPath(c).withHeaders(b).withPayload(j).send()
            }, i.failure), i
        }
    })
}, qq.s3.AbortMultipartAjaxRequester = function (a) {
    "use strict";

    function b(a, b) {
        var c = {}, d = new qq.Promise,
            g = f.endpointStore.get(a),
            h = qq.s3.util.getBucket(g),
            i = e.constructStringToSign(e.REQUEST_TYPE.MULTIPART_ABORT, h, f.getKey(a)).withUploadId(b);
        return e.getSignature(a, {
            signatureConstructor: i
        }).then(function (a) {
            c = i.getHeaders(), c.Authorization = "AWS " + f.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, d.success(c, i.getEndOfUrl())
        }, d.failure), d
    }

    function c(a, b, c) {
        var d, e = new DOMParser,
            g = e.parseFromString(b.responseText, "application/xml"),
            h = g.getElementsByTagName("Error");
        f.log(qq.format("Abort response status {}, body = {}", b.status, b.responseText)), c ? f.log(qq.format("Abort Multipart Upload request for {} failed with status {}.", a, b.status), "error") : h.length ? (c = !0, d = g.getElementsByTagName("Message")[0].textContent, f.log(qq.format("Failed to Abort Multipart Upload request for {}.  Error: {}", a, d), "error")) : f.log(qq.format("Abort MPU request succeeded for file ID {}.", a))
    }
    var d, e, f = {
            method: "DELETE",
            endpointStore: null,
            signatureSpec: null,
            maxConnections: 3,
            getKey: function () {},
            log: function () {}
        };
    qq.extend(f, a), e = new qq.s3.RequestSigner({
        signatureSpec: f.signatureSpec,
        cors: f.cors,
        log: f.log
    }), d = qq.extend(this, new qq.AjaxRequester({
        validMethods: ["DELETE"],
        method: f.method,
        contentType: null,
        endpointStore: f.endpointStore,
        maxConnections: f.maxConnections,
        allowXRequestedWithAndCacheControl: !1,
        log: f.log,
        onComplete: c,
        successfulResponseCodes: {
            DELETE: [204]
        }
    })), qq.extend(this, {
        send: function (a, c) {
            b(a, c).then(function (b, c) {
                f.log("Submitting S3 Abort multipart upload request for " + a), d.initTransport(a).withPath(c).withHeaders(b).send()
            })
        }
    })
}, qq.s3.UploadHandlerForm = function (a, b) {
    "use strict";

    function c(b, c) {
        var d = a.endpointStore.get(b),
            e = qq.s3.util.getBucket(d);
        try {
            var f = c.contentDocument || c.contentWindow.document;
            f.body.innerHTML;
            var g = qq.s3.util.parseIframeResponse(c);
            if (g.bucket === e && g.key === qq.s3.util.encodeQueryStringParam(h._getFileState(b).key)) return !0;
            m("Response from AWS included an unexpected bucket or key name.", "error")
        } catch (i) {
            m("Error when attempting to parse form upload response (" + i.message + ")", "error")
        }
        return !1
    }

    function d(a) {
        var b = r.get(a);
        return b[q] = k(a), qq.s3.util.generateAwsParams({
            endpoint: s.get(a),
            params: b,
            key: h._getFileState(a).key,
            accessKey: z.get().accessKey,
            sessionToken: z.get().sessionToken,
            acl: t.get(a),
            minFileSize: w.minSizeLimit,
            maxFileSize: w.maxSizeLimit,
            successRedirectUrl: y,
            reducedRedundancy: u,
            serverSideEncryption: v,
            log: m
        }, qq.bind(A.getSignature, this, a))
    }

    function e(b, c) {
        var e = new qq.Promise,
            f = a.demoMode ? "GET" : "POST",
            i = a.endpointStore.get(b),
            j = k(b);
        return d(b).then(function (a) {
            var b = h._initFormForUpload({
                method: f,
                endpoint: i,
                params: a,
                paramsInBody: !0,
                targetName: c.name
            });
            e.success(b)
        }, function (a) {
            e.failure(a), g(b, c, j, {
                error: a
            })
        }), e
    }

    function f(a) {
        var b = k(a),
            d = h._createIframe(a),
            f = h._getFileState(a).input;
        e(a, d).then(function (e) {
            o(a, b), e.appendChild(f), h._attachLoadEvent(d, function (e) {
                m("iframe loaded"), e ? e.success === !1 && m("Amazon likely rejected the upload request", "error") : (e = {}, e.success = c(a, d), e.success === !1 ? m("A success response was received by Amazon, but it was invalid in some way.", "error") : qq.extend(e, qq.s3.util.parseIframeResponse(d))), g(a, d, b, e)
            }), m("Sending upload request for " + a), e.submit(), qq(e).remove()
        })
    }

    function g(b, c, d, e) {
        h._detachLoadEvent(b), c && qq(c).remove(), (e.success || !a.onAutoRetry(b, d, e)) && (n(b, d, e), i(b))
    }
    var h = this,
        i = b.onUploadComplete,
        j = b.onUuidChanged,
        k = b.getName,
        l = b.getUuid,
        m = b.log,
        n = a.onComplete,
        o = a.onUpload,
        p = a.getKeyName,
        q = a.filenameParam,
        r = a.paramsStore,
        s = a.endpointStore,
        t = a.aclStore,
        u = a.objectProperties.reducedRedundancy,
        v = a.objectProperties.serverSideEncryption,
        w = a.validation,
        x = a.signature,
        y = a.iframeSupport.localBlankPagePath,
        z = a.signature.credentialsProvider,
        A = new qq.s3.RequestSigner({
            signatureSpec: x,
            cors: a.cors,
            log: m
        });
    if (void 0 === y) throw new Error("successRedirectEndpoint MUST be defined if you intend to use browsers that do not support the File API!");
    qq.extend(this, new qq.AbstractUploadHandlerForm({
        options: {
            isCors: !1,
            inputName: "file"
        },
        proxy: {
            onCancel: a.onCancel,
            onUuidChanged: j,
            getName: k,
            getUuid: l,
            log: m
        }
    })), qq.extend(this, {
        upload: function (a) {
            var b = h._getFileState(a).input,
                c = k(a);
            if (!b) throw new Error("file with passed id was not added, or already uploaded or canceled");
            this.isValid(a) && (h._getFileState(a).key ? f(a) : p(a, c).then(function (b) {
                h._getFileState(a).key = b, f(a)
            }, function (b) {
                g(a, null, c, {
                    error: b
                })
            }))
        },
        getThirdPartyFileId: function (a) {
            return h._getFileState(a).key
        }
    })
}, qq.s3.UploadHandlerXhr = function (a, b) {
    "use strict";

    function c(a) {
        return encodeURIComponent(d(a))
    }

    function d(a) {
        return T._getFileState(a).key
    }

    function e(a, b) {
        T._getFileState(a).key = b
    }

    function f(a) {
        T.getFile(a), T._createXhr(a), T._shouldChunkThisFile(a) ? (void 0 === T._getFileState(a).loaded && (T._getFileState(a).loaded = 0), p(a)) : (T._getFileState(a).loaded = 0, m(a))
    }

    function g(a) {
        var b = T._getFileState(a).xhr;
        return function () {
            4 === b.readyState && (T._getFileState(a).chunking.enabled ? w(a) : i(a))
        }
    }

    function h(a) {
        return "EntityTooSmall" === a || "InvalidPart" === a || "InvalidPartOrder" === a || "NoSuchUpload" === a
    }

    function i(b, c, d) {
        var e = d || T._getFileState(b).xhr,
            f = z(b),
            g = B(b),
            i = j(b, d),
            k = c || j(b),
            l = T._getFileState(b).paused,
            m = !l && (null != c || i.success !== !0);
        m && h(i.code) && (D("This is an unrecoverable error, we must restart the upload entirely on the next retry attempt.", "error"), T._maybeDeletePersistedChunkData(b), delete T._getFileState(b).loaded, delete T._getFileState(b).chunking), m && a.onAutoRetry(b, f, k, e) || (D(qq.format("Upload attempt for file ID {} to S3 is complete", b)), m || l || (k.success = !0, F(b, f, g, g), T._maybeDeletePersistedChunkData(b), delete T._getFileState(b).loaded, delete T._getFileState(b).chunking), l ? qq.log(qq.format("Detected pause on {} ({}).", b, f)) : (G(b, f, k, e), T._getFileState(b) && delete T._getFileState(b).xhr, x(b)))
    }

    function j(a, b) {
        var c, d = b || T._getFileState(a).xhr,
            e = {};
        try {
            D(qq.format("Received response status {} with body: {}", d.status, d.responseText)), d.status === E ? e.success = !0 : (c = k(d.responseText), c && (e.error = c.message, e.code = c.code))
        } catch (f) {
            D("Error when attempting to parse xhr response text (" + f.message + ")", "error")
        }
        return e
    }

    function k(a) {
        var b, c, d = new DOMParser,
            e = d.parseFromString(a, "application/xml"),
            f = e.getElementsByTagName("Error"),
            g = {};
        return f.length ? (b = e.getElementsByTagName("Code"), c = e.getElementsByTagName("Message"), c.length && (g.message = c[0].textContent), b.length && (g.code = b[0].textContent), g) : void 0
    }

    function l(a) {
        var b = z(a);
        T.isValid(a) && (T._maybePrepareForResume(a), void 0 !== d(a) ? (H(a, b), f(a)) : I(a, b).then(function (c) {
            e(a, c), H(a, b), f(a)
        }, function (b) {
            i(a, {
                error: b
            })
        }))
    }

    function m(a) {
        var b = T._getFileState(a).xhr,
            c = z(a),
            d = T.getFile(a);
        b.upload.onprogress = function (b) {
            b.lengthComputable && (T._getFileState(a).loaded = b.loaded, F(a, c, b.loaded, b.total))
        }, b.onreadystatechange = g(a), o(a, d).then(function (c) {
            D("Sending upload request for " + a), b.send(c)
        })
    }

    function n(a) {
        var b = K.get(a);
        return b[J] = z(a), qq.s3.util.generateAwsParams({
            endpoint: L.get(a),
            params: b,
            type: T._getMimeType(a),
            key: d(a),
            accessKey: U.get().accessKey,
            sessionToken: U.get().sessionToken,
            acl: M.get(a),
            expectedStatus: E,
            minFileSize: P.minSizeLimit,
            maxFileSize: P.maxSizeLimit,
            reducedRedundancy: N,
            serverSideEncryption: O,
            log: D
        }, qq.bind(V.getSignature, this, a))
    }

    function o(a, b) {
        var c = new FormData,
            d = L.get(a),
            e = d,
            f = T._getFileState(a).xhr,
            g = new qq.Promise;
        return n(a).then(function (a) {
            f.open("POST", e, !0), qq.obj2FormData(a, c), c.append("file", b), g.success(c)
        }, function (b) {
            g.failure(b), i(a, {
                error: b
            })
        }), g
    }

    function p(a) {
        v(a).then(function () {
            r(a)
        }, function (b, c) {
            i(a, {
                error: b
            }, c)
        })
    }

    function q(a) {
        return T._getFileState(a).chunking.lastSent >= 0 ? T._getFileState(a).chunking.lastSent + 1 : 0
    }

    function r(a) {
        var b = T._getFileState(a).chunking.parts,
            c = q(a);
        b > c ? t(a) : s(a)
    }

    function s(a) {
        var b = T._getFileState(a).chunking.uploadId,
            c = T._getFileState(a).chunking.etags;
        Y.send(a, b, c).then(function (b) {
            i(a, null, b)
        }, function (b, c) {
            i(a, {
                error: b
            }, c)
        })
    }

    function t(b) {
        var c = q(b),
            d = z(b),
            e = T._getFileState(b).xhr,
            f = B(b),
            h = T._getChunkData(b, c),
            j = a.endpointStore.get(b);
        u(b).then(function (c, i) {
            var k = j + "/" + i;
            a.onUploadChunk(b, d, T._getChunkDataForCallback(h)), e.upload.onprogress = function (c) {
                if (c.lengthComputable) {
                    var e = c.loaded + T._getFileState(b).loaded;
                    a.onProgress(b, d, e, f)
                }
            }, e.onreadystatechange = g(b), e.open("PUT", k, !0), qq.each(c, function (a, b) {
                e.setRequestHeader(a, b)
            }), D(qq.format("Sending part {} of {} for file ID {} - {} ({} bytes)", h.part + 1, h.count, b, d, h.size)), e.send(h.blob)
        }, function () {
            i(b, {
                error: "Problem signing the chunk!"
            }, e)
        })
    }

    function u(b) {
        var d = {}, e = a.endpointStore.get(b),
            f = qq.s3.util.getBucket(e),
            g = c(b),
            h = new qq.Promise,
            i = W.constructStringToSign(W.REQUEST_TYPE.MULTIPART_UPLOAD, f, g).withPartNum(q(b) + 1).withUploadId(T._getFileState(b).chunking.uploadId);
        return W.getSignature(b, {
            signatureConstructor: i
        }).then(function (a) {
            d = i.getHeaders(), d.Authorization = "AWS " + U.get().accessKey + ":" + a.signature, h.success(d, i.getEndOfUrl())
        }, h.failure), h
    }

    function v(a) {
        return T._getFileState(a).chunking.uploadId ? (new qq.Promise).success(T._getFileState(a).chunking.uploadId) : X.send(a).then(function (b) {
            T._getFileState(a).chunking.uploadId = b
        })
    }

    function w(b) {
        var c, d = q(b),
            e = T._getFileState(b).xhr,
            f = j(b),
            g = T._getChunkData(b, d);
        f.success ? (T._getFileState(b).chunking.lastSent = d, c = e.getResponseHeader("ETag"), T._getFileState(b).chunking.etags || (T._getFileState(b).chunking.etags = []), T._getFileState(b).chunking.etags.push({
            part: d + 1,
            etag: c
        }), T._getFileState(b).loaded += g.size, T._maybePersistChunkedState(b), a.onUploadChunkSuccess(b, T._getChunkDataForCallback(g), f, e), r(b)) : (f.error && D(f.error, "error"), i(b))
    }
    var x = b.onUploadComplete,
        y = b.onUuidChanged,
        z = b.getName,
        A = b.getUuid,
        B = b.getSize,
        C = b.getDataByUuid,
        D = b.log,
        E = 200,
        F = a.onProgress,
        G = a.onComplete,
        H = a.onUpload,
        I = a.getKeyName,
        J = a.filenameParam,
        K = a.paramsStore,
        L = a.endpointStore,
        M = a.aclStore,
        N = a.objectProperties.reducedRedundancy,
        O = a.objectProperties.serverSideEncryption,
        P = a.validation,
        Q = a.signature,
        R = a.chunking.enabled && qq.supportedFeatures.chunking,
        S = a.resume.enabled && R && qq.supportedFeatures.resume && void 0 !== window.localStorage,
        T = this,
        U = a.signature.credentialsProvider,
        V = new qq.s3.RequestSigner({
            expectingPolicy: !0,
            signatureSpec: Q,
            cors: a.cors,
            log: D
        }),
        W = new qq.s3.RequestSigner({
            signatureSpec: Q,
            cors: a.cors,
            log: D
        }),
        X = new qq.s3.InitiateMultipartAjaxRequester({
            filenameParam: J,
            endpointStore: L,
            paramsStore: K,
            signatureSpec: Q,
            aclStore: M,
            reducedRedundancy: N,
            serverSideEncryption: O,
            cors: a.cors,
            log: D,
            getContentType: function (a) {
                return T._getMimeType(a)
            },
            getKey: function (a) {
                return c(a)
            },
            getName: function (a) {
                return z(a)
            }
        }),
        Y = new qq.s3.CompleteMultipartAjaxRequester({
            endpointStore: L,
            signatureSpec: Q,
            cors: a.cors,
            log: D,
            getKey: function (a) {
                return c(a)
            }
        }),
        Z = new qq.s3.AbortMultipartAjaxRequester({
            endpointStore: L,
            signatureSpec: Q,
            cors: a.cors,
            log: D,
            getKey: function (a) {
                return c(a)
            }
        });
    qq.extend(this, new qq.AbstractNonTraditionalUploadHandlerXhr({
        options: {
            namespace: "s3",
            chunking: R ? a.chunking : null,
            resumeEnabled: S
        },
        proxy: {
            onUpload: l,
            onCancel: a.onCancel,
            onUuidChanged: y,
            getName: z,
            getSize: B,
            getUuid: A,
            getEndpoint: L.get,
            getDataByUuid: C,
            log: D
        }
    })), qq.override(this, function (a) {
        return {
            expunge: function (b) {
                var c = T._getFileState(b).chunking && T._getFileState(b).chunking.uploadId,
                    d = T._maybeDeletePersistedChunkData(b);
                void 0 !== c && d && Z.send(b, c), a.expunge(b)
            },
            _getLocalStorageId: function (b) {
                var c = a._getLocalStorageId(b),
                    d = L.get(b),
                    e = qq.s3.util.getBucket(d);
                return c + "-" + e
            }
        }
    })
},
function () {
    "use strict";
    qq.s3.FineUploader = function (a) {
        var b = {
            failedUploadTextDisplay: {
                mode: "custom"
            }
        };
        qq.extend(b, a, !0), qq.FineUploader.call(this, b, "s3"), qq.supportedFeatures.ajaxUploading || void 0 !== b.iframeSupport.localBlankPagePath || (this._options.element.innerHTML = "<div>You MUST set the <code>localBlankPagePath</code> property of the <code>iframeSupport</code> option since this browser does not support the File API!</div>")
    }, qq.extend(qq.s3.FineUploader.prototype, qq.s3.FineUploaderBasic.prototype), qq.extend(qq.s3.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.s3.FineUploader.prototype, qq.uiPrivateApi), qq.extend(qq.s3.FineUploader.prototype, {
        _onComplete: function (a) {
            var b = qq.FineUploader.prototype._onComplete.apply(this, arguments);
            return b instanceof qq.Promise && (this._templating.hideProgress(a), this._templating.setStatusText(a, this._options.text.waitingForResponse)), b
        }
    })
}(),
function (a) {
    "use strict";
    a.fn.fineUploaderS3 = function (b) {
        return "object" == typeof b && (b.endpointType = "s3"), a.fn.fineUploader.apply(this, arguments)
    }
}(jQuery), qq.azure = qq.azure || {}, qq.azure.util = qq.azure.util || function () {
    "use strict";
    return {
        AZURE_PARAM_PREFIX: "x-ms-meta-",
        getParamsAsHeaders: function (a) {
            var b = {};
            return qq.each(a, function (a, c) {
                var d = qq.azure.util.AZURE_PARAM_PREFIX + a;
                qq.isFunction(c) ? b[d] = encodeURIComponent(String(c())) : qq.isObject(c) ? qq.extend(b, qq.azure.util.getParamsAsHeaders(c)) : b[d] = encodeURIComponent(String(c))
            }), b
        },
        parseAzureError: function (a, b) {
            var c, d, e = new DOMParser,
                f = e.parseFromString(a, "application/xml"),
                g = f.getElementsByTagName("Error")[0],
                h = {};
            return b("Received error response: " + a, "error"), g ? (d = g.getElementsByTagName("Message")[0], d && (h.message = d.textContent), c = g.getElementsByTagName("Code")[0], c && (h.code = c.textContent), b("Parsed Azure error: " + JSON.stringify(h), "error"), h) : void 0
        }
    }
}(),
function () {
    "use strict";
    qq.azure.FineUploaderBasic = function (a) {
        if (!qq.supportedFeatures.ajaxUploading) throw new qq.Error("Uploading directly to Azure is not possible in this browser.");
        var b = {
            signature: {
                endpoint: null,
                customHeaders: {}
            },
            blobProperties: {
                name: "uuid"
            },
            uploadSuccess: {
                endpoint: null,
                params: {},
                customHeaders: {}
            },
            chunking: {
                partSize: 4e6,
                minFileSize: 4000001
            },
            resume: {
                recordsExpireIn: 7
            }
        };
        qq.extend(b, a, !0), qq.FineUploaderBasic.call(this, b), this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params), this._failedSuccessRequestCallbacks = {}, this._cannedBlobNames = {}
    }, qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePublicApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePrivateApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi), qq.extend(qq.azure.FineUploaderBasic.prototype, {
        getBlobName: function (a) {
            return null == this._cannedBlobNames[a] ? this._handler.getThirdPartyFileId(a) : this._cannedBlobNames[a]
        },
        _getEndpointSpecificParams: function (a) {
            return {
                blob: this.getBlobName(a),
                uuid: this.getUuid(a),
                name: this.getName(a),
                container: this._endpointStore.get(a)
            }
        },
        _createUploadHandler: function () {
            return qq.FineUploaderBasic.prototype._createUploadHandler.call(this, {
                signature: this._options.signature,
                onGetBlobName: qq.bind(this._determineBlobName, this),
                deleteBlob: qq.bind(this._deleteBlob, this, !0)
            }, "azure")
        },
        _determineBlobName: function (a) {
            var b = this._options.blobProperties.name,
                c = this.getUuid(a),
                d = this.getName(a),
                e = qq.getExtension(d);
            if (!qq.isString(b)) return b.call(this, a);
            switch (b) {
            case "uuid":
                return (new qq.Promise).success(c + "." + e);
            case "filename":
                return (new qq.Promise).success(d);
            default:
                return new qq.Promise.failure("Invalid blobName option value - " + b)
            }
        },
        _addCannedFile: function (a) {
            var b;
            if (null == a.blobName) throw new qq.Error("Did not find blob name property in server session response.  This is required!");
            return b = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments), this._cannedBlobNames[b] = a.blobName, b
        },
        _deleteBlob: function (a, b) {
            var c = this,
                d = {}, e = {
                    get: function (a) {
                        return c._endpointStore.get(a) + "/" + c.getBlobName(a)
                    }
                }, f = {
                    get: function (a) {
                        return d[a]
                    }
                }, g = function (a, b) {
                    d[a] = b, i.send(a)
                }, h = function (b, d, e) {
                    a ? (c.log("Will cancel upload, but cannot remove uncommitted parts from Azure due to issue retrieving SAS", "error"), qq.FineUploaderBasic.prototype._onCancel.call(c, b, c.getName(b))) : (c._onDeleteComplete(b, e, !0), c._options.callbacks.onDeleteComplete(b, e, !0))
                }, i = new qq.azure.DeleteBlob({
                    endpointStore: f,
                    log: qq.bind(c.log, c),
                    onDelete: function (a) {
                        c._onDelete(a), c._options.callbacks.onDelete(a)
                    },
                    onDeleteComplete: function (b, e, f) {
                        delete d[b], f && (a ? c.log("Will cancel upload, but failed to remove uncommitted parts from Azure.", "error") : qq.azure.util.parseAzureError(e.responseText, qq.bind(c.log, c))), a ? (qq.FineUploaderBasic.prototype._onCancel.call(c, b, c.getName(b)), c.log("Deleted uncommitted blob chunks for " + b)) : (c._onDeleteComplete(b, e, f), c._options.callbacks.onDeleteComplete(b, e, f))
                    }
                }),
                j = new qq.azure.GetSas({
                    cors: this._options.cors,
                    endpointStore: {
                        get: function () {
                            return c._options.signature.endpoint
                        }
                    },
                    restRequestVerb: i.method,
                    log: qq.bind(c.log, c)
                });
            j.request(b, e.get(b)).then(qq.bind(g, c, b), qq.bind(h, c, b))
        },
        _createDeleteHandler: function () {
            var a = this;
            return {
                sendDelete: function (b) {
                    a._deleteBlob(!1, b)
                }
            }
        }
    })
}(), qq.azure.UploadHandlerXhr = function (a, b) {
    "use strict";

    function c(a) {
        var b = o.get(a),
            c = new qq.Promise,
            d = function (d) {
                k._getFileState(a).key = d, c.success(b + "/" + d)
            }, e = function (a) {
                c.failure(a)
            };
        return w(a).then(d, e), c
    }

    function d(a) {
        k._shouldChunkThisFile(a) ? (void 0 === k._getFileState(a).loaded && (k._getFileState(a).loaded = 0, k._getFileState(a).chunking.blockIds = []), z(a, G(a)), h(a)) : f(a)
    }

    function e(a, b) {
        var d = function (a) {
            l("GET SAS request succeeded."), b(a)
        }, e = function (b, c) {
                l("GET SAS request failed: " + b, "error"), F(a, c, "Problem communicating with local server")
            }, f = function (b) {
                O.request(a, b).then(d, e)
            }, g = function (b) {
                l(qq.format("Failed to determine blob name for ID {} - {}", a, b), "error"), F(a, null, "Problem determining name of file to upload")
            };
        c(a).then(f, g)
    }

    function f(a) {
        var b = k.getFile(a);
        e(a, function (c) {
            var d = L.upload(a, c, b);
            k._registerXhr(a, d, L)
        })
    }

    function g(a) {
        return k._getFileState(a).chunking.lastSent >= 0 ? k._getFileState(a).chunking.lastSent + 1 : 0
    }

    function h(a) {
        var b = k._getFileState(a).chunking.parts,
            c = g(a);
        k.isValid(a) && b > c ? i(a, c) : j(a)
    }

    function i(a, b) {
        e(a, function (c) {
            var d = k._getChunkData(a, b),
                e = M.upload(a, c, b, d.blob);
            k._registerXhr(a, e, M)
        })
    }

    function j(a) {
        e(a, function (b) {
            var c = k._getMimeType(a),
                d = k._getFileState(a).chunking.blockIds,
                e = N.send(a, b, d, c);
            k._registerXhr(a, e, N)
        })
    }
    var k = this,
        l = b.log,
        m = a.cors,
        n = b.onUploadComplete,
        o = a.endpointStore,
        p = a.paramsStore,
        q = a.signature,
        r = a.filenameParam,
        s = a.chunking.minFileSize,
        t = a.chunking.enabled && qq.supportedFeatures.chunking,
        u = a.deleteBlob,
        v = a.resume.enabled && t && qq.supportedFeatures.resume && void 0 !== window.localStorage,
        w = a.onGetBlobName,
        x = a.onProgress,
        y = a.onComplete,
        z = a.onUpload,
        A = a.onUploadChunk,
        B = a.onUploadChunkSuccess,
        C = b.onUuidChanged,
        D = function (a) {
            var b = p.get(a);
            return b[r] = G(a), b
        }, E = function (a) {
            k._getFileState(a) && delete k._getFileState(a).xhr, n(a)
        }, F = function (b, c, d) {
            var e, f = k._getFileState(b).paused;
            d ? (e = qq.azure.util.parseAzureError(c.responseText, l), 403 !== c.status && a.onAutoRetry(b, G(b), {
                error: d,
                azureError: e && e.message
            }, c) || (403 === c.status && l("Server responded with 403 - will NOT auto-retry.", "error"), y(b, G(b), {
                success: !1,
                error: d,
                azureError: e && e.message
            }, c), E(b))) : (k._maybeDeletePersistedChunkData(b), f ? qq.log(qq.format("Detected pause on {} ({}).", b, G(b))) : (y(b, G(b), {
                success: !0
            }, c), E(b)))
        }, G = b.getName,
        H = b.getUuid,
        I = b.getSize,
        J = b.getDataByUuid,
        K = function (a, b, c) {
            k._shouldChunkThisFile(a) ? x(a, G(a), b + k._getFileState(a).loaded, I(a)) : (k._getFileState(a).loaded = b, x(a, G(a), b, c))
        }, L = new qq.azure.PutBlob({
            getBlobMetadata: D,
            onProgress: K,
            onUpload: function (a) {
                z(a, G(a))
            },
            onComplete: function (a, b, c) {
                c ? l("Put Blob call failed for " + a, "error") : l("Put Blob call succeeded for " + a), F.call(this, a, b, c ? "Problem sending file to Azure" : null)
            },
            log: l
        }),
        M = new qq.azure.PutBlock({
            onProgress: K,
            onUpload: function (a) {
                var b = g(a),
                    c = k._getChunkData(a, b);
                A(a, G(a), k._getChunkDataForCallback(c))
            },
            onComplete: function (a, b, c, d) {
                var e = g(a),
                    f = k._getChunkData(a, e),
                    i = k._getChunkDataForCallback(f);
                c ? (l("Put Block call failed for " + a, "error"), F.call(this, a, b, "Problem uploading block")) : (k._getFileState(a).chunking.blockIds.push(d), l("Put Block call succeeded for " + a), k._getFileState(a).chunking.lastSent = e, k._getFileState(a).loaded += f.size, k._maybePersistChunkedState(a), B(a, i, {}, b), h(a))
            },
            log: l
        }),
        N = new qq.azure.PutBlockList({
            getBlobMetadata: D,
            onComplete: function (a, b, c) {
                c ? (l("Attempt to combine chunks failed for id " + a, "error"), F.call(this, a, b, "Problem combining file pieces")) : (l("Success combining chunks for id " + a), F.call(this, a, b))
            },
            log: l
        }),
        O = new qq.azure.GetSas({
            cors: m,
            endpointStore: {
                get: function () {
                    return q.endpoint
                }
            },
            customHeaders: q.customHeaders,
            restRequestVerb: L.method,
            log: l
        });
    qq.extend(this, new qq.AbstractNonTraditionalUploadHandlerXhr({
        options: {
            namespace: "azure",
            chunking: t ? a.chunking : null,
            resumeEnabled: v
        },
        proxy: {
            onUpload: d,
            onCancel: a.onCancel,
            onUuidChanged: C,
            getName: G,
            getSize: I,
            getUuid: H,
            getEndpoint: o.get,
            getDataByUuid: J,
            log: l
        }
    })), qq.override(this, function (a) {
        return {
            expunge: function (b) {
                var c = k._getFileState(b).canceled,
                    d = k._getFileState(b).chunking,
                    e = d && d.blockIds || [];
                c && e.length > 0 && u(b), k._maybeDeletePersistedChunkData(b), a.expunge(b)
            },
            _shouldChunkThisFile: function (b) {
                return t && I(b) >= s ? a._shouldChunkThisFile(b) : !1
            }
        }
    })
}, qq.azure.GetSas = function (a) {
    "use strict";

    function b(a, b, c) {
        var d = e[a];
        c ? d.failure("Received response code " + b.status, b) : b.responseText.length ? d.success(b.responseText) : d.failure("Empty response.", b), delete e[a]
    }
    var c, d = {
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            customHeaders: {},
            restRequestVerb: "PUT",
            endpointStore: null,
            log: function () {}
        }, e = {};
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({
        validMethods: ["GET"],
        method: "GET",
        successfulResponseCodes: {
            GET: [200]
        },
        contentType: null,
        customHeaders: d.customHeaders,
        endpointStore: d.endpointStore,
        cors: d.cors,
        log: d.log,
        onComplete: b
    })), qq.extend(this, {
        request: function (a, b) {
            var f = new qq.Promise,
                g = d.restRequestVerb;
            return d.log(qq.format("Submitting GET SAS request for a {} REST request related to file ID {}.", g, a)), e[a] = f, c.initTransport(a).withParams({
                bloburi: b,
                _method: g
            }).withCacheBuster().send(), f
        }
    })
}, qq.azure.DeleteBlob = function (a) {
    "use strict";
    var b, c = "DELETE",
        d = {
            endpointStore: {},
            onDelete: function () {},
            onDeleteComplete: function () {},
            log: function () {}
        };
    qq.extend(d, a), b = qq.extend(this, new qq.AjaxRequester({
        validMethods: [c],
        method: c,
        successfulResponseCodes: function () {
            var a = {};
            return a[c] = [202], a
        }(),
        contentType: null,
        endpointStore: d.endpointStore,
        allowXRequestedWithAndCacheControl: !1,
        cors: {
            expected: !0
        },
        log: d.log,
        onSend: d.onDelete,
        onComplete: d.onDeleteComplete
    })), qq.extend(this, {
        method: c,
        send: function (a) {
            return d.log("Submitting Delete Blob request for " + a), b.initTransport(a).send()
        }
    })
}, qq.azure.PutBlob = function (a) {
    "use strict";
    var b, c = "PUT",
        d = {
            getBlobMetadata: function () {},
            onProgress: function () {},
            onUpload: function () {},
            onComplete: function () {},
            log: function () {}
        }, e = {}, f = {
            get: function (a) {
                return e[a]
            }
        };
    qq.extend(d, a), b = qq.extend(this, new qq.AjaxRequester({
        validMethods: [c],
        method: c,
        successfulResponseCodes: function () {
            var a = {};
            return a[c] = [201], a
        }(),
        contentType: null,
        customHeaders: function (a) {
            var b = d.getBlobMetadata(a),
                c = qq.azure.util.getParamsAsHeaders(b);
            return c["x-ms-blob-type"] = "BlockBlob", c
        },
        endpointStore: f,
        allowXRequestedWithAndCacheControl: !1,
        cors: {
            expected: !0
        },
        log: d.log,
        onSend: d.onUpload,
        onComplete: function (a) {
            delete e[a], d.onComplete.apply(this, arguments)
        },
        onProgress: d.onProgress
    })), qq.extend(this, {
        method: c,
        upload: function (a, c, f) {
            return d.log("Submitting Put Blob request for " + a), e[a] = c, b.initTransport(a).withPayload(f).withHeaders({
                "Content-Type": f.type
            }).send()
        }
    })
}, qq.azure.PutBlockList = function (a) {
    "use strict";

    function b(a) {
        var b = document.implementation.createDocument(null, "BlockList", null);
        return qq.each(a, function (a, c) {
            var d = b.createElement("Latest"),
                e = b.createTextNode(c);
            d.appendChild(e), qq(b).children()[0].appendChild(d)
        }), (new XMLSerializer).serializeToString(b)
    }
    var c, d = "PUT",
        e = {}, f = {
            getBlobMetadata: function () {},
            onComplete: function () {},
            log: function () {}
        }, g = {}, h = {
            get: function (a) {
                return g[a]
            }
        };
    qq.extend(f, a), c = qq.extend(this, new qq.AjaxRequester({
        validMethods: [d],
        method: d,
        successfulResponseCodes: function () {
            var a = {};
            return a[d] = [201], a
        }(),
        customHeaders: function (a) {
            var b = f.getBlobMetadata(a);
            return qq.azure.util.getParamsAsHeaders(b)
        },
        contentType: "text/plain",
        endpointStore: h,
        allowXRequestedWithAndCacheControl: !1,
        cors: {
            expected: !0
        },
        log: f.log,
        onSend: function () {},
        onComplete: function (a) {
            delete g[a], f.onComplete.apply(this, arguments), delete e[a]
        }
    })), qq.extend(this, {
        method: d,
        send: function (a, d, e, h) {
            var i = b(e);
            return f.log(qq.format("Submitting Put Block List request for {}", a)), g[a] = qq.format("{}&comp=blocklist", d), c.initTransport(a).withPayload(i).withHeaders({
                "x-ms-blob-content-type": h
            }).send()
        }
    })
}, qq.azure.PutBlock = function (a) {
    "use strict";

    function b(a) {
        var b = 5,
            c = new Array(b + 1).join("0"),
            d = (c + a).slice(-b);
        return btoa(d)
    }
    var c, d = "PUT",
        e = {}, f = {
            onProgress: function () {},
            onUpload: function () {},
            onComplete: function () {},
            log: function () {}
        }, g = {}, h = {
            get: function (a) {
                return g[a]
            }
        };
    qq.extend(f, a), c = qq.extend(this, new qq.AjaxRequester({
        validMethods: [d],
        method: d,
        successfulResponseCodes: function () {
            var a = {};
            return a[d] = [201], a
        }(),
        contentType: null,
        endpointStore: h,
        allowXRequestedWithAndCacheControl: !1,
        cors: {
            expected: !0
        },
        log: f.log,
        onSend: f.onUpload,
        onComplete: function (a, b, c) {
            delete g[a], f.onComplete.call(this, a, b, c, e[a]), delete e[a]
        },
        onProgress: f.onProgress
    })), qq.extend(this, {
        method: d,
        upload: function (a, d, h, i) {
            var j = b(h);
            return f.log(qq.format("Submitting Put Block request for {} = part {}", a, h)), g[a] = qq.format("{}&comp=block&blockid={}", d, encodeURIComponent(j)), e[a] = j, c.initTransport(a).withPayload(i).send()
        }
    })
},
function () {
    "use strict";
    qq.azure.FineUploader = function (a) {
        var b = {
            failedUploadTextDisplay: {
                mode: "custom"
            }
        };
        qq.extend(b, a, !0), qq.FineUploader.call(this, b, "azure")
    }, qq.extend(qq.azure.FineUploader.prototype, qq.azure.FineUploaderBasic.prototype), qq.extend(qq.azure.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.azure.FineUploader.prototype, qq.uiPrivateApi), qq.extend(qq.azure.FineUploader.prototype, {})
}(),
function (a) {
    "use strict";
    a.fn.fineUploaderAzure = function (b) {
        return "object" == typeof b && (b.endpointType = "azure"), a.fn.fineUploader.apply(this, arguments)
    }
}(jQuery);
var CryptoJS = CryptoJS || function (a, b) {
        var c = {}, d = c.lib = {}, e = d.Base = function () {
                function a() {}
                return {
                    extend: function (b) {
                        a.prototype = this;
                        var c = new a;
                        return b && c.mixIn(b), c.hasOwnProperty("init") || (c.init = function () {
                            c.$super.init.apply(this, arguments)
                        }), c.init.prototype = c, c.$super = this, c
                    },
                    create: function () {
                        var a = this.extend();
                        return a.init.apply(a, arguments), a
                    },
                    init: function () {},
                    mixIn: function (a) {
                        for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                        a.hasOwnProperty("toString") && (this.toString = a.toString)
                    },
                    clone: function () {
                        return this.init.prototype.extend(this)
                    }
                }
            }(),
            f = d.WordArray = e.extend({
                init: function (a, c) {
                    a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
                },
                toString: function (a) {
                    return (a || h).stringify(this)
                },
                concat: function (a) {
                    var b = this.words,
                        c = a.words,
                        d = this.sigBytes,
                        e = a.sigBytes;
                    if (this.clamp(), d % 4)
                        for (var f = 0; e > f; f++) {
                            var g = 255 & c[f >>> 2] >>> 24 - 8 * (f % 4);
                            b[d + f >>> 2] |= g << 24 - 8 * ((d + f) % 4)
                        } else if (c.length > 65535)
                            for (var f = 0; e > f; f += 4) b[d + f >>> 2] = c[f >>> 2];
                        else b.push.apply(b, c);
                    return this.sigBytes += e, this
                },
                clamp: function () {
                    var b = this.words,
                        c = this.sigBytes;
                    b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
                },
                clone: function () {
                    var a = e.clone.call(this);
                    return a.words = this.words.slice(0), a
                },
                random: function (b) {
                    for (var c = [], d = 0; b > d; d += 4) c.push(0 | 4294967296 * a.random());
                    return new f.init(c, b)
                }
            }),
            g = c.enc = {}, h = g.Hex = {
                stringify: function (a) {
                    for (var b = a.words, c = a.sigBytes, d = [], e = 0; c > e; e++) {
                        var f = 255 & b[e >>> 2] >>> 24 - 8 * (e % 4);
                        d.push((f >>> 4).toString(16)), d.push((15 & f).toString(16))
                    }
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                    return new f.init(c, b / 2)
                }
            }, i = g.Latin1 = {
                stringify: function (a) {
                    for (var b = a.words, c = a.sigBytes, d = [], e = 0; c > e; e++) {
                        var f = 255 & b[e >>> 2] >>> 24 - 8 * (e % 4);
                        d.push(String.fromCharCode(f))
                    }
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
                    return new f.init(c, b)
                }
            }, j = g.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(i.stringify(a)))
                    } catch (b) {
                        throw new Error("Malformed UTF-8 data")
                    }
                },
                parse: function (a) {
                    return i.parse(unescape(encodeURIComponent(a)))
                }
            }, k = d.BufferedBlockAlgorithm = e.extend({
                reset: function () {
                    this._data = new f.init, this._nDataBytes = 0
                },
                _append: function (a) {
                    "string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
                },
                _process: function (b) {
                    var c = this._data,
                        d = c.words,
                        e = c.sigBytes,
                        g = this.blockSize,
                        h = 4 * g,
                        i = e / h;
                    i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0);
                    var j = i * g,
                        k = a.min(4 * j, e);
                    if (j) {
                        for (var l = 0; j > l; l += g) this._doProcessBlock(d, l);
                        var m = d.splice(0, j);
                        c.sigBytes -= k
                    }
                    return new f.init(m, k)
                },
                clone: function () {
                    var a = e.clone.call(this);
                    return a._data = this._data.clone(), a
                },
                _minBufferSize: 0
            });
        d.Hasher = k.extend({
            cfg: e.extend(),
            init: function (a) {
                this.cfg = this.cfg.extend(a), this.reset()
            },
            reset: function () {
                k.reset.call(this), this._doReset()
            },
            update: function (a) {
                return this._append(a), this._process(), this
            },
            finalize: function (a) {
                a && this._append(a);
                var b = this._doFinalize();
                return b
            },
            blockSize: 16,
            _createHelper: function (a) {
                return function (b, c) {
                    return new a.init(c).finalize(b)
                }
            },
            _createHmacHelper: function (a) {
                return function (b, c) {
                    return new l.HMAC.init(a, c).finalize(b)
                }
            }
        });
        var l = c.algo = {};
        return c
    }(Math);
! function () {
    var a = CryptoJS,
        b = a.lib,
        c = b.WordArray,
        d = a.enc;
    d.Base64 = {
        stringify: function (a) {
            var b = a.words,
                c = a.sigBytes,
                d = this._map;
            a.clamp();
            for (var e = [], f = 0; c > f; f += 3)
                for (var g = 255 & b[f >>> 2] >>> 24 - 8 * (f % 4), h = 255 & b[f + 1 >>> 2] >>> 24 - 8 * ((f + 1) % 4), i = 255 & b[f + 2 >>> 2] >>> 24 - 8 * ((f + 2) % 4), j = g << 16 | h << 8 | i, k = 0; 4 > k && c > f + .75 * k; k++) e.push(d.charAt(63 & j >>> 6 * (3 - k)));
            var l = d.charAt(64);
            if (l)
                for (; e.length % 4;) e.push(l);
            return e.join("")
        },
        parse: function (a) {
            var b = a.length,
                d = this._map,
                e = d.charAt(64);
            if (e) {
                var f = a.indexOf(e); - 1 != f && (b = f)
            }
            for (var g = [], h = 0, i = 0; b > i; i++)
                if (i % 4) {
                    var j = d.indexOf(a.charAt(i - 1)) << 2 * (i % 4),
                        k = d.indexOf(a.charAt(i)) >>> 6 - 2 * (i % 4);
                    g[h >>> 2] |= (j | k) << 24 - 8 * (h % 4), h++
                }
            return c.create(g, h)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(),
function () {
    var a = CryptoJS,
        b = a.lib,
        c = b.Base,
        d = a.enc,
        e = d.Utf8,
        f = a.algo;
    f.HMAC = c.extend({
        init: function (a, b) {
            a = this._hasher = new a.init, "string" == typeof b && (b = e.parse(b));
            var c = a.blockSize,
                d = 4 * c;
            b.sigBytes > d && (b = a.finalize(b)), b.clamp();
            for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, i = g.words, j = 0; c > j; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = d, this.reset()
        },
        reset: function () {
            var a = this._hasher;
            a.reset(), a.update(this._iKey)
        },
        update: function (a) {
            return this._hasher.update(a), this
        },
        finalize: function (a) {
            var b = this._hasher,
                c = b.finalize(a);
            b.reset();
            var d = b.finalize(this._oKey.clone().concat(c));
            return d
        }
    })
}(),
function () {
    var a = CryptoJS,
        b = a.lib,
        c = b.WordArray,
        d = b.Hasher,
        e = a.algo,
        f = [],
        g = e.SHA1 = d.extend({
            _doReset: function () {
                this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            },
            _doProcessBlock: function (a, b) {
                for (var c = this._hash.words, d = c[0], e = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
                    if (16 > j) f[j] = 0 | a[b + j];
                    else {
                        var k = f[j - 3] ^ f[j - 8] ^ f[j - 14] ^ f[j - 16];
                        f[j] = k << 1 | k >>> 31
                    }
                    var l = (d << 5 | d >>> 27) + i + f[j];
                    l += 20 > j ? (e & g | ~e & h) + 1518500249 : 40 > j ? (e ^ g ^ h) + 1859775393 : 60 > j ? (e & g | e & h | g & h) - 1894007588 : (e ^ g ^ h) - 899497514, i = h, h = g, g = e << 30 | e >>> 2, e = d, d = l
                }
                c[0] = 0 | c[0] + d, c[1] = 0 | c[1] + e, c[2] = 0 | c[2] + g, c[3] = 0 | c[3] + h, c[4] = 0 | c[4] + i
            },
            _doFinalize: function () {
                var a = this._data,
                    b = a.words,
                    c = 8 * this._nDataBytes,
                    d = 8 * a.sigBytes;
                return b[d >>> 5] |= 128 << 24 - d % 32, b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296), b[(d + 64 >>> 9 << 4) + 15] = c, a.sigBytes = 4 * b.length, this._process(), this._hash
            },
            clone: function () {
                var a = d.clone.call(this);
                return a._hash = this._hash.clone(), a
            }
        });
    a.SHA1 = d._createHelper(g), a.HmacSHA1 = d._createHmacHelper(g)
}();
/*! 2014-03-10 */