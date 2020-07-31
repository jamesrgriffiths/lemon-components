<!--
  Graphs a circle or pie chart based on the following parameters:
  data - (REQUIRED) This should be an array of data objects each with a name and
    total property.
  limit - (OPTIONAL - DEFAULT 10) Set this to a number greater than 1
    representing the total number of data fields to display. If there are more
    fields than this limit the remaining fields will be combined into "Other".
  size - (OPTIONAL - DEFAULT 200) Set this to a number representing the width
    and height of the graph. Note that this along with the padding make up the
    total width and height of the component - the display of some of the fields
    can also effect the overall size.
  padding - (OPTIONAL - DEFAULT 10) Set this to a number represennting the amount
    of padding around the actual graph.
  cutout - (OPTIONAL - DEFAULT 0) Set to the amount to cut out the chart by.
 -->
<template>

  <div class="gc-container" id="gc-container">

    <svg  class="gc-pie" :width="box_size" :height="box_size" :viewBox="'0 0 '+box_size+' '+box_size">
      <path v-for="(item,i) in data" :d="item.path"
        :transform="'translate('+padding+','+padding+') rotate('+(item.rotation)+' '+size/2+' '+size/2+')'"
        :class="'gc-piece gc-color-'+((i%6)+1)"/>
      <circle :cx="(size/2)+padding" :cy="(size/2)+padding" :r="cutout" class="gc-pie-inner" />
    </svg>

    <div v-for="(item,j) in data" :class="'gc-text gc-color-'+((j%6)+1)">
      {{item.name}} ({{item.total}})
    </div>

  </div>

</template>

<script>
export default {
  props: {
    data: { default: () => [] },
    limit: {
      default: 10,
      validator(x) { return x > 0; }
    },
    size: { default: 200 },
    padding: { default: 10 },
    cutout: { default: 0 }
  },
  data() {
    return {
      box_size: 0
    }
  },
  created() {

    // Set the box size
    this.box_size = parseInt(this.size) + parseInt(this.padding*2);

    // Get the totals;
    var total = 0;
    var other_total = 0;
    for(var i=0; i<this.data.length; i++) {
      total += this.data[i].total;
      if(i+1 >= this.limit) {
        other_total += this.data[i].total;
      }
    }

    // Remove and replace additional items with the other variable
    while(this.data.length >= this.limit) {
      this.data.pop();
    }
    if(other_total > 0) {
      this.data.push({'name': 'Other', 'total': other_total});
    }

    // Set the sizing of each item
    var radius = this.size / 2;
    var radian_multiplier = 6.2831853;
    var width = 20;
    var rotation = 0;
    for(var i=0; i<this.data.length; i++) {
      var fraction = this.data[i].total / total;
      var x = (radius * Math.sin(fraction * radian_multiplier)) + radius;
      var y = fraction == 0.25 ? radius : radius - (radius * Math.cos(fraction * radian_multiplier));

      var curve = "";
      if(fraction > 0.5) { curve += "A "+radius+" "+radius+" 0 0 1 "+(radius*2)+" "+radius+" "; }
      if(fraction > 0.75) { curve += "A "+radius+" "+radius+" 0 0 1 0 "+radius+" "; }
      curve += "A "+radius+" "+radius+" 0 0 1 "+x+" "+y+" ";

      var start = "M "+radius+" 0 ";
      var line = "L "+radius+" "+radius+" ";
      var path = start + curve + line + "Z"
      this.data[i].path = path;
      this.data[i].rotation = rotation;
      rotation += fraction * 360;
    }

  }
}
</script>
