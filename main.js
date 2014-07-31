var Vue = require("Vue")

Vue.component("twls-user", {
  template: "#user-template",
  methods : {
    onDragStart : function(e){
      e.dataTransfer.dropEffect = "move"
      this.$dispatch("itemDrag", this)
    }
  }
})

Vue.component("twls-list", {
  template: "#list-template",
  created : function(){
    this.$on("itemDrag", this.onItemDrag)
  },
  methods : {
    onItemDrag : function(itemVM){
      this.$dispatch("listDrag", this, itemVM)
    },
    onDragOver : function(e){
      e.preventDefault()
    },
    onDrop : function(e){
      this.$dispatch("listDrop", this)
    }
  }
})
var loadedData = [{
  name : "current",
  users : [
    {
      id :"vo",
      name :"zo",
    },
    {
      id :"vo2",
      name :"zo2",
    },
  ]
}, {
  name : "empty",
  users : []
}]

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
      if(listFrom.$index == listTo.$index) return
      item = listFrom.users.splice(item.$ndex, 1)[0]
      console.log(item)
      listTo.users.push(item)
    }
  }
})