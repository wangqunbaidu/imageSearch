/**
 * 识图服务前端接入组件
 * @desc 将组件绑定到特定的ID，生成相应的识图按钮
 * @param {String} id
 * @param {Object} opt
 * @author: wangqun
 * @date: 2015/03/08
 */
var imageSearch = function (id, opt) {
	// 展现相机按钮选择器ID
	this.id = id;
	// 配置项参数
	this.opt = opt || {};
	// 模板
	this.tpl = '<div id="stcontent"><a class="sttb" hidefocus="true" id="sttb" href="javascript:void(0)" style="display:none"><img class="st_camera" src="http://img2.bdstatic.com/static/home/widget/search_box_home/shitu/images/camera_b659d28.png" width="21" height="20"> <img class="st_camera_on" src="http://img0.bdstatic.com/static/home/widget/search_box_home/shitu/images/camera_on_5d123b7.png" width="21" height="20"><div class="st_tips">上传图片，搜索相关信息</div><div class="st_tips_arrow_in"></div><div class="st_tips_arrow_out"></div></a><div id="stsug" class="stsug" style="display:none"><div id="sthead">搜索图片信息</div><form id="form1" target="_self" enctype="multipart/form-data" action="/pictureup/uploadshitu" method="get" name="form1"><div id="sturl"><span class="stuwr"><input type="text" id="stuurl" value="" autocomplete="off" class="stuurl" name="objurl"></span> <span class="stsb"><input type="submit" id="sbobj" class="stsb2" onmousedown="this.className=&quot;stsb2 stsb3&quot;" onmouseout="this.className=&quot;stsb2&quot;" onmouseover="this.className=&quot;stsb2 stsb4&quot;" value="百度一下"></span></div><input name="rt" value="0" type="hidden"> <input name="rn" value="10" type="hidden"> <input name="ct" value="1" type="hidden"> <input name="stt" value="0" type="hidden"> <input name="tn" value="shituresultpc" type="hidden"> <input name="filename" id="filename" value="" type="hidden"> <input id="shitu1" name="uptype" value="paste" type="hidden"></form><div class="stf"><form id="form2" target="_self" enctype="multipart/form-data" action="/pictureup/uploadshitu" method="post" name="form2"><a id="uploadImg" href="javascript:void(0)">从本地上传 <input type="file" name="image" id="stfile" size="2"> <span id="flashcontent"></span></a> <span class="st_paste_url">粘贴图片网址</span> <img id="sthelp" width="13" height="13" src="./images/mark.png"><div class="st_dragtg" id="dragtg" style="display:none">提示：您也可以把图片拖到这里</div><input name="uptype" value="upload_pc" type="hidden"></form></div><div class="stmore" id="stmore" style="display:none"><b>如何粘贴图片网址</b><ul><li>右键点击网页上的图片，选择“复制图片网址”；</li><li>在搜索框中，粘贴该网址(Ctrl+V)，点击“百度一下”</li></ul><div class="stmore_arrow_in"></div><div class="stmore_arrow_out"></div></div><a class="closest" href="javascript:void(0)" id="closest" title="关闭">关闭</a><div id="point" style="display:none"><img src="http://img1.bdstatic.com/img/image/shitu/feimg/uploading.gif"><span>上传中，请稍候...</span></div><div id="dragtip" style="display:none"><div>搜索图片信息</div><span>将图片拖到此处</span><div class="drag_dot_area drag_dot_left_top"></div><div class="drag_dot_area drag_dot_left_bottom"></div><div class="drag_dot_area drag_dot_right_top"></div><div class="drag_dot_area drag_dot_right_bottom"></div></div><div class="left-border"></div><div class="right-border"></div></div></div>';
	this.dialog = '';
	$(this.tpl).appendTo($('#' + id));

	window.__originTitle = document.title;

    /**
     * flash初始化完成
     */
    var flashInitCallback = function () {
        setTimeout( function () {
            document.title = window.__originTitle;
        }, 1000);
        window.useFlashUp = true;
    };
    /**
     * 选择好文件通知flash上线
     */
    var notiUpload = function () {
        document.title = window.__originTitle;
        stInstance.showLoading();
    };
    /**
     * 整个上传是否成功
     */
    var returnState = function (boo, result) {
        document.title = window.__originTitle;
        if (!boo) {
            stInstance.hideLoading();
            alert("对不起，上传失败，请重新上传.");
            return false;
        }
        else if (boo) {
            window.location.href = result;
        };
    };

    /**
     * 用户关闭flash文件选择框
     */
    var filePickerEnd = function () {
        document.title = window.__originTitle;
    };

    window.returnState = returnState;
    window.flashInitCallback = flashInitCallback;
    window.notiUpload = notiUpload;
    window.filePickerEnd = filePickerEnd;

};

