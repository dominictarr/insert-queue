
module.exports = function (str) {
  var q = []
  return {
    insertAfter: function (index, s) {
      //order must be stable. so find the last insert for this
      var l = q.length
      

      if(!l)
        return q.push([index, s]), this

      for(var i = 0; i < l && q[i][0] <= index; i++)
        ;
       
      
      q.splice(i, 0, [index, s])
      return this
    },

    insertBefore: function (index, s) {
      //order must be stable. so find the last insert for this
      var l = q.length
//      console.error('INSERT before', q, l)
      if(!l)
        return q.push([index, s]), this

      //find the index of the fist queued item with index.
      var i = 0
      for(; i < l && q[i][0] < index; i++)
        ;

//      console.error('INSERT before', q, i, s)
      q.splice(i, 0, [index, s])
      return this
    },

    wrap: function (rx, before, after) {
      if(Array.isArray(before))
        after = before[1], before = before[0]
      if('undefined' == typeof after)
        after = before
      rx.global = true
      rx.lastIndex = 0
      
      var m = rx.exec(str)
      if(!m) return this
      do {
      //  console.error('WRAP', m, str)
        if(!m) return this
        console.log('INSERT_BEFORE', m.index + m[0].length, [after])
        console.log('INSERT_AFTER', m.index, [before])
        this.insertBefore(m.index + m[0].length, after)
        this.insertAfter(m.index, before)
      } while(rx.global && (m = rx.exec(str)))

      return this
    },

    apply: function () {
      var l = q.length, f = str

      while(l--) {
        var i = q[l][0], s = q[l][1]
        f = f.substring(0, i) + s + f.substring(i)
      }
      return f
    },
    queue: q,
    toString: function () {
      return str
    }
  }

}
