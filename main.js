var Vue = require("Vue")

// Data (Dummy)
var generateDummyItem = function(i){
  return {
    id :"vo" +i,
    name :"zo" + i,
  }
}

var loadedData = [{
  name : "list1",
  items : []
}, {
  name : "list2",
  items : []
}]
for(var i=0; i<5; i++){
  loadedData[0].items.push(generateDummyItem(i))
}


// components
Vue.component("item", {
  template: "#item-template",
  data : {
    isDragging : false
  },
  methods : {
    onDragStart : function(e){
      e.dataTransfer.dropEffect = "move"
      this.isDragging = true
      this.$dispatch("itemDrag", this)
    },
    dragEnd : function(){
      this.isDragging = false;
    }
  }
})

Vue.component("list", {
  template: "#list-template",
  created : function(){
    this.$on("itemDrag", this.onItemDrag)
  },
  methods : {
    onDragOver : function(e){
      e.preventDefault()
    },
    onItemDrag : function(itemVM){
      this.$dispatch("listDrag", this, itemVM)
    },
    onDrop : function(e){
      this.$dispatch("listDrop", this)
    },
    addItem : function(item){
      this.items.push(item)
    },
    popItem : function(item){
      return this.items.splice(item.$index, 1)[0]
    }
  }
})

// Application
window.app = new Vue({
  el : "#container",
  data : { // mock data
    dragActiveList : null,
    dragActiveUser : null,
    lists : loadedData
  },
  created : function(){
    this.$on("listDrag", this.onListDrag)
    this.$on("listDrop", this.onListDrop)
  },
  methods : {
    onListDrag : function(listVM, itemVM){
      this.dragActiveList = listVM
      this.dragActiveUser = itemVM
    },
    onListDrop : function(listVM){
      this.moveItem(this.dragActiveList, listVM, this.dragActiveUser )
    },
    moveItem : function(listFrom, listTo, item){
      if(listFrom.$index === listTo.$index) return
      item.dragEnd()
      listTo.addItem(listFrom.popItem(item))
    }
  }
})