imageSearch.prototype = {
    render: function(){
    	console.log(1);
    }
};
var shitu = function() {
    this.homeForm = document.getElementById('homeSearchForm');	//页面搜索框
    this.point = document.getElementById('point');	//提示层
    this.content = document.getElementById('stsug');	//最外层div
    this.submitobj = document.getElementById('sbobj');	//提交按钮 百度一下
    this.form = document.getElementById('form1');	//form表单
    this.form2 = document.getElementById('form2');
    this.shituvalue = document.getElementById('shitu1');	//用于给后端传递识图的类型：粘贴，上传或拖拽
    this.shituvalue2 = document.getElementById('shitu2');   
    this.file = document.getElementById('stfile');	//本地上传
    this.url = document.getElementById('stuurl');	//输入框
    this.entry = document.getElementById('sttb');	//识图入口
    this.shituAd=document.getElementById('shituEnter');	//识图入口
    this.close = document.getElementById('closest');	//识图关闭按钮
    this.tips = document.getElementById('stmore');	//提示层
    this.hpobj = document.getElementById('hp');	//高级帮助栏
    this.sthp = document.getElementById('sthelp');
    this.draghp = document.getElementById('dragtip');
    this.kw = document.getElementById('kw');
    this.dragts = document.getElementById('dragtg');
    this.clickurl = 'http://stu.baidu.com';
    this.onuploadtg = 0;
    //this.ftn = document.getElementById('stftn').value || '';
    this.isDisplay = 0;
    this.isSubmit = 0;
	this.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent)? + RegExp['\x241']: undefined;
    this.isIe =/msie (\d+\.\d+)/i.test(navigator.userAgent)? (document.documentMode || + RegExp['\x241']): undefined;
    this.isOpera=/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent)? + ( RegExp['\x246'] || RegExp['\x242'] ): undefined;
    this.callbacks={
        aftershow: {},
        beforehide: {}
    };
};
/**
 * 识图组件
 */
