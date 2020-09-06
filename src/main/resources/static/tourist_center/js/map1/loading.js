const loading = {
    _loadItem:null,
    _anItem:null,
    _tipItem:null,
    _tipLabel:null,
    _showTip:true,
    _type:1,
    showLoading(config){
        if(this._loadItem){
            this._loadItem.remove();
            this._loadItem = null;
            this._anItem = null;
            this._tipItem = null;
            this._showTip = true;
            this._type = 1;
        }
        if(typeof config == "string"){
            this._tipLabel = config;
            this._type = 1;
        }else if(typeof config == "object"){
            this._tipLabel = typeof config.tip == "string" ? config.tip : "loading...";
            this._type = typeof config.type == "number" ? config.type : 1;
            this._showTip = typeof config.showTip == "boolean" ? config.showTip : true;
        }else{
            this._tipLabel = "loading...";
            this._type = 1;
        }
        this.createEle();
    },
    createEle(){
        this._loadItem = $(`<div class="load-view" style='z-index: 999'></div>`);
        this._anItem = $(`<div class="load-an-view"></div>`);
        this._tipItem =  $(`<div class="load-tip">${this._tipLabel}</div>`);
        switch(this._type) {
            case 1:
               let load1 = $(`<div class="load-circle">
                    <div class="load-container load-container1">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="load-container load-container2">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="load-container load-container3">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                </div>`)
                load1.appendTo(this._anItem);
                break;
            case 2:
               let load2 = $(`<div class="fading-circle">
                    <div class="sk-circle1 sk-circle"></div>
                    <div class="sk-circle2 sk-circle"></div>
                    <div class="sk-circle3 sk-circle"></div>
                    <div class="sk-circle4 sk-circle"></div>
                    <div class="sk-circle5 sk-circle"></div>
                    <div class="sk-circle6 sk-circle"></div>
                    <div class="sk-circle7 sk-circle"></div> 
                    <div class="sk-circle8 sk-circle"></div>
                    <div class="sk-circle9 sk-circle"></div>
                    <div class="sk-circle10 sk-circle"></div>
                    <div class="sk-circle11 sk-circle"></div>
                    <div class="sk-circle12 sk-circle"></div>
                </div>`)
                load2.appendTo(this._anItem);
                break;
            case 3:
                let load3 = $(`<div class="three-bounce">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>`)
                load3.appendTo(this._anItem);
                break;
            case 4:
                let load4 = $(`<div class="chasing-dots">
                        <div class="dot1"></div>
                        <div class="dot2"></div>
                    </div>`)
                load4.appendTo(this._anItem);
                break;
            case 5:
            let load5 = $(`<div class="wave">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>`)
                load5.appendTo(this._anItem);
                break;
       } 
       this.addEle();
    },
    addEle(){
        this._anItem.appendTo(this._loadItem);
        if(this._showTip){
            this._tipItem.appendTo(this._loadItem);
        }
        this._loadItem.appendTo($('body'));
    },
    hideLoading(){
        this._loadItem.remove();
        this.resetData();
    },
    resetData(){
        this._loadItem = null;
        this._anItem = null;
        this._tipItem = null;
        this._showTip = true;
        this._type = 1;
    }
}