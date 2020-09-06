// Author: David Qin Snake8859 
// E-mail: david@hereapp.cn  snake8859@qq.com
// Date: 2014-11-05 2019-8-26

(function($){

  // a case insensitive jQuery :contains selector
  $.expr[":"].searchableSelectContains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

  $.searchableSelect = function(element, options) {
    createImageBitmap
    this.element = element;
    this.options = options || {};
    this.init();  //初始化标签和样式
    var _this = this;

    //点击下拉框
    this.searchableElement.click(function(event){
      // event.stopPropagation();
      _this.show(); //下拉框内容显示
    }).on('keydown', function(event){
      console.log("键盘事件-test")
      if (event.which === 13 || event.which === 40 || event.which == 38){
        event.preventDefault();
        _this.show();
      }
    });

    $(document).on('click', null, function(event){
      if(_this.searchableElement.has($(event.target)).length === 0)
        _this.hide();
    });

    //输入框键盘事件
    this.input.on('keydown', function(event){
      //console.log("键盘事件1-test")
      event.stopPropagation();
      if(event.which === 13){         //enter
        event.preventDefault();
        _this.selectCurrentHoverItem();
        _this.hide();
      } else if (event.which == 27) { //ese
        _this.hide();
      } else if (event.which == 40) { //down
        _this.hoverNextItem();
      } else if (event.which == 38) { //up
        _this.hoverPreviousItem();
      }
    }).on('compositionend', function(event){
      if(event.which != 13 && event.which != 27 && event.which != 38 && event.which != 40)
        _this.filter(); //过滤
    })
  }

  var $sS = $.searchableSelect;

  $sS.fn = $sS.prototype = {
    version: '0.0.1'
  };

  $sS.fn.extend = $sS.extend = $.extend;

  $sS.fn.extend({
    //初始化标签和样式
    init: function(){
      var _this = this;
      this.element.hide();

      this.searchableElement = $('<div tabindex="0" class="searchable-select"></div>');
      this.holder = $('<div class="searchable-select-holder"></div>');
      this.dropdown = $('<div class="searchable-select-dropdown searchable-select-hide"></div>');
      this.input = $('<input  class="searchable-select-input" />');
      this.items = $('<div class="searchable-select-items"></div>');
      this.caret = $('<span class="searchable-select-caret"></span>');
      this.scrollPart = $('<div class="searchable-scroll"></div>');
      this.hasPrivious = $('<div class="searchable-has-privious">...</div>');
      this.hasNext = $('<div class="searchable-has-next">...</div>');

      this.hasNext.on('mouseenter', function(){
        _this.hasNextTimer = null;

        var f = function(){
          var scrollTop = _this.items.scrollTop();
          _this.items.scrollTop(scrollTop + 20);
          _this.hasNextTimer = setTimeout(f, 50);
        }

        f();
      }).on('mouseleave', function(event) {
        clearTimeout(_this.hasNextTimer);
      });

      this.hasPrivious.on('mouseenter', function(){
        _this.hasPriviousTimer = null;

        var f = function(){
          var scrollTop = _this.items.scrollTop();
          _this.items.scrollTop(scrollTop - 20);
          _this.hasPriviousTimer = setTimeout(f, 50);
        }

        f();
      }).on('mouseleave', function(event) {
        clearTimeout(_this.hasPriviousTimer);
      });

      this.dropdown.append(this.input);
      this.dropdown.append(this.scrollPart);

      this.scrollPart.append(this.hasPrivious);
      this.scrollPart.append(this.items);
      this.scrollPart.append(this.hasNext);

      this.searchableElement.append(this.caret);
      this.searchableElement.append(this.holder);
      this.searchableElement.append(this.dropdown);
      this.element.after(this.searchableElement);

      //this.buildItems();
      this.setPriviousAndNextVisibility();
    },

    //过滤相关内容
    filter: function(){
      var _this = this;
      var text = this.input.val();
      //console.log(text)
      //根据输入结果，查询
      axios.get("https://restapi.amap.com/v3/assistant/inputtips", {
                params: {
                    key: "daa4e1759839a0efc584e06f2d9d106e",
                    keywords: text,
                    type:"110000|110100|110101|110102|110103|110104|110105|110106|110200|110201|110202|110203|110204|110205|110206|110207|110208|110209",
                    datatype: "poi"
                }
            })
			.then(function(res){
          //console.log(res.data.tips);
          //渲染options
          _this.buildItems(res.data.tips)
			})
			.catch(function(err){
         console.log(err);
      })
      
      // this.items.find('.searchable-select-item').addClass('searchable-select-hide');
          // this.items.find('.searchable-select-item:searchableSelectContains('+text+')').removeClass('searchable-select-hide');
          // if(this.currentSelectedItem.hasClass('searchable-select-hide') && this.items.find('.searchable-select-item:not(.searchable-select-hide)').length > 0){
          //   this.hoverFirstNotHideItem();
          // }
          // this.setPriviousAndNextVisibility();
      
    },

    hoverFirstNotHideItem: function(){
      this.hoverItem(this.items.find('.searchable-select-item:not(.searchable-select-hide)').first());
    },

    selectCurrentHoverItem: function(){
      if(!this.currentHoverItem.hasClass('searchable-select-hide'))
        this.selectItem(this.currentHoverItem);
    },

    hoverPreviousItem: function(){
      if(!this.hasCurrentHoverItem())
        this.hoverFirstNotHideItem();
      else{
        var prevItem = this.currentHoverItem.prevAll('.searchable-select-item:not(.searchable-select-hide):first')
        if(prevItem.length > 0)
          this.hoverItem(prevItem);
      }
    },

    hoverNextItem: function(){
      if(!this.hasCurrentHoverItem())
        this.hoverFirstNotHideItem();
      else{
        var nextItem = this.currentHoverItem.nextAll('.searchable-select-item:not(.searchable-select-hide):first')
        if(nextItem.length > 0)
          this.hoverItem(nextItem);
      }
    },

    //选项绑定
    buildItems: function(options){
      var _this = this;
      //清空上一次搜索的内容
      var childs = _this.items[0].childNodes;
      if(childs.length!=0){
        /**
         * 在删除子节点时不能从索引最小开始删，最小开始删，会导致只删除一半，因为当你把索引0的子节点删除后，那么原来索引1变成索引0，程序运行只删错了一半的子节点
         * 解决方案：需要从索引最大值开始删除，采用递减方法，这样全部删除
         */
        for(var i = childs.length - 1; i >= 0; i--) {
          _this.items[0].removeChild(childs[i]);
        }
      }
      for (i in options){
        //console.log(options[i])
        if(_this.options.id!=undefined){
          var item = $('<div id='+_this.options.id+' class="searchable-select-item" data-location="'+options[i].location+'" data-adcode="'+options[i].adcode+'" data-sid="'+options[i].id+'">'+options[i].name +" ("+options[i].district+") " +'</div>');
        }else{
          var item = $('<div class="searchable-select-item" data-location="'+options[i].location+'" data-adcode="'+options[i].adcode+'" data-sid="'+options[i].id+'">'+options[i].name +" ("+options[i].district+") " +'</div>');
        }
        if(this.selected){
          _this.selectItem(item);
          _this.hoverItem(item);
        }
        item.on('mouseenter', function(){
          $(this).addClass('hover');
        }).on('mouseleave', function(){
          $(this).removeClass('hover');
        }).click(function(event){
          event.stopPropagation();
          _this.selectItem($(this));
          _this.hide();
        });
        _this.items.append(item);
      }
      
      // this.element.find('option').each(function(){
      //   var item = $('<div class="searchable-select-item" data-value="'+$(this).attr('value')+'">'+$(this).text()+'</div>');
      //   if(this.selected){
      //     _this.selectItem(item);
      //     _this.hoverItem(item);
      //   }
      //   item.on('mouseenter', function(){
      //     $(this).addClass('hover');
      //   }).on('mouseleave', function(){
      //     $(this).removeClass('hover');
      //   }).click(function(event){
      //     event.stopPropagation();
      //     _this.selectItem($(this));
      //     _this.hide();
      //   });
      //   _this.items.append(item);
      // });

      this.items.on('scroll', function(){
        _this.setPriviousAndNextVisibility();
      })
    },
    //显示下拉框内容
    show: function(){
      this.dropdown.removeClass('searchable-select-hide');
      this.input.focus();
      this.status = 'show';
      this.setPriviousAndNextVisibility();
    },

    hide: function(){
      if(!(this.status === 'show'))
        return;

      if(this.items.find(':not(.searchable-select-hide)').length === 0)
          this.input.val('');
      this.dropdown.addClass('searchable-select-hide');
      this.searchableElement.trigger('focus');
      this.status = 'hide';
    },

    hasCurrentSelectedItem: function(){
      return this.currentSelectedItem && this.currentSelectedItem.length > 0;
    },

    selectItem: function(item){
      if(this.hasCurrentSelectedItem())
        this.currentSelectedItem.removeClass('selected');

      this.currentSelectedItem = item;
      item.addClass('selected');

      this.hoverItem(item);

      this.holder.text(item.text());
      var value = item.data('value');
      this.holder.data('value', value);
      this.element.val(value);

      if(this.options.afterSelectItem){
        this.options.afterSelectItem.apply(this);
      }
    },

    hasCurrentHoverItem: function(){
      return this.currentHoverItem && this.currentHoverItem.length > 0;
    },

    hoverItem: function(item){
      if(this.hasCurrentHoverItem())
        this.currentHoverItem.removeClass('hover');

      if(item.outerHeight() + item.position().top > this.items.height())
        this.items.scrollTop(this.items.scrollTop() + item.outerHeight() + item.position().top - this.items.height());
      else if(item.position().top < 0)
        this.items.scrollTop(this.items.scrollTop() + item.position().top);

      this.currentHoverItem = item;
      item.addClass('hover');
    },

    setPriviousAndNextVisibility: function(){
      if(this.items.scrollTop() === 0){
        this.hasPrivious.addClass('searchable-select-hide');
        this.scrollPart.removeClass('has-privious');
      } else {
        this.hasPrivious.removeClass('searchable-select-hide');
        this.scrollPart.addClass('has-privious');
      }

      if(this.items.scrollTop() + this.items.innerHeight() >= this.items[0].scrollHeight){
        this.hasNext.addClass('searchable-select-hide');
        this.scrollPart.removeClass('has-next');
      } else {
        this.hasNext.removeClass('searchable-select-hide');
        this.scrollPart.addClass('has-next');
      }
    }
  });

  $.fn.searchableSelect = function(options){
    this.each(function(){
      var sS = new $sS($(this), options);
    });

    return this;
  };

})(jQuery);