shitu.prototype = {
	/**
     * 识图组件初始化
     */
    init: function() {
        var me = this,
            addEvent = me.addEvent,
            content = me.content;
        me.initdisplay();
        /**
         * 页面加载完成初始化识图相机入口
         */
        addEvent(window, 'load', function(e) {
            // 加载时隐藏加载框
            me.initdisplay();
        });
        /**
         * 拖拽终止时保证点击隐藏图层
         */
        addEvent(document, 'click', function(e) {
            me.hiddenContent(e, 0);
            window.setTimeout(function(){
                if(!me.isDisplay && !me.isSubmit) {
                    me.closest();
                }
            }, 10);
        });
        /**
         * 拖拽终止时保证隐藏上传图层
         */
        addEvent(document, 'mousemove', function(e) {
            me.hiddenContent(e, 1);
            window.setTimeout(function() {
                if(!me.isDisplay && !me.isSubmit) {
                    me.closest();
                }
            }, 10);
        });
        /**
         * 绑定入口相机按钮点击事件
         */
        addEvent(me.entry, 'click', function(e) {
            me.isDisplay = 1;
            me.displayst(true);
        });
        /**
         * 显示help帮助
         */
        addEvent(me.sthp, 'mouseover', function(e) {
            me.tips.style.display = '';
        });
        /**
         * 隐藏help帮助
         */
        addEvent(me.sthp, 'mouseout', function(e) {
            gtimeout = setTimeout(function() {
                me.tips.style.display = 'none';
            }, 500);
        });
        /**
         * 显示识图tip
         */
        addEvent(me.tips, 'mouseover', function(e) {
            e = window.event || e;
            if (me.fixedMouse(e, me.tips)) {
                if (gtimeout) clearTimeout(gtimeout);
            }
        });
        /**
         * 隐藏识图tip
         */
        addEvent(me.tips, 'mouseout', function(e) {
            e = window.event || e;
            if (me.fixedMouse(e, me.tips)) {
                me.tips.style.display = 'none';
            }
        });
        /**
         * 绑定图片上传file变化，获取相关上传图片信息
         */
        addEvent(me.file, 'change', function(e) {
            
            me.getValue();
        });
        /**
         * 绑定识图提交按钮点击事件
         */
        addEvent(me.submitobj, 'click', function(e) {
            var val = me.url.value,
                notsub = (val == '') || !me.checkImgType(val),
                e = window.event || e;

            if(val != ''){
                
            }
            if (notsub) {
                alert('您的文件格式不正确或图片网址过长。支持jpg、gif、png、jpeg、bmp格式图片及250个字符内的图片网址。');
                this.form.reset();
            }else{
                me.shituvalue.value = 'paste';
                me.submitForm(true, me.form, 'urlSearch');
                me.point.style.display = 'block';
            }
            if (document.all) {
                e.returnValue = false;
            }
            else {
                e.preventDefault();
            }
        });
        /**
         * 关闭操作
         */
        addEvent(me.close, 'click', function(e) {
            // 绑定关闭按钮
            me.isIe? window.document.execCommand('Stop'): window.stop();
            me.form.reset();
            me.form2.reset();
            me.isSubmit = 0;
            if (me.onuploadtg) {
                me.draghp.style.display = 'none';
                me.point.style.display = 'none';
                me.onuploadtg = 0;
                return;
            }
            me.closest();
        });

        if (me.isOpera||!window.FileReader) return;

        addEvent(me.url, 'paste', function(e){
            var clipboardData = e.clipboardData||window.clipboardData;
            var items = clipboardData.items;
            var types = clipboardData.types;
            if(items && items.length && types && types.length){
                if(types[0] == 'Files'){
                    me.handlerFiles2(items);
                }
            }
        });

        addEvent(document, 'dragenter', function(e) {
            me.point.style.display = 'none';
            me.displayst();
            me.draghp.style.display = '';
        });

        addEvent(document, 'dragover', function(e) {
            me.point.style.display = 'none';
            me.displayst();
            me.draghp.style.display = '';
        });

        addEvent(content, 'dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });

        addEvent(content, 'dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        /**
         * 绑定拖拽事件上传图片
         */
        addEvent(content, 'drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            me.isSubmit=1;
            
            if (e.dataTransfer.files.length) {
                try {
                    me.handlerFiles(e.dataTransfer.files);
                } catch(c) {
                    return;
                }
            } else if (e.dataTransfer.types.indexOf && -1 != e.dataTransfer.types.indexOf('text/html') || e.dataTransfer.types.contains && -1 != e.dataTransfer.types.contains('text/html')) {
                var div = document.createElement('div');
                div.innerHTML = e.dataTransfer.getData('text/html');
                var imgs = div.getElementsByTagName('img');
                if (imgs && imgs[0] && imgs[0].src) {
                    //url拖拽上传，添加drag=1
                    var input = document.createElement('input');
                    input.name = 'drag';
                    input.value= '1';
                    input.type = 'hidden';
                    me.form.appendChild(input);
                    me.shituvalue.value = 'drag';

                    if (0 == imgs[0].src.indexOf('data:')) {
                        var name = imgs[0].alt || imgs[0].title || '';
                        me.submitForm2(imgs[0].src, name, 'image');
                    } else {
                        me.url.value = imgs[0].src;
                        me.submitForm(true, me.form, 'urlSearch');
                    }
                }else return;
            } else if (e.dataTransfer.types.indexOf && -1 != e.dataTransfer.types.indexOf('text/uri-list')) {
                me.url.value = e.dataTransfer.getData('text/uri-list');
                me.submitForm(true,me.form,'urlSearch');
            }else{
                return;
            }
            me.point.style.display = 'block';
        });
    },
    /**
     * 初始化入口显示状态
     */
    initdisplay: function() {
        var me = this;
        if (me.entry) {
            me.entry.style.display = '';
        }
        if (me.dragts) {
            me.closedg();
        }
        if (me.form) {
            me.form.reset();
        }
        if (me.point) {
            me.point.style.display = 'none';
        }
        return;
    },
    closedg: function() {
        var me = this;
        if(!me.isOpera && window.FileReader) {
            return;
        }
        if(this.dragts) {
            this.dragts.style.display = 'none';
        }
        return;
    },
    openContent: function() {
        var me = this;
        me.isDisplay = 1;
        me.displayst(true);
    },
    hiddenContent: function(e, tg) {
        var e = window.event || e,target = e.srcElement || e.target,id,
        	me = this;
        while (target && target.getAttribute && target.tagName != 'BODY' && target.tagName != 'HTML') {
            id = target.getAttribute('id');
            if (id == 'stcontent') {
                break;
            }
            target = target.parentNode;
        }
        if (id == 'stcontent') return;
        if (tg == 0) {
            me.closest();
            return;
        } else {
            me.draghp.style.display = 'none';
            return;
        }
    },
    fixedMouse: function(e, target) {
        var related,type = e.type.toLowerCase(),
        	me = this;//这里获取事件名
        if (type == 'mouseover') {
            related = e.relatedTarget || e.fromElement
        } else if (type == 'mouseout') {
            related = e.relatedTarget || e.toElement
        } else return true;
        return related && related.prefix != 'xul' && !this.contains(target, related) && related !== target;
    },
    contains: function(p, c) {
        return p.contains ? p != c && p.contains(c) : !!(p.compareDocumentPosition(c) & 16);
    },
    addEvent: function(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            }
            obj.attachEvent('on' + type, obj[type + fn]);
        } else
            obj.addEventListener(type, fn, false);
    },
    removeEvent: function(obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else
            obj.removeEventListener(type, fn, false);

    },
    closest: function() {
        this.content.style.display = 'none';
        if (this.hpobj) this.hpobj.style.display = '';
        this.sugTg = 0;
        this.isDisplay=0;
        // this.kw.focus();
        this.homeForm.style.visibility = 'visible';
        this.entry.style.visibility = 'visible';
    },
    displayst: function(tag) {
        this.point.style.display = 'none';
        this.content.style.display = '';
        if (this.hpobj) this.hpobj.style.display = 'none';
        this.sugTg = 1;
        tag&&this.url.focus();
        this.homeForm.style.visibility = 'hidden';
        this.entry.style.visibility = 'hidden';
    },
    checkImgType: function(fileURL) {
        return true;
        var right_type = new Array(
                            '.jpg',
                            '.gif',
                            '.jpeg',
                            '.png',
                            '.bmp'
                        );
        var right_typeLen = right_type.length;
        var imgUrl = fileURL.toLowerCase();
        // 去除行首空格
        imgUrl = imgUrl.replace(/(^\s*)/g, '');
        // 去除行尾空格
        imgUrl = imgUrl.replace(/(\s*$)/g, '');
        var postfixLen = imgUrl.length;
        var len4 = imgUrl.substring(postfixLen - 4, postfixLen);
        var len5 = imgUrl.substring(postfixLen - 5, postfixLen);
        for (var i = 0; i < right_typeLen; i++) {
            if ((len4 == right_type[i]) || (len5 == right_type[i])) {
                return true;
            }
        }
        return false;
    },
    /**
     * 获取上传图片信息、隐藏提示层
     */
    getValue: function() {
        // file上传图片信息，url表示上传图片url，point表示提示层
        // 获取上传图片信息时需要隐藏提示层
        var file = this.file,
            url = this.url,
            point = this.point,
            form2 = this.form2;
            point.style.display = 'none';

        var fileURL = file.value;
        url.value = fileURL;

        // 是否存在二进制图片URL
        var returnvalue = (fileURL != '') && this.checkImgType(fileURL);

        this.shituvalue2.value = 'upload';
        // 提交表单
        this.submitForm(returnvalue, form2, 'uploadSearch');
    },
    /**
     * html5上传
     * @param files
     */
    handlerFiles: function(files) {
        var me = this;
        if (me.isOpera||!window.FileReader) {
            return;
        }
        var file = files[0],
            fileinput = me.file,
            reader = new FileReader();
        if(me.chrome && !window.useFlashUp && file && file.size >= 1024 * 1024){
            alert('拖动的图片大小不能超过1M');
            me.point.style.display = 'none';
            throw new Error('image file size exceed');
        }
        reader.onload = (function (theFile) {
            return function (e) {
                var str = e.target.result,
                    type = theFile.type;
                var flashStr = str.split(',')[1];
                if(window.useFlashUp && flashStr){
                    var flashObj = swf.getMovie('STUUpload');
                    if(flashObj){
                        flashObj.setImgStrData(flashStr, type, theFile.name);
                        return;
                    }
                }
                me.submitForm2(str, theFile.name, type);

            };
        })(file);
        reader.readAsDataURL(file);
    },
    handlerFiles2: function(files) {
        var me = this;
        if (me.isOpera||!window.FileReader) {
            return;
        }
        me.showLoading();
        var file = files[0].getAsFile(),
            fileinput = me.file,
            reader = new FileReader();
        if(me.chrome && !window.useFlashUp && file && file.size >= 1024 * 1024){
            alert('截取的图片大小不能超过1M');
            me.point.style.display = 'none';
            throw new Error('image file size exceed');
        }
       
        reader.onload = (function (theFile) {
            return function (e) {
                var str = e.target.result,
                    type = theFile.type;
                var flashStr = str.split(',')[1];
                var name = 'shitu' + new Date().getTime() + '.png';
                if(window.useFlashUp && flashStr){
                    var flashObj = swf.getMovie('STUUpload');
                    if(flashObj) {
                        flashObj.setImgStrData(flashStr, type, name);
                        return;
                    }
                }
                me.submitForm2(str, name, type);
            };
        })(file);
        reader.readAsDataURL(file);
    },
    _imgReq: function(url) {

    },
    /**
     * 提交表单数据,针对图片URL
     * @param returnvalue
     * @param form
     * @param type
     * @returns {boolean}
     */
    submitForm: function(returnvalue, form, type) {
        if (!returnvalue) {
            alert('您的文件格式不正确或图片网址过长。支持jpg、gif、png、jpeg、bmp格式图片及250个字符内的图片网址。');
            this.point.style.display = 'none';
            this.draghp.style.display = 'none';
            form.reset();
            return false;
        } else {
            
            this.entry.style.zIndex = '2';
            this.point.style.display = 'block';
            this.onuploadtg = 1;
            form.submit();
            return true;
        }
    },
    /**
     * 预处理提交表单数据,针对base64
     * @param dataimage
     * @param filename
     * @param type
     */
    submitForm2: function(dataimage, filename, type) {
        var me = this,
            input,
            nameObj = document.getElementById('filename'),
            ifsubmit = type.indexOf('image') != -1;
        var str1 = dataimage;
        if (!document.getElementById('dragimage')) {
            input = document.createElement('input');
            input.name = 'dragimage';
            input.id = 'dragimage';
            input.type = 'hidden';
            me.form2.appendChild(input);
        }
        else {
            input = document.getElementById('dragimage');
        }
        // image数据赋值
        input.value = str1;
        // 赋值文件名
        nameObj.value = filename || '';
        ifsubmit = true;
        me.submitForm(ifsubmit, me.form2, 'uploadSearch');
    },
    showLoading: function() {
        this.point.style.display = 'block';
    },
    hideLoading: function() {
        this.point.style.display = 'none';
    },
    on: function(e, name, func) {
        if(this.callbacks[e])
            this.callbacks[e][name] = func;
    },
    fire: function(e, name) {
        if(this.callbacks[e]) {
            this.callbacks[e][name] = null;
            delete this.callbacks[e][name];
        }
    }
};







/**
 * 执行代码
 *
 */
var st = new shitu();
    st.init();
    window.stInstance = st;
    var flashCon = document.getElementById('flashcontent');
    if(((parseInt(swf.version, 10) || 0) < 10) || !flashCon){
        flashCon.style.display = 'none';
    }else{
        try{
            swf.create({
            	id: 'STUUpload',
            	url: 'http://img.baidu.com/img/image/stu/STUpload2.swf?v=0108',
            	width: '103',
            	height: '28',
            	align: 'top',
            	wmode: 'transparent',
            	allowscriptaccess: 'always',
            	errorMessage: '载入FLASH出错',
            	vars: { 
            		uploadurl: '/pictureup/uploadshitu?fr=flash&fm=index&pos=upload', 
            		compress: 1
            	},
            	ver: '10.1.0'
            }, 'flashcontent');

        }
        catch(e){
            flashCon.style.display = 'none';
        }

    }