var Vue = require("Vue")

Vue.component("twls-list-item", {
  template: "#list-item-template",
  methods : {
    onDrop : function(e){
      e.stopPropagation();
      e.preventDefault();
 
      console.log("z")
    },
    onDragOver : function(e){
      e.preventDefault()
      //console.log(e)
    }
  }

})

Vue.component("twls-list", {
  template: "#list-template",
})


new Vue({
  el : "#container",
  data : { // mock data
    list : [{
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
  },
